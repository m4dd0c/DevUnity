import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { IconCopy, IconPlayerPlayFilled } from "@tabler/icons-react";
import { cn } from "../../utils/cn";
import { Logo, LogoIcon } from "../ui/misc";
import { links } from "../../constants";
import { handleCopy, runCode } from "../../utils/playground/utils";
import { useParams } from "react-router-dom";

function RoomSidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { roomId } = useParams();

  useEffect(() => {
    if (!roomId) setLoading(true);
    else setLoading(false);
  }, [setLoading, roomId]);

  return loading ? (
    <h1>loading...</h1>
  ) : (
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
              {links.map((link, idx) => (
                <SidebarLink roomId={roomId} key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              onClick={runCode}
              link={{
                label: "Run (ctrl+r)",
                icon: (
                  <IconPlayerPlayFilled className="text-indigo-500 h-5 w-5 flex-shrink-0" />
                ),
              }}
            />
            <SidebarLink
              onClick={handleCopy}
              link={{
                label: "Copy RoomId",
                icon: (
                  <IconCopy className="text-indigo-500 h-5 w-5 flex-shrink-0" />
                ),
              }}
            />
            {/* TODO: add dynamic values */}
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
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
