import { useQuery } from "@tanstack/react-query";
import fallback_pp from "/assets/fallback_pp.jpg";
import { getMeAction } from "../../../lib/actions/userAction";
import { KEYS } from "../../../lib/utils";

const Discussion = ({ chat }: { chat: IDiscussion | undefined }) => {
  const { data, isLoading } = useQuery({
    queryFn: getMeAction,
    queryKey: [KEYS.GET_ME],
  });

  return isLoading ? (
    <h1>loading...</h1>
  ) : (
    <div className="flex flex-col flex-1">
      {chat?.chat.map((message, idx) => (
        <div
          key={idx}
          className={`flex ${!(data?.data._id === message.sender._id) ? "flex-row" : "flex-row-reverse"} items-center`}
        >
          <img
            src={message.sender.avatar.secure_url ?? fallback_pp}
            alt={message.sender.username}
            className="h-7 w-7 rounded-full"
          />
          <div className="max-w-[80%] max-lg:max-w-[90%] my-1 bg-blue-500 text-white py-1 px-2 mx-2 rounded-md">
            <small className="text-blue-800 line-clamp-1 text-xs">
              {message.sender.username}
            </small>
            <p className="">{message.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Discussion;
