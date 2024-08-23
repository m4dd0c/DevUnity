import { useState } from "react";
import fallback_pp from "/assets/fallback_pp.jpg";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { IconCopy, IconPlayerPlayFilled } from "@tabler/icons-react";
import { cn } from "../../utils/cn";
import { Logo, LogoIcon } from "../ui/misc";
import { links } from "../../constants";
import { handleCopy, runCode } from "../../utils/playground/utils";

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

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
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
              <SidebarLink
                onClick={runCode}
                link={{
                  label: "Run (ctrl+r)",
                  icon: (
                    <IconPlayerPlayFilled className="text-indigo-500 h-5 w-5 flex-shrink-0" />
                  ),
                }}
              />
            )}
            <SidebarLink
              onClick={handleCopy}
              link={{
                label: "Copy RoomId",
                icon: (
                  <IconCopy className="text-indigo-500 h-5 w-5 flex-shrink-0" />
                ),
              }}
            />
            <SidebarLink
              link={{
                label: room?.admin.username || "Collabrite",
                href: `/user/${room?.admin._id || "/"}`,
                icon: (
                  <img
                    src={room?.admin.avatar.secure_url || fallback_pp}
                    className="h-7 w-7 flex-shrink-0 rounded-full object-cover"
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
