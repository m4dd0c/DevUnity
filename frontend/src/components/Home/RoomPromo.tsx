import { Link } from "react-router-dom";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { words } from "../../constants";
function RoomPromo() {
  return (
    <div
      className="flex flex-col items-center justify-center h-[40rem]"
      id="room-promo"
    >
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          <Link to="/room/join">Join a Room</Link>
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          <Link to="/room/create">Create a Room</Link>
        </button>
      </div>
    </div>
  );
}
export default RoomPromo;
