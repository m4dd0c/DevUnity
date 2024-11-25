import { IconPointFilled, IconRotateClockwise2 } from "@tabler/icons-react";
import fallback_pp from "/assets/fallback_pp.jpg";
import { useNavigate } from "react-router-dom";
import { getLangColor, getLangLabel, timeAgo } from "../../lib/utils";

const ProjectCard = ({ room }: { room: IRoom }) => {
  const nav = useNavigate();

  const handleNavigation = () => {
    nav(`/room/${room.roomId}/about`, { state: { query: "r" } });
  };

  return (
    <div
      onClick={handleNavigation}
      className="mx-auto w-11/12 items-center gap-7 rounded-xl bg-slate-900 p-4 max-md:w-full max-md:gap-4 max-md:rounded-none"
    >
      <div className="flex items-end gap-4">
        <div className="min-h-6 min-w-6 max-md:min-h-[1.7rem] max-md:min-w-[1.7rem]">
          <img
            alt="logo"
            className="size-6 rounded-md object-cover shadow-input shadow-gray-400 max-md:size-[1.7rem]"
            src={room.admin.avatar.secure_url ?? fallback_pp}
          />
        </div>
        <div className="flex cursor-pointer items-center gap-2">
          <h1 className="max-md:text-md line-clamp-1 text-lg font-bold text-indigo-500">
            {room.admin.username}/{room.project.title}
          </h1>
        </div>
      </div>
      <div>
        <p className="my-2 line-clamp-2 dark:text-slate-400 max-md:text-sm">
          {room.project.explanation}
        </p>
        <div className="flex gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <IconPointFilled
              size={25}
              color={getLangColor(room.project.lang)}
            />
            <h1>{getLangLabel(room.project.lang)}</h1>
          </div>
          <div className="flex items-center gap-1">
            <IconRotateClockwise2 size={18} color="#6366f1" />
            <h1>{timeAgo(room.updatedAt)}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
