import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../../ui/animated-modal";
import { motion } from "framer-motion";
import CloseModalButton from "./CloseModalButton";
import { dummyUsers } from "../../../constants";

function UsersModal({
  animate,
  open,
  icon,
  label,
}: {
  animate: boolean;
  open: boolean;
  icon: React.ReactNode | React.JSX.Element;
  label: string;
}) {
  return (
    <Modal>
      <ModalTrigger className="flex items-center justify-start gap-2  group/sidebar py-2">
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
          className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
        >
          {label}
        </motion.span>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
            Collaborators right now.
          </h4>
          <div className="py-10 flex flex-wrap gap-4 items-start justify-center w-full mx-auto overflow-y-auto max-h-[50vh]">
            {dummyUsers.map((user, idx) => (
              <div
                key={idx}
                className="bg-neutral-900 p-4 rounded-md w-1/4 max-sm:w-full max-lg:w-full"
              >
                <img
                  src={user.avatar}
                  className="h-7 w-7 rounded-full mx-auto"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
                <h1
                  className={`line-clamp-1 text-center ${user.admin ? "text-violet-500" : "text-white"}`}
                >
                  {user.name}
                </h1>
              </div>
            ))}
            {/* INFO:  text data as body content */}
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
