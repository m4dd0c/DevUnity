import { useLocation, useNavigate, useParams } from "react-router-dom";
import RoomSidebar from "../../components/layout/RoomSidebar";
import DescribeForm from "../../components/Room/DescribeForm";
import ProjectDescription from "../../components/Room/ProjectDescription";
import { Tabs } from "../../components/ui/tabs";
import { useEffect, useState } from "react";
import { getLang, KEYS } from "../../lib/utils";
import { getRoomAction } from "../../lib/actions/roomAction";
import { useMutation, useQuery } from "@tanstack/react-query";
import SettingsForm from "../../components/Room/SettingsForm";
import { updateDiscussionAction } from "../../lib/actions/discussionAction";
import { useSocket } from "../../context/useSocket";
import toast from "react-hot-toast";
import Loader from "../../components/layout/Loadings/Loader";

function Describe({ user }: { user: IUser | null }) {
  const nav = useNavigate();
  // setting default to preview mode
  // while visting from search or profile add query 'r' TODO:;
  const { roomId } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const [query, setQuery] = useState(location?.state?.query || "r");
  const { discussionData, isActiveUser, setIsActiveUser, setLanguage } =
    useSocket();

  // fetching room data
  const {
    data: room,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => await getRoomAction({ roomId, query }),
    queryKey: [KEYS.GET_ROOM, roomId],
  });

  // description tab
  const description = {
    title: "Description",
    value: "description",
    content: (
      <div className="w-full overflow-y-auto relative h-full rounded-2xl p-7 max-md:p-3 max-md:pb-16 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
        <ProjectDescription room={room?.data} />
      </div>
    ),
  };

  // describe tab
  const describe = {
    title: "Describe",
    value: "describe",
    content: (
      <div className="w-full overflow-y-auto relative h-full rounded-2xl p-7 max-md:p-3 max-md:pb-16 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
        <p>Describe</p>
        <DescribeForm isAdmin={isAdmin} room={room?.data} />
      </div>
    ),
  };

  // security tab
  const security = {
    title: "Settings",
    value: "settings",
    content: (
      <div className="w-full overflow-y-auto relative h-full rounded-2xl p-7 max-md:p-3 max-md:pb-16 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
        <p>Settings</p>
        <SettingsForm isAdmin={isAdmin} room={room?.data} />
      </div>
    ),
  };

  // only showing describe if Admin
  const tabs = isAdmin ? [description, describe, security] : [description];

  // setting admin state
  useEffect(() => {
    if (user && room && room.data.admin._id === user._id) {
      setIsAdmin(true);
    }
  }, [setIsAdmin, room, user]);

  // if user is null
  useEffect(() => {
    if (!user) {
      toast.error("It seems like you're unauthenticated.");
      return nav("/auth/signin");
    }
  }, [user, nav]);

  // only activeUsers can have run and save code
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
  }, [room, user, refetch, setIsActiveUser]);

  // calling refetch everytime query changes
  useEffect(() => {
    refetch();
  }, [query]);

  // save chat mutation
  const { mutate } = useMutation({
    mutationFn: updateDiscussionAction,
    onSuccess: (res) => {
      if (res) toast.success("Chat saved!");
    },
  });
  // settings language
  useEffect(() => {
    if (room) {
      const lang = getLang(room.data.project.lang);
      if (lang) setLanguage(lang);
    }
  }, [room, setLanguage]);

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
  }, [isActiveUser, mutate, roomId, discussionData]);

  return isLoading || !roomId ? (
    <div className="bg-neutral-950 grid place-items-center h-screen w-full">
      <Loader />
    </div>
  ) : (
    <RoomSidebar room={room?.data} isActiveUser={isActiveUser}>
      <div className="p-5 min-h-screen [perspective:1000px] relative flex flex-col w-full items-start justify-start">
        <Tabs tabs={tabs} contentClassName="mt-10" />
      </div>
    </RoomSidebar>
  );
}
export default Describe;
