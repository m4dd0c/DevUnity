import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../../ui/animated-modal";
import { motion } from "framer-motion";
import CloseModalButton from "./CloseModalButton";
import fallback_pp from "/assets/fallback_pp.jpg";
import { Link } from "react-router-dom";

function UsersModal({
  animate,
  open,
  icon,
  room,
  label,
}: {
  animate: boolean;
  room?: IRoom;
  open: boolean;
  icon: React.ReactNode | React.JSX.Element;
  label: string;
}) {
  return (
    <Modal>
      <ModalTrigger className="group/sidebar flex items-center justify-start  gap-2 py-2">
        {icon}
        <motion.span
          animate={{
            display: animate
              ? open
                ? "inline-block"
                : "none"
              : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className="!m-0 inline-block whitespace-pre !p-0 text-sm text-neutral-700 transition duration-150 group-hover/sidebar:translate-x-1 dark:text-neutral-200"
        >
          {label}
        </motion.span>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <h4 className="mb-8 text-center text-lg font-bold text-neutral-600 dark:text-neutral-100 md:text-2xl">
            Collaborators right now.
          </h4>
          <div className="mx-auto flex max-h-[50vh] w-full flex-wrap items-start justify-center gap-4 overflow-y-auto py-10">
            {room?.participents.map((user, idx) => (
              <Link
                to={`/user/${user._id}`}
                key={idx}
                className="w-1/4 rounded-md bg-neutral-900 p-4 max-lg:w-full max-sm:w-full"
              >
                <img
                  src={user.avatar.secure_url ?? fallback_pp}
                  className="mx-auto size-7 rounded-full object-cover"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
                <h1
                  className={`line-clamp-1 text-center ${room?.admin._id === user._id ? "text-violet-500" : "text-white"}`}
                >
                  @{user.username}
                </h1>
              </Link>
            ))}
          </div>
        </ModalContent>
        <ModalFooter className="gap-4">
          <CloseModalButton />
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
export default UsersModal;
