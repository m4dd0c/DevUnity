import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../../ui/animated-modal";
import { motion } from "framer-motion";
import CloseModalButton from "./CloseModalButton";
import { langs } from "../../../constants";

function LanguageModal({
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
  const [language, setLanguage] = useState({
    label: "Javascript",
    value: "js",
  });
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
            Select Language to code in
          </h4>
          <div
            className="flex justify-center items-center w-full h-full"
            id="radio-select"
          >
            <div className="text-white w-full space-y-2">
              {langs.map((lang) => (
                <div
                  key={lang.value}
                  className="bg-neutral-900 block w-full py-2 px-4 rounded-md"
                >
                  <input
                    onClick={() => setLanguage(lang)}
                    type="radio"
                    id={lang.value}
                    value={lang.value}
                    name="radio-select"
                  />
                  <label htmlFor={lang.value} className="px-4">
                    {lang.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </ModalContent>
        <ModalFooter className="gap-4">
          <CloseModalButton />
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
export default LanguageModal;
