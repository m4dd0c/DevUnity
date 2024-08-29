import React, {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { ev } from "../lib/utils";
import { useMutation } from "@tanstack/react-query";
import { saveCodeAction } from "../lib/actions/roomAction";
import { updateDiscussionAction } from "../lib/actions/discussionAction";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  socket?: Socket;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  joinEvent: ({ roomId, userId }: { roomId: string; userId: string }) => any;
  changeCode: ({ roomId, code }: { roomId: string; code: string }) => any;
  saveCode: ({ roomId }: { roomId: string }) => any;
  discussionData: IDiscussion | null;
  setDiscussionData: React.Dispatch<React.SetStateAction<IDiscussion | null>>;
  isActiveUser: boolean;
  setIsActiveUser: React.Dispatch<SetStateAction<boolean>>;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const location = useLocation();
  const [code, setCode] = useState("");
  const [socket, setSocket] = useState<Socket>();
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [discussionData, setDiscussionData] = useState<IDiscussion | null>(
    null,
  );

  // save code
  const saveCode = ({ roomId }: { roomId: string }) => {
    saveCodeMutation({ roomId, code });
  };

  const { mutate: saveCodeMutation } = useMutation({
    mutationFn: saveCodeAction,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

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

  // pathname
  const roomIdMatch = location.pathname.match(
    /\b\w{8}-\w{4}-\w{4}-\w{4}-\w{12}\b/,
  );
  const roomId = roomIdMatch ? roomIdMatch[0] : null;
  const roomIdRef = useRef(roomId);

  // roomId storing
  useEffect(() => {
    if (roomId) roomIdRef.current = roomId; // Update the ref whenever roomId changes
  }, [roomId]);
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

  // save chat mutation
  const { mutate } = useMutation({
    mutationFn: updateDiscussionAction,
    onSuccess: (res) => {
      if (res) console.log("chat is saved");
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });

  // Handle socket disconnection based on route
  useEffect(() => {
    if (!isActiveUser) return;
    const currentPath = location.pathname;
    const currentHash = location.hash;

    const isRoomPath =
      /^\/room\/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}(\/about)?$/.test(currentPath);
    const isPlayground = currentHash === "#playground";

    // if isRoomPath or isPlayground that means user is still joined
    if (isRoomPath || isPlayground) {
      if (!socket?.connected) {
        socket?.connect();
      }
    } else {
      if (socket?.connected) {
        // if activeusers then only disconnect and save chat
        if (isActiveUser) {
          socket?.disconnect();

          if (discussionData && roomIdRef.current) {
            // save chat
            mutate({ roomId: roomIdRef.current, chat: discussionData.chat });
          }
        }
      }
    }
  }, [
    location.pathname,
    discussionData,
    location.hash,
    isActiveUser,
    roomIdRef,
    roomId,
    socket,
    mutate,
  ]);

  return (
    <SocketContext.Provider
      value={{
        isActiveUser,
        setIsActiveUser,
        discussionData,
        setDiscussionData,
        joinEvent,
        saveCode,
        changeCode,
        socket,
        code,
        setCode,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
