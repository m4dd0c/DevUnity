interface IChat {
  avatar: string;
  name: string;
  admin: boolean;
  message: string;
}
const Chat = ({ chat }: { chat: IChat[] }) => {
  // TODO: do something about the "me" thing...
  const me = "Manish Suthar";
  return (
    <div className="flex flex-col flex-1">
      {chat.map((message, idx) => (
        <div
          key={idx}
          className={`flex ${!(me === message.name) ? "flex-row" : "flex-row-reverse"} items-center`}
        >
          <img
            src={message.avatar}
            alt={message.avatar}
            className="h-7 w-7 rounded-full"
          />
          <div className="max-w-[80%] max-lg:max-w-[90%] my-1 bg-blue-500 text-white py-1 px-2 mx-2 rounded-md">
            <small className="text-blue-800 line-clamp-1 text-xs">
              {message.name}
            </small>
            <p className="">{message.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
