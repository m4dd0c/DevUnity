import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../../ui/animated-modal";
import { motion } from "framer-motion";
import { dummyChat } from "../../../constants";
import { IconSend } from "@tabler/icons-react";
import { Input } from "../../ui/input";
import Discussion from "./Discussion";

function DiscussionModal({
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
        <ModalContent className="p-4">
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
            Discussion
          </h4>
          <div className="py-10 flex flex-wrap gap-4 items-start justify-center w-full mx-auto overflow-y-auto max-h-[60vh]">
            <div className="flex flex-1 justify-center items-center">
              <Discussion chat={dummyChat} />
            </div>
          </div>
        </ModalContent>
        <ModalFooter className="gap-4">
          <Input type="text" placeholder="enter your thoughts..." />
          <button className="rounded-full p-3 grid place-items-center bg-neutral-800 hover:shadow-custom active:bg-blue-500">
            <IconSend color="white" size={20} />
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
export default DiscussionModal;
