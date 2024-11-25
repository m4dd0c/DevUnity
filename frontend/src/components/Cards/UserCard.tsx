import { IconCalendarMonth, IconMapPin } from "@tabler/icons-react";
import fallback_pp from "/assets/fallback_pp.jpg";
import { formatDate } from "../../lib/utils";
import { Link } from "react-router-dom";

const UserCard = ({ user }: { user: IUser }) => {
  return (
    <Link className="my-1 block" to={`/user/${user._id}`}>
      <div className="mx-auto flex w-11/12 items-center gap-7 rounded-xl bg-slate-900 p-4 max-md:w-full max-md:gap-4 max-md:rounded-none max-md:p-2">
        <div className="min-h-16 min-w-16 max-md:min-h-12 max-md:min-w-12">
          <img
            alt="logo"
            className="size-16 rounded-full object-cover max-md:size-12"
            src={
              user && user.avatar.secure_url
                ? user.avatar.secure_url
                : fallback_pp
            }
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="max-md:text-md line-clamp-1 text-lg">{user.name}</h1>
            <h1 className="text-gray-500">@{user.username}</h1>
          </div>
          <p className="my-1 line-clamp-2 text-sm text-gray-500">{user.bio}</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <IconCalendarMonth size={15} color="gray" />
              <h1>{formatDate(user.createdAt)}</h1>
            </div>
            {user.location && (
              <div className="flex items-center gap-1">
                <IconMapPin size={15} color="gray" />
                <h1>{user.location}</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
