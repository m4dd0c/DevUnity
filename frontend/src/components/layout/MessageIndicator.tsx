const MessageIndicator = ({
  newMessageIndicator,
}: {
  newMessageIndicator: boolean;
}) => {
  return (
    <div
      className={`${newMessageIndicator ? "absolute" : "hidden"} rounded-full overflow-hidden top-[1px] right-0 h-[11px] grid place-items-center w-[11px] bg-neutral-900`}
    >
      <span className="rounded-full h-[9px] w-[9px] block bg-red-500" />
    </div>
  );
};

export default MessageIndicator;
