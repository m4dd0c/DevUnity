import { useModal } from "../../ui/animated-modal";

const CloseModalButton = () => {
  const { setOpen } = useModal();
  return (
    <button
      onClick={() => setOpen(false)}
      className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
    >
      Close
    </button>
  );
};
export default CloseModalButton;
