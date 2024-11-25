import { useModal } from "../../ui/animated-modal";

const CloseModalButton = () => {
  const { setOpen } = useModal();
  return (
    <button
      onClick={() => setOpen(false)}
      className="w-28 rounded-md border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-black dark:border-black dark:bg-black dark:text-white"
    >
      Close
    </button>
  );
};
export default CloseModalButton;
