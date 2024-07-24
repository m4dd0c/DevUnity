import { Server, Socket } from "socket.io";
import type { Server as HttpServer } from "http";
class SocketService {
  private _io;
  constructor(server: HttpServer) {
    this._io = new Server(server);
  }
  public get io() {
    return this._io;
  }
  public connect() {
    const io = this._io;
    io.on("connection", (socket: Socket) => {
      console.log("new connection", socket.id);
    });
  }
}
export default SocketService;
