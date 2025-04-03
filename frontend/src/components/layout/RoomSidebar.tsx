import React, { useEffect, useState } from "react";
import fallback_pp from "/assets/fallback_pp.jpg";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconCopy,
  IconDeviceFloppy,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { cn } from "../../utils/cn";
import { Logo, LogoIcon } from "../ui/misc";
import { links } from "../../constants";
import { useSocket } from "../../context/useSocket";
import { handleCopy, validatePlaygroundPath } from "../../lib/utils";

function RoomSidebar({
  children,
  isActiveUser,
  room,
}: {
  children: React.ReactNode;
  isActiveUser: boolean;
  room: IRoom | undefined;
}) {
  const [open, setOpen] = useState(false);
  const { saveCode, submitCode } = useSocket();

  // Adding Keyboard Shortcuts
  useEffect(() => {
    const keyboardFn = (evt: React.KeyboardEvent) => {
      evt.preventDefault();
      if (evt.ctrlKey && (evt.key === "s" || evt.key === "S")) {
        saveCode({ roomId: room?.roomId || "" });
      }
      if (evt.ctrlKey && evt.key === "Enter") {
        submitCode();
      }
    };
    // Shortcut Keys will only work when socket is connected.
    if (
      isActiveUser &&
      validatePlaygroundPath(location.pathname + location.hash)
    )
      document.addEventListener("keydown", keyboardFn as any);
    return () => {
      document.removeEventListener("keydown", keyboardFn as any);
    };
  }, [isActiveUser, room, saveCode, submitCode]);

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody
          isActiveUser={isActiveUser}
          className="justify-between gap-10"
        >
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => {
                // if the loggedin user isnt in the activeUsers then not showing dashboard
                if (!isActiveUser && link.label === "Dashboard") return;
                return <SidebarLink room={room} key={idx} link={link} />;
              })}
            </div>
          </div>
          <div>
            {isActiveUser && (
              <>
                <SidebarLink
                  onClick={submitCode}
                  link={{
                    label: "Run (ctrl+r)",
                    icon: (
                      <IconPlayerPlayFilled className="size-5 shrink-0 text-indigo-500" />
                    ),
                  }}
                />
                <SidebarLink
                  onClick={() => saveCode({ roomId: room?.roomId || "" })}
                  link={{
                    label: "Save code (ctrl+s)",
                    icon: (
                      <IconDeviceFloppy className="size-5 shrink-0 text-indigo-500" />
                    ),
                  }}
                />
              </>
            )}
            <SidebarLink
              onClick={handleCopy}
              link={{
                label: "Copy RoomId",
                icon: <IconCopy className="size-5 shrink-0 text-indigo-500" />,
              }}
            />
            <SidebarLink
              link={{
                label: room?.admin.username || "DevUnity",
                href: `/user/${room?.admin._id || "/"}`,
                icon: (
                  <img
                    src={room?.admin.avatar.secure_url || fallback_pp}
                    className="size-7 shrink-0 rounded-full object-cover"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}

export default RoomSidebar;
