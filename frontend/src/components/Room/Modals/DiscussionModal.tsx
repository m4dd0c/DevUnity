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
import { ev, KEYS } from "../../../lib/utils";
import { getDiscussionAction } from "../../../lib/actions/discussionAction";
import { useCallback, useEffect, useState } from "react";
import { getMeAction } from "../../../lib/actions/userAction";
import { useSocket } from "../../../context/useSocket";

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
  const { socket } = useSocket();
  const [msg, setMsg] = useState("");
  const [discussionData, setDiscussionData] = useState<IDiscussion | null>(
    null,
  );

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
      if (!user) return console.log("please login.");
      if (!discussionData) return console.log("discussiondata is null");
      if (!room) return console.log("room not found");

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
          console.log("socket not found!");
          return newData;
        }
        // sending discussionData to everyone in the room
        socket.emit(ev["f:message"], { chat: newData, roomId: room.roomId });
        return newData;
      });
    }
  };

  // only participents can send messages
  useEffect(() => {
    if (
      room?.participents.find(
        (participent) => participent._id === user?.data._id,
      )
    ) {
      setIsAllowed(true);
    }
  }, [room?.participents, user]);

  // requesting chat
  const chatReq = useCallback(
    ({ socketId }: { socketId: string }) => {
      if (!socket) return console.log("socket not found");
      socket.emit(ev["f:chat_load"], { socketId, chat: discussionData });
    },
    [discussionData, socket],
  );

  const chatSet = ({ chat }: { chat: IDiscussion }) => {
    // something TODO:
    setDiscussionData(chat);
  };

  const recvMessage = useCallback(({ chat }: { chat: IDiscussion }) => {
    setDiscussionData(chat);
  }, []);
  // get init chat
  useEffect(() => {
    if (!socket || !room) return console.log("socket or room not loaded!");

    // listeners
    socket.on(ev["b:chat_req"], chatReq);
    socket.on(ev["b:chat_load"], chatSet);
    socket.on(ev["b:message"], recvMessage);
    return () => {
      socket.off(ev["b:chat_req"], chatReq);
      socket.off(ev["b:chat_load"], chatSet);
      socket.off(ev["b:message"], recvMessage);
    };
  }, [socket, chatReq, room, recvMessage]);

  useEffect(() => {
    if (!room || !socket)
      return console.log("either room or socket not yet loaded!");
    //emits
    socket.emit(ev["f:chat_req"], { roomId: room.roomId });
  }, [socket, room]);

  // get database saved discussion initially
  useEffect(() => {
    if (data) setDiscussionData(data.data);
  }, [data]);

  const isDisabled = !msg || !isAllowed;
  const isLoading = isLoadingUser || isLoadingDiscussion;

  return isLoading ? (
    <h1>loading...</h1>
  ) : (
    <Modal>
      <ModalTrigger className="flex items-center justify-start gap-2  group/sidebar py-2">
        {icon}
        <motion.span
          animate={{
            display: animate
              ? open
                ? "inline-block"
                : "none"
              : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
        >
          {label}
        </motion.span>
      </ModalTrigger>
      <ModalBody>
        <ModalContent className="p-4">
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
            Discussion
          </h4>
          <div className="py-10 flex flex-wrap gap-4 items-start justify-center w-full mx-auto overflow-y-auto max-h-[60vh]">
            <div className="flex flex-1 justify-center items-center">
              <Discussion chat={discussionData} />
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
            className="rounded-full p-3 grid place-items-center bg-neutral-800 hover:shadow-custom active:bg-blue-500"
          >
            <IconSend color="white" size={20} />
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
export default DiscussionModal;
