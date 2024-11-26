import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { ev, getLang, showToast } from "../lib/utils";
import { useMutation } from "@tanstack/react-query";
import { saveCodeAction } from "../lib/actions/roomAction";
import { updateDiscussionAction } from "../lib/actions/discussionAction";
import { createSubmissionAction, getSubmissionAction } from "../api/judge0";
import { langs } from "../constants";
import { server } from "../lib";
import { SocketContext } from "./context";

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const location = useLocation();
  const [newMessageIndicator, setNewMessageIndicator] = useState(false);
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
          } catch {
            // todo: maybe show error msg
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

  // isSubmittingCode
  useEffect(() => {
    setIsSubmittingCode(submissionToken !== null);
  }, [submissionToken]);

  // submit code
  const submitCode: ISocketContext["submitCode"] = () => {
    if (!language)
      return showToast({
        message: "Language has not yet loaded!",
        icon: "ℹ ",
        type: "icon",
      });

    submitCodeMutation({
      source_code: btoa(code),
      language_id: language.id,
      stdin: stdin ? btoa(stdin) : null,
    });
  };

  // save code
  const saveCode: ISocketContext["saveCode"] = ({ roomId }) => {
    saveCodeMutation({ roomId, code });
  };

  const { mutate: saveCodeMutation } = useMutation({
    mutationFn: saveCodeAction,
    onSuccess: (res) => {
      if (res) showToast({ message: res.message });
    },
  });

  // send new language to everyone
  const sendLanguage: ISocketContext["sendLanguage"] = ({ lang, roomId }) => {
    if (!socket || !roomId) return;
    socket.emit(ev["f:lang_change"], { roomId, lang });
  };

  const changeLang = useCallback(({ lang }: { lang: TLang }) => {
    if (!lang) return;
    const newLang = getLang(lang);
    if (!newLang) return;
    setLanguage(newLang);
  }, []);

  // joinEvent
  const joinEvent: ISocketContext["joinEvent"] = useCallback(
    ({ roomId, userId }) => {
      if (!socket || !roomId || !userId) return;
      socket.emit(ev["f:join"], { roomId, userId });
    },
    [socket],
  );

  // change ace content
  const changeCode: ISocketContext["changeCode"] = useCallback(
    ({ roomId, code }) => {
      if (!socket || !roomId) return;
      socket.emit(ev["f:code_change"], { roomId, code });
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
      showToast({ message: data.message });
    });
    _socket.on(ev["b:lang_change"], changeLang);
    setSocket(_socket);

    return () => {
      _socket.off(ev["b:join"]);
      _socket.off(ev["b:lang_change"], changeLang);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, [changeLang]);

  // save chat mutation
  const { mutate } = useMutation({
    mutationFn: updateDiscussionAction,
    onSuccess: (res) => {
      if (res) showToast({ message: res.message });
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
        sendLanguage,
        setNewMessageIndicator,
        newMessageIndicator,
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
