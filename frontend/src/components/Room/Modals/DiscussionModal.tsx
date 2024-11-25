import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../../ui/animated-modal";
import { motion } from "framer-motion";
import { IconSend } from "@tabler/icons-react";
import { Input } from "../../ui/input";
import Discussion from "./Discussion";
import { useQuery } from "@tanstack/react-query";
import { ev, KEYS, showToast } from "../../../lib/utils";
import { getDiscussionAction } from "../../../lib/actions/discussionAction";
import { useCallback, useEffect, useState } from "react";
import { getMeAction } from "../../../lib/actions/userAction";
import { useSocket } from "../../../context/useSocket";
import Loader from "../../layout/Loadings/Loader";
import MessageIndicator from "../../layout/MessageIndicator";

function DiscussionModal({
  animate,
  open,
  icon,
  room,
  label,
}: {
  animate: boolean;
  room?: IRoom;
  open: boolean;
  icon: React.ReactNode | React.JSX.Element;
  label: string;
}) {
  const {
    socket,
    discussionData,
    setDiscussionData,
    setNewMessageIndicator,
    newMessageIndicator,
  } = useSocket();

  const [msg, setMsg] = useState("");
  // discussion data
  const { isLoading: isLoadingDiscussion, data } = useQuery({
    queryFn: async () => await getDiscussionAction(room?._id ?? ""),
    queryKey: [KEYS.GET_DISCUSSION, room?._id],
  });

  // get me
  const { isLoading: isLoadingUser, data: user } = useQuery({
    queryFn: getMeAction,
    queryKey: [KEYS.GET_ME],
  });

  // only participents are Allowed
  const [isAllowed, setIsAllowed] = useState(false);

  // send message function
  const handleSend = () => {
    if (msg.trim() && isAllowed) {
      // append to discussionData.
      if (!user)
        return showToast({
          message: "It seems like you're unauthenticated.",
          type: "error",
        });
      if (!discussionData)
        return showToast({ message: "Something went wrong.", type: "error" });
      if (!room)
        return showToast({ message: "Something went wrong.", type: "error" });

      setDiscussionData((prev) => {
        const newChat = {
          sender: {
            _id: user.data._id,
            avatar: user.data.avatar,
            username: user.data.username,
          },
          message: msg,
        };

        let newData = null;
        if (prev) {
          newData = {
            ...prev,
            chat: [...prev.chat, newChat],
          };
        } else {
          newData = {
            room: room._id,
            admin: room.admin._id,
            _id: room.discussion,
            chat: [newChat],
            createdAt: Date.now().toString(),
            updatedAt: Date.now().toString(),
          };
        }
        if (!socket) {
          return newData;
        }
        // sending discussionData to everyone in the room
        socket.emit(ev["f:message"], { chat: newData, roomId: room.roomId });
        setMsg("");
        return newData;
      });
    }
  };

  // only participents can send messages
  useEffect(() => {
    if (user && room?.activeUsers.includes(user.data._id)) {
      setIsAllowed(true);
    }
  }, [room?.activeUsers, user]);

  // requesting chat
  const chatReq = useCallback(
    ({ socketId }: { socketId: string }) => {
      if (!socket) return;
      socket.emit(ev["f:chat_load"], { socketId, chat: discussionData });
    },
    [discussionData, socket],
  );

  const chatSet = useCallback(
    ({ chat }: { chat: IDiscussion }) => {
      setDiscussionData(chat);
    },
    [setDiscussionData],
  );

  const recvMessage = useCallback(
    ({ chat }: { chat: IDiscussion }) => {
      setNewMessageIndicator(true);
      setDiscussionData(chat);
    },
    [setDiscussionData, setNewMessageIndicator],
  );

  // get init chat
  useEffect(() => {
    if (!socket || !room) {
      console.log({
        info: "Either socket or room has not been loaded!",
      });
      return;
    }

    // listeners
    socket.on(ev["b:chat_req"], chatReq);
    socket.on(ev["b:chat_load"], chatSet);
    socket.on(ev["b:message"], recvMessage);
    return () => {
      socket.off(ev["b:chat_req"], chatReq);
      socket.off(ev["b:chat_load"], chatSet);
      socket.off(ev["b:message"], recvMessage);
    };
  }, [socket, chatReq, room, recvMessage, chatSet]);

  useEffect(() => {
    if (!socket || !room) {
      console.log({
        info: "Either socket or room has not been loaded!",
      });
      return;
    }
    //emits
    socket.emit(ev["f:chat_req"], { roomId: room.roomId });
  }, [socket, room]);

  // get database saved discussion initially
  useEffect(() => {
    if (data) setDiscussionData(data.data);
  }, [data, setDiscussionData]);

  const isDisabled = !msg || !isAllowed;
  const isLoading = isLoadingUser || isLoadingDiscussion;

  return (
    <Modal>
      <ModalTrigger
        showIndicator={true}
        className="group/sidebar flex items-center justify-start gap-2 py-2"
      >
        <div className="relative">
          {icon}
          <MessageIndicator newMessageIndicator={newMessageIndicator} />
        </div>
        <motion.span
          animate={{
            display: animate
              ? open
                ? "inline-block"
                : "none"
              : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className="!m-0 inline-block whitespace-pre !p-0 text-sm text-neutral-700 transition duration-150 group-hover/sidebar:translate-x-1 dark:text-neutral-200"
        >
          {label}
        </motion.span>
      </ModalTrigger>
      <ModalBody>
        <ModalContent className="p-4">
          <h4 className="mb-8 text-center text-lg font-bold text-neutral-600 dark:text-neutral-100 md:text-2xl">
            Discussion
          </h4>
          <div className="mx-auto flex max-h-[60vh] w-full flex-wrap items-start justify-center gap-4 overflow-y-auto py-10">
            <div className="flex flex-1 items-center justify-center">
              {isLoading ? (
                <Loader />
              ) : (
                <Discussion chat={discussionData} userId={user?.data._id} />
              )}
            </div>
          </div>
        </ModalContent>
        <ModalFooter className="gap-4">
          <Input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="enter your thoughts..."
          />
          <button
            onClick={handleSend}
            disabled={isDisabled}
            className="grid place-items-center rounded-full bg-neutral-800 p-3 hover:shadow-custom active:bg-blue-500"
          >
            <IconSend color="white" size={20} />
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
export default DiscussionModal;
