import { useLocation, useNavigate, useParams } from "react-router-dom";
import RoomSidebar from "../../components/layout/RoomSidebar";
import DescribeForm from "../../components/Room/DescribeForm";
import ProjectDescription from "../../components/Room/ProjectDescription";
import { Tabs } from "../../components/ui/tabs";
import { useEffect, useState } from "react";
import { getLang, KEYS, showToast } from "../../lib/utils";
import { getRoomAction } from "../../lib/actions/roomAction";
import { useMutation, useQuery } from "@tanstack/react-query";
import SettingsForm from "../../components/Room/SettingsForm";
import { updateDiscussionAction } from "../../lib/actions/discussionAction";
import { useSocket } from "../../context/useSocket";
import Loader from "../../components/layout/Loadings/Loader";
import SEO from "../../components/layout/SEO";

function Describe({ user }: { user: IUser | null }) {
  const nav = useNavigate();
  // setting default to preview mode
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
      <div className="relative size-full overflow-y-auto rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-7 text-xl font-bold text-white max-md:p-3 max-md:pb-16 md:text-4xl">
        {/* SEO - INVISIBLE IN PAGE */}
        <SEO
          title={`About - ${room && room.data.project.title} | DevUnity`}
          description="Learn more about this collaboration room on DevUnity."
          name="DevUnity"
          ogType="article"
          twitterCard="summary"
        />

        <ProjectDescription room={room?.data} />
      </div>
    ),
  };

  // describe tab
  const describe = {
    title: "Describe",
    value: "describe",
    content: (
      <div className="relative size-full overflow-y-auto rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-7 text-xl font-bold text-white max-md:p-3 max-md:pb-16 md:text-4xl">
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
      <div className="relative size-full overflow-y-auto rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-7 text-xl font-bold text-white max-md:p-3 max-md:pb-16 md:text-4xl">
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
      showToast({
        message: "It seems like you're unauthenticated.",
        type: "error",
      });
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
  }, [query, refetch]);

  // save chat mutation
  const { mutate } = useMutation({
    mutationFn: updateDiscussionAction,
    onSuccess: (res) => {
      if (res) showToast({ message: res.message });
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
    <div className="grid h-screen w-full place-items-center bg-neutral-950">
      <Loader />
    </div>
  ) : (
    <RoomSidebar room={room?.data} isActiveUser={isActiveUser}>
      <div className="relative flex min-h-screen w-full flex-col items-start justify-start p-5 [perspective:1000px]">
        <Tabs tabs={tabs} contentClassName="mt-10" />
      </div>
    </RoomSidebar>
  );
}
export default Describe;
