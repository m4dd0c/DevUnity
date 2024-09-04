import { IconCalendarMonth, IconMapPin } from "@tabler/icons-react";
import fallback_pp from "/assets/fallback_pp.jpg";
import { formatDate } from "../../lib/utils";
import { Link } from "react-router-dom";

const UserCard = ({ user }: { user: IUser }) => {
  return (
    <Link className="my-1 block" to={`/user/${user._id}`}>
      <div className="bg-slate-900 rounded-xl max-md:rounded-none mx-auto flex max-md:p-2 p-4 w-11/12 max-md:w-full gap-7 max-md:gap-4 items-center">
        <div className="min-w-16 min-h-16 max-md:min-h-12 max-md:min-w-12">
          <img
            alt="logo"
            className="h-16 w-16 max-md:h-12 max-md:w-12 rounded-full object-cover"
            src={
              user && user.avatar.secure_url
                ? user.avatar.secure_url
                : fallback_pp
            }
          />
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <h1 className="text-lg max-md:text-md line-clamp-1">{user.name}</h1>
            <h1 className="text-gray-500">@{user.username}</h1>
          </div>
          <p className="text-gray-500 line-clamp-2 my-1 text-sm">{user.bio}</p>
          <div className="flex text-gray-500 gap-4 text-sm">
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
