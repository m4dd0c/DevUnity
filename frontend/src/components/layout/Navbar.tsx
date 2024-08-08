import { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";

function Navbar({
  className,
  isRoomPath,
  auth,
}: {
  className?: string;
  isRoomPath: boolean;
  auth: boolean;
}) {
  const [active, setActive] = useState<string | null>(null);

  const pathname = window.location.pathname;
  const authPath = pathname.startsWith("/auth");
  return (
    <div
      className={cn(
        `${isRoomPath ? "hidden" : "fixed"} top-3 inset-x-0 max-w-2xl mx-auto z-[99999]`,
        className,
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/#hero">Hero</HoveredLink>
            <HoveredLink href="/#features">Features</HoveredLink>
            <HoveredLink href="/#testimonials">Testimonials</HoveredLink>
            <HoveredLink href="/#brands">Brands</HoveredLink>
            <HoveredLink href="/#team">team</HoveredLink>
            <HoveredLink href="/#room-promo">Room Promo</HoveredLink>
          </div>
        </MenuItem>
        <Link to={"/search"} className="dark:text-white">
          Search
        </Link>
        <MenuItem setActive={setActive} active={active} item="Room">
          <div className="text-sm grid grid-cols-2 gap-10 p-4 max-sm:flex max-sm:flex-col max-sm:px-1 max-sm:gap-0 max-sm:space-y-10">
            <ProductItem
              title="Create Room"
              href="/room/create"
              src="/assets/navbar/create-room.png"
              description="Kickstart a Project by Creating a Room."
            />
            <ProductItem
              title="Join Room"
              href="/room/join"
              src="/assets/navbar/join-room.png"
              description="Join Room and sky rocket Development journey."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Other">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/contact">Get in touch</HoveredLink>
            <HoveredLink href="/about">Know about us</HoveredLink>
            <HoveredLink href="/privacy-policy">Privacy Policy</HoveredLink>
            <HoveredLink href="/terms-conditions">
              Terms &amp; Conditions
            </HoveredLink>
          </div>
        </MenuItem>
        {auth ? (
          <MenuItem setActive={setActive} active={active} item="Profile">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/user/:userId">Account</HoveredLink>
              <HoveredLink href="/password/change">Change password</HoveredLink>
              <HoveredLink href="/user/:userId/danger">Danger zone</HoveredLink>
            </div>
          </MenuItem>
        ) : (
          <h1 className={`${authPath ? "text-cyan-500" : "text-indigo-500"}`}>
            <Link to="/auth/signin">Signin</Link>
          </h1>
        )}
      </Menu>
    </div>
  );
}
export default Navbar;
