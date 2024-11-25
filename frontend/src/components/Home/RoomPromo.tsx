import { Link } from "react-router-dom";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { words } from "../../constants";
function RoomPromo() {
  return (
    <div
      className="flex h-[40rem] flex-col items-center justify-center"
      id="room-promo"
    >
      <p className="text-xs text-neutral-600 dark:text-neutral-200 sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <button className="h-10 w-40 rounded-xl border border-transparent bg-black text-sm text-white dark:border-white">
          <Link to="/room/join">Join a Room</Link>
        </button>
        <button className="h-10 w-40 rounded-xl border border-black bg-white text-sm  text-black">
          <Link to="/room/create">Create a Room</Link>
        </button>
      </div>
    </div>
  );
}
export default RoomPromo;
