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
    <div className="space-y-2 font-normal">
      {room && room.admin && (
        <Link
          to={`/user/${room.admin._id}`}
          className="flex w-fit items-center text-black"
        >
          <div className="rounded-full bg-white p-1">
            <img
              src={room.admin.avatar.secure_url ?? fallback_pp}
              alt="pp"
              className="size-7 rounded-full object-cover"
            />
          </div>
          <h1 className="-ml-1 rounded-r-full bg-white px-2 text-sm font-semibold">
            @{room.admin.username}
          </h1>
        </Link>
      )}
      <h1 className="py-2 text-5xl font-bold capitalize">
        {room?.project?.title}
      </h1>
      <p className="text-sm font-normal">{room?.project?.explanation}</p>
      <div className="flex flex-wrap items-center gap-4 text-sm">
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
      <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
      <br />
      {room?.project.description ? (
        <div className="w-full">
          <ParseHtml data={room.project.description} />
        </div>
      ) : (
        <div className="grid size-full place-items-center">
          <h1 className="opacity-70">No Description added yet :(</h1>
        </div>
      )}
    </div>
  );
};

export default ProjectDescription;
