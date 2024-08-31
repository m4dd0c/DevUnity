import fallback_pp from "/assets/fallback_pp.jpg";
import ParseHtml from "./ParseHtml";
import {
  IconCalendarCode,
  IconPointFilled,
  IconRotateClockwise2,
} from "@tabler/icons-react";
import { formatDate, timeAgo } from "../../lib/utils";
import { Link } from "react-router-dom";
import { useSocket } from "../../context/useSocket";

const ProjectDescription = ({ room }: { room: IRoom | undefined }) => {
  const { language } = useSocket();
  return (
    <div className="font-normal space-y-2">
      {room && room.admin && (
        <Link
          to={`/user/${room.admin._id}`}
          className="flex items-center text-black w-fit"
        >
          <div className="p-1 bg-white rounded-full">
            <img
              src={room.admin.avatar.secure_url ?? fallback_pp}
              alt="pp"
              className="rounded-full h-7 w-7 object-cover"
            />
          </div>
          <h1 className="text-sm font-semibold bg-white px-2 rounded-r-full -ml-1">
            @{room.admin.username}
          </h1>
        </Link>
      )}
      <h1 className="text-5xl font-bold capitalize py-2">
        {room?.project?.title}
      </h1>
      <p className="text-sm font-normal">{room?.project?.explanation}</p>
      <div className="flex text-sm flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <IconPointFilled size={20} color={language.color} />
          <h1>{language.label}</h1>
        </div>
        <div className="flex items-center gap-2">
          <IconCalendarCode size={20} color={"skyblue"} />
          <h1>Created {formatDate(room?.createdAt ?? "")}</h1>
        </div>
        <div className="flex items-center gap-2">
          <IconRotateClockwise2 size={20} color={"lightgreen"} />
          <h1>Updated {timeAgo(room?.updatedAt ?? "")}</h1>
        </div>
      </div>
      <br />
      <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-8 h-[1px] w-full" />
      <br />
      {room?.project.description ? (
        <div className="w-full">
          <ParseHtml data={room.project.description} />
        </div>
      ) : (
        <div className="grid w-full h-full place-items-center">
          <h1 className="opacity-70">No Description added yet :(</h1>
        </div>
      )}
    </div>
  );
};

export default ProjectDescription;
