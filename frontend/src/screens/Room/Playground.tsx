import { useNavigate, useParams } from "react-router-dom";
import RoomSidebar from "../../components/layout/RoomSidebar";
import Dashboard from "../../components/Room/Dashboard";
import { useQuery } from "@tanstack/react-query";
import { getRoomAction } from "../../lib/actions/roomAction";
import { KEYS } from "../../lib/utils";
import { useEffect, useState } from "react";

const Playground = ({ user }: { user: null | IUser }) => {
  const { roomId } = useParams();
  const nav = useNavigate();
  const [query, setQuery] = useState<"r" | "rwx">("r");
  // use query for room
  const { refetch, data: room } = useQuery({
    // TODO : fix it according to the loggedin user
    queryFn: async () => await getRoomAction({ roomId, query }),
    queryKey: [KEYS.GET_ROOM, roomId],
  });

  // checking the loggedin user in room
  useEffect(() => {
    if (room && user) {
      if (
        room.data.participents.find(
          (participent) => participent._id === user._id,
        )
      ) {
        setQuery("rwx");
      } else {
        setQuery("r");
      }
    }
  }, [room, user]);

  // refetching user when roomId is available and changed
  useEffect(() => {
    if (roomId) refetch();
  }, [refetch, roomId]);

  // if !user then
  useEffect(() => {
    if (!user) {
      nav("/");
    }
  }, [nav, user]);
  return (
    <RoomSidebar>
      <Dashboard user={user} room={room?.data} />
    </RoomSidebar>
  );
};

export default Playground;
