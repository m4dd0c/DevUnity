import { Dispatch, SetStateAction, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "../../utils/cn";
import { Link, useNavigate } from "react-router-dom";
import { IconLoader, IconLogout } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAction } from "../../lib/actions/userAction";
import { KEYS, showToast } from "../../lib/utils";

function Navbar({
  className,
  userId,
  isRoomPath,
  auth,
  setAuth,
}: {
  className?: string;
  userId: string | null;
  isRoomPath: boolean;
  auth: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
}) {
  const [active, setActive] = useState<string | null>(null);

  const pathname = window.location.pathname;
  const authPath = pathname.startsWith("/auth");

  const queryClient = useQueryClient();
  const nav = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: logoutAction,

    onSuccess: (res) => {
      if (res) {
        showToast({ message: res.message });
        setAuth(false);
        queryClient.invalidateQueries({ queryKey: [KEYS.GET_ME] });
        nav("/");
      }
    },
  });

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
            <HoveredLink href="/#team">Team</HoveredLink>
            <HoveredLink href="/#room-promo">Room Promo</HoveredLink>
          </div>
        </MenuItem>
        <Link to={"/search"} className="dark:text-white">
          Search
        </Link>
        <MenuItem setActive={setActive} active={active} item="Room">
          <div className="grid grid-cols-2 gap-10 p-4 text-sm max-sm:flex max-sm:flex-col max-sm:gap-0 max-sm:space-y-10 max-sm:px-1">
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
        {auth && userId ? (
          <MenuItem setActive={setActive} active={active} item="Profile">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href={`/user/${userId}`}>Account</HoveredLink>
              <HoveredLink href="/password/change">Change password</HoveredLink>
              <HoveredLink href={`/user/${userId}/danger`}>
                Danger zone
              </HoveredLink>

              <button
                onClick={() => mutate()}
                disabled={isPending}
                className="flex cursor-pointer items-center gap-1 border-none text-left dark:text-white"
              >
                <h1>Logout</h1>

                {isPending ? (
                  <IconLoader size={15} className="animate-spin" />
                ) : (
                  <IconLogout size={15} />
                )}
              </button>
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
