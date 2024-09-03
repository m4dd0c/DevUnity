import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconCopy,
  IconDeviceFloppy,
  IconMenu2,
  IconPlayerPlayFilled,
  IconX,
} from "@tabler/icons-react";
import RenderModal from "./renderModal";
import { useSocket } from "../../context/useSocket";
import { handleCopy } from "../../lib/utils";
import MessageIndicator from "../layout/MessageIndicator";

interface Links {
  label: string;
  href?: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = ({
  isActiveUser,
  ...props
}: { isActiveUser?: boolean } & React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar
        isActiveUser={isActiveUser}
        {...(props as React.ComponentProps<"div">)}
      />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden  md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] flex-shrink-0",
          className,
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  isActiveUser,
  roomId,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  roomId?: string;
  isActiveUser?: boolean;
}) => {
  const { open, setOpen } = useSidebar();
  const { saveCode, submitCode, newMessageIndicator } = useSocket();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full",
        )}
        {...props}
      >
        <div className="flex gap-4 items-center justify-end z-20 w-full">
          {isActiveUser && (
            <>
              <IconPlayerPlayFilled
                title="Run code"
                className="text-indigo-500 h-5 w-5 flex-shrink-0"
                onClick={submitCode}
              />
              <IconDeviceFloppy
                title="Save code"
                className="text-indigo-500 h-5 w-5 flex-shrink-0"
                onClick={() => saveCode({ roomId: roomId || "" })}
              />
            </>
          )}
          <IconCopy
            title="copy roomId"
            className="text-indigo-500 h-5 w-5 flex-shrink-0"
            onClick={handleCopy}
          />
          <div className="relative">
            <IconMenu2
              className="text-neutral-800 dark:text-neutral-200"
              onClick={() => setOpen(!open)}
            />
            <MessageIndicator newMessageIndicator={newMessageIndicator} />
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
                className,
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  room,
  link,
  className,
  onClick,
  ...props
}: {
  link: Links;
  room?: IRoom;
  className?: string;
  onClick?: () => any;
  props?: any;
}) => {
  const { open, animate } = useSidebar();

  // creating path
  let path = null;

  // case 1:
  // if link.href, and it ain't starting with / then thats an relative path
  // eg: link.href = describe then converting to /room/roomId/describe
  if (link.href) {
    if (!link.href.startsWith("/")) path = `/room/${room?.roomId}/${link.href}`;
    // case 2:
    // if link.href exists and starting with /, then its an absolute path
    // eg: link.href = '/#hero' then http://localhost:5173/#hero
    // since it is default behaviour we don't have to do anything for that.
    else path = link.href;
  }
  // case 3:
  // if link.href doesnt exist that means we gonna render some modal instead
  // also checking of onClick exists or not, if onClick exists that means it is some button eg: copy roomId, run code etc.
  if (
    !onClick &&
    !link.href &&
    (link.label === "Discussion" || link.label === "Users")
  ) {
    return (
      <RenderModal
        room={room}
        icon={link.icon}
        label={link.label}
        animate={animate}
        open={open}
      />
    );
  } else {
    return onClick ? (
      // buttons ie: copy roomId, runCode, saveCode
      <button
        onClick={onClick}
        className={cn(
          "flex items-center justify-start gap-2  group/sidebar py-2",
          className,
        )}
        {...props}
      >
        {link.icon}
        <motion.span
          animate={{
            display: animate
              ? open
                ? "inline-block"
                : "none"
              : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
        >
          {link.label}
        </motion.span>
      </button>
    ) : (
      <Link
        // path wont be null as if it is null than we are showing modal for that.
        to={path!}
        className={cn(
          "flex items-center justify-start gap-2  group/sidebar py-2",
          className,
        )}
        {...props}
      >
        {link.icon}

        <motion.span
          animate={{
            display: animate
              ? open
                ? "inline-block"
                : "none"
              : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
        >
          {link.label}
        </motion.span>
      </Link>
    );
  }
};
