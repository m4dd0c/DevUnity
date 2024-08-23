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
  const { data: room, isLoading } = useQuery({
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

  // if !user then
  useEffect(() => {
    if (!user) {
      nav("/");
    }
  }, [nav, user]);

  // confirmation before reloading or leaving page
  useEffect(() => {
    const unloadCallback = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      // Most browsers will display a confirmation dialog if preventDefault is called.
      // No need to assign a value to event.returnValue anymore, it's deprecated.
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  return isLoading ? (
    <h1>loading... </h1>
  ) : (
    <RoomSidebar room={room?.data} query={query}>
      <Dashboard user={user} room={room?.data} />
    </RoomSidebar>
  );
};

export default Playground;
