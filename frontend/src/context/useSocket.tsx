import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ev } from "../lib/utils";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  socket?: Socket;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  joinEvent: ({ roomId, userId }: { roomId: string; userId: string }) => any;
  changeCode: ({ roomId, code }: { roomId: string; code: string }) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [code, setCode] = useState("");

  // joinEvent
  const joinEvent: ISocketContext["joinEvent"] = useCallback(
    ({ roomId, userId }) => {
      //TODO : send value on join
      if (!socket || !roomId || !userId) return;
      socket.emit(ev["f:join"], { roomId, userId });
      return;
    },
    [socket],
  );

  // change ace content
  const changeCode: ISocketContext["changeCode"] = useCallback(
    ({ roomId, code }) => {
      if (!socket || !roomId) return;
      socket.emit(ev["f:code_change"], { roomId, code });
      return;
    },
    [socket],
  );

  // socket init
  useEffect(() => {
    //TODO: change url later
    const _socket = io("http://localhost:4000");
    _socket.on(ev["b:join"], (data) => {
      console.log(data);
    });
    setSocket(_socket);

    return () => {
      _socket.disconnect();
      _socket.off(ev["b:join"]);
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ joinEvent, changeCode, socket, code, setCode }}
    >
      {children}
    </SocketContext.Provider>
  );
};
