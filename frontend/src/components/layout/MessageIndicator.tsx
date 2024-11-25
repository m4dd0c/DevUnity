const MessageIndicator = ({
  newMessageIndicator,
}: {
  newMessageIndicator: boolean;
}) => {
  return (
    <div
      className={`${newMessageIndicator ? "absolute" : "hidden"} right-0 top-px grid size-[11px] place-items-center overflow-hidden rounded-full bg-neutral-900`}
    >
      <span className="block size-[9px] rounded-full bg-red-500" />
    </div>
  );
};

export default MessageIndicator;
