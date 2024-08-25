import { Server, Socket } from "socket.io";
import type { Server as HttpServer } from "http";
import { ev } from "./events";
import User from "../model/User";
import Room from "../model/Room";
import Discussion from "../model/Discussion";

interface ISocketStore<T> {
  [key: string]: T;
}
class SocketService {
  private _io;
  // private socketUser: ISocketStore<string> = {};
  private roomSocketUser: ISocketStore<ISocketStore<string>> = {};
  /*
    INFO: structure
 
    const roomSocketUser = {
      room1: {
        socket1: user1;
        socket2: user2;
      },
      room2: {
        socket3: user3;
      }
    }
  */
  constructor(server: HttpServer) {
    this._io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URI || "http://localhost:5173/",
        credentials: true,
      },
    });
  }

  public get io() {
    return this._io;
  }

  public connect() {
    const io = this._io;

    io.on("connection", (socket: Socket) => {
      console.log("new connection", socket.id);

      // room join event
      socket.on(
        ev["f:join"],
        async ({ roomId, userId }: { roomId: string; userId: string }) => {
          const user = await User.findById(userId);
          if (!user) return;

          // Check if the roomId exists in roomSocketUser
          if (!this.roomSocketUser[roomId]) {
            // If it doesn't exist, create a new object for this roomId
            this.roomSocketUser[roomId] = {};
          }

          // Now that the roomId key exists, set the userId for the given socketId
          this.roomSocketUser[roomId][socket.id] = userId;

          // add to map and room
          socket.join(roomId);
          // send info
          socket.to(roomId).emit(ev["b:join"], {
            socketId: socket.id,
            message: `Welcome ${user.username}`,
          });
        },
      );
      // code sync starts here
      // code req
      socket.on(ev["f:code_req"], ({ roomId }: { roomId: string }) => {
        // sending event to everyone except the sender
        socket.to(roomId).emit(ev["b:code_req"], { socketId: socket.id });
      });

      // load code
      socket.on(
        ev["f:code_load"],
        ({ socketId, code }: { socketId: string; code: string }) => {
          // sending code only to the socketId
          io.to(socketId).emit(ev["b:code_change"], { code });
        },
      );
      // code sync ends here

      // room update event
      socket.on(
        ev["f:code_change"],
        ({ roomId, code }: { roomId: string; code: string }) => {
          // send code to everyone except self
          socket.to(roomId).emit(ev["b:code_change"], { code });
        },
      );

      // room delete event
      socket.on("disconnecting", async () => {
        console.log("disconneting...");
        let roomId = "";
        let userId = "";
        // we have socket id find userid and remove from obj
        for (const roomKey in this.roomSocketUser) {
          for (const socKey in this.roomSocketUser[roomKey]) {
            if (socKey === socket.id) {
              roomId = roomKey;
              userId = this.roomSocketUser[roomKey][socKey];
              delete this.roomSocketUser[roomKey][socKey];
              break;
            }
          }
        }
        if (!roomId || !userId)
          return console.log("Either userId or roomId is undefined.");

        const user = await User.findById(userId);
        if (!user) console.log("Couldn't find user with this Id.");

        // remove from db (active user)
        const room = await Room.updateOne(
          { roomId },
          { $pull: { activeUsers: userId } },
        );
        if (!room) return console.log("Couldn't remove from activeUsers");

        // save chat TODO:

        // send info
        io.to(roomId).emit(
          ev["b:leave"],
          `${user ? user.username : socket.id} left the room.`,
        );
      });

      //INFO: feeling no need for this,
      //maybe in future
      //room create event
      // socket.on(ev['r:create'], socket => {
      // something
      // create room
      // })
    });
  }
}
export default SocketService;
