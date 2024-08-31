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
import { createSubmissionAction, getSubmissionAction } from "../api/judge0";
import { langs } from "../constants";
import { server } from "../lib";

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
  submittingCode: boolean;
  submitCode: () => any;
  codeOutput: IGetSubmission | null;
  language: ILang;
  setLanguage: React.Dispatch<SetStateAction<ILang>>;
  setStdin: React.Dispatch<SetStateAction<null | string>>;
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
  const [language, setLanguage] = useState<ILang>(langs[langs.length - 1]); // settings default to javascript
  const [stdin, setStdin] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket>();
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [discussionData, setDiscussionData] = useState<IDiscussion | null>(
    null,
  );

  const [submittingCode, setIsSubmittingCode] = useState(false);
  const [submissionToken, setSubmissionToken] = useState<string | null>(null);
  const [codeOutput, setCodeOutput] = useState<null | IGetSubmission>(null);

  const { mutate: submitCodeMutation } = useMutation({
    mutationFn: createSubmissionAction,
    onSuccess: (res) => {
      if (res) {
        setSubmissionToken(res.token);
      }
    },
  });

  // Polling mechanism for fetching the submission result
  useEffect(() => {
    let intervalId: number | null = null;

    if (submissionToken) {
      intervalId = setInterval(async () => {
        if (submissionToken) {
          try {
            const data = await getSubmissionAction({ submissionToken });
            if (data && data.status.description !== "Processing") {
              setCodeOutput(data as any);
              clearInterval(intervalId!);
              setSubmissionToken(null);
            }
          } catch (error) {
            clearInterval(intervalId!);
            setSubmissionToken(null);
          }
        }
      }, 2000); // Poll every 2 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [submissionToken]);

  if (codeOutput) console.log(codeOutput);
  // isSubmittingCode
  useEffect(() => {
    setIsSubmittingCode(submissionToken !== null);
  }, [submissionToken]);

  // submit code
  const submitCode: ISocketContext["submitCode"] = () => {
    if (!language) return console.log("language has not been loaded!");
    console.log(stdin, "is stdin");
    submitCodeMutation({
      source_code: btoa(code),
      language_id: language.id,
      stdin: stdin ? btoa(stdin) : null,
    });
  };

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
    const _socket = io(server);
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
        submitCode,
        submittingCode,
        codeOutput,
        setStdin,
        setLanguage,
        language,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
