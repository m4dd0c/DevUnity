import Navbar from "./Navbar";
import { HashLink } from "react-router-hash-link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { validateRoomPath } from "../../lib/utils";

const Header = ({
  user_id,
  auth,
  setAuth,
}: {
  auth: boolean;
  user_id: string | null;
  setAuth: Dispatch<SetStateAction<boolean>>;
}) => {
  // If the current path is a room path, hide the header
  const [isRoomPath, setIsRoomPath] = useState(false);
  useEffect(() => {
    setIsRoomPath(validateRoomPath(window.location.href));
  }, []);
  return (
    <>
      <div
        className={`${isRoomPath && "hidden"} fixed z-[99999] h-20 text-white max-sm:hidden`}
      >
        <div className="flex items-center justify-between">
          <HashLink
            className="flex items-center justify-start"
            smooth
            to="/#hero"
          >
            <img src="/assets/logo.png" alt="logo" height={80} width={80} />
            <h1 className="text-2xl font-bold max-lg:hidden">DevUnity</h1>
          </HashLink>
        </div>
      </div>
      <Navbar
        userId={user_id}
        isRoomPath={isRoomPath}
        auth={auth}
        setAuth={setAuth}
      />
    </>
  );
};
export default Header;
