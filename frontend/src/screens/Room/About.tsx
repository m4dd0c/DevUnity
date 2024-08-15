import { useLocation, useNavigate, useParams } from "react-router-dom";
import RoomSidebar from "../../components/layout/RoomSidebar";
import DescribeForm from "../../components/Room/DescribeForm";
import ProjectDescription from "../../components/Room/ProjectDescription";
import { Tabs } from "../../components/ui/tabs";
import { useEffect, useState } from "react";
import { KEYS } from "../../lib/utils";
import { getRoomAction } from "../../lib/actions/roomAction";
import { useQuery } from "@tanstack/react-query";
import SettingsForm from "../../components/Room/SettingsForm";

function Describe({ user }: { user: IUser | null }) {
  const nav = useNavigate();
  const location = useLocation();
  // setting default to preview mode
  const query = location?.state?.query || "r";
  const { roomId } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);

  // fetching room data
  const {
    refetch,
    data: room,
    isLoading,
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
        <SettingsForm isAdmin={isAdmin} />
      </div>
    ),
  };

  // only showing describe if Admin
  const tabs = isAdmin ? [description, describe, security] : [description];

  // refetching room when roomId changes
  useEffect(() => {
    if (roomId) refetch();
  }, [roomId, refetch]);

  // setting admin state
  useEffect(() => {
    if (user && room && room.data.admin._id === user._id) {
      console.log("im admin");
      setIsAdmin(true);
    }
  }, [setIsAdmin, room, user]);

  // if user is null
  useEffect(() => {
    if (!user) {
      console.log("no user found");
      nav(-1);
    }
  }, [user, nav]);

  return isLoading || !roomId ? (
    <h1>loading...</h1>
  ) : (
    <RoomSidebar>
      <div className="p-5 min-h-screen [perspective:1000px] relative flex flex-col w-full items-start justify-start">
        <Tabs tabs={tabs} contentClassName="mt-10" />
      </div>
    </RoomSidebar>
  );
}
export default Describe;
