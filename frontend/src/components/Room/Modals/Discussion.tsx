import fallback_pp from "/assets/fallback_pp.jpg";

const Discussion = ({
  chat,
  userId,
}: {
  chat: IDiscussion | null;
  userId?: string;
}) => {
  return (
    <div className="flex flex-1 flex-col">
      {chat &&
        chat.chat.map((message, idx) => (
          <div
            key={idx}
            className={`flex ${!(userId === message?.sender?._id) ? "flex-row" : "flex-row-reverse"} items-center`}
          >
            <img
              src={message?.sender?.avatar?.secure_url ?? fallback_pp}
              alt={message?.sender?.username}
              className="size-7 rounded-full object-cover"
            />
            <div className="mx-2 my-1 max-w-[80%] rounded-md bg-blue-500 px-2 py-1 text-white max-lg:max-w-[90%]">
              <small className="line-clamp-1 text-xs text-blue-800">
                {message?.sender?.username}
              </small>
              <p className="">{message?.message}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Discussion;
