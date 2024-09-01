import { useLocation, useNavigate, useParams } from "react-router-dom";
import RoomSidebar from "../../components/layout/RoomSidebar";
import Dashboard from "../../components/Room/Dashboard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRoomAction } from "../../lib/actions/roomAction";
import { KEYS } from "../../lib/utils";
import { useEffect, useState } from "react";
import { updateDiscussionAction } from "../../lib/actions/discussionAction";
import { useSocket } from "../../context/useSocket";
import toast from "react-hot-toast";

const Playground = ({ user }: { user: null | IUser }) => {
  const { roomId } = useParams();
  const nav = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState(location?.state?.query || "r");
  const { discussionData, isActiveUser, setIsActiveUser } = useSocket();
  // use query for room
  const {
    data: room,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => await getRoomAction({ roomId, query }),
    queryKey: [KEYS.GET_ROOM, roomId],
  });

  // only activeusers can have run and save code
  useEffect(() => {
    if (room && user) {
      if (room.data.activeUsers.includes(user._id)) {
        setIsActiveUser(true);
        setQuery("rwx");
      } else {
        setIsActiveUser(false);
        setQuery("r");
      }
    }
  }, [room, setIsActiveUser, user, refetch]);

  useEffect(() => {
    refetch();
  }, [query]);
  // if !user then
  useEffect(() => {
    if (!user) {
      toast.error("It seems like you're unauthenticated.");
      nav("/auth/signin");
    }
  }, [nav, user]);

  // save chat mutation
  const { mutate } = useMutation({
    mutationFn: updateDiscussionAction,
    onSuccess: (res) => {
      if (res) toast.success("Chat saved!");
    },
  });

  // confirmation before reloading or leaving page
  useEffect(() => {
    const unloadCallback = (event: BeforeUnloadEvent) => {
      // Most browsers will display a confirmation dialog if preventDefault is called.
      event.preventDefault();

      // if user is in activeUsers then only save chat
      if (isActiveUser && discussionData && roomId) {
        // save chat
        mutate({ roomId, chat: discussionData.chat });
      }
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [discussionData, isActiveUser, roomId, mutate]);

  return isLoading || !roomId ? (
    <h1>loading... </h1>
  ) : (
    <RoomSidebar room={room?.data} isActiveUser={isActiveUser}>
      <Dashboard room={room?.data} />
    </RoomSidebar>
  );
};

export default Playground;
