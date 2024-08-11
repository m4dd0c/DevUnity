import { IconPointFilled, IconRotateClockwise2 } from "@tabler/icons-react";
import fallback_pp from "/assets/fallback_pp.jpg";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }: { project: any }) => {
  console.log(project);
  return (
    <div className="bg-slate-900 rounded-xl max-md:rounded-none mx-auto p-4 w-11/12 max-md:w-full gap-7 max-md:gap-4 items-center">
      <div className="flex items-end gap-4">
        <div className="min-w-6 min-h-6 max-md:min-h-[1.7rem] max-md:min-w-[1.7rem]">
          <img
            alt="logo"
            className="h-6 w-6 max-md:h-[1.7rem] max-md:w-[1.7rem] rounded-md shadow-input shadow-gray-400 object-cover"
            src={project.avatar ? project.avatar : fallback_pp}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Link
            to={"/"}
            className="text-lg font-bold max-md:text-md line-clamp-1 text-indigo-500"
          >
            m4dd0c/{project.title}
          </Link>
        </div>
      </div>
      <div>
        <p className="dark:text-slate-300 line-clamp-2 my-2 max-md:text-sm">
          {project.description}
        </p>
        <div className="flex gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <IconPointFilled size={25} color="yellow" />
            <h1>Javascript</h1>
          </div>
          <div className="flex items-center gap-1">
            <IconRotateClockwise2 size={18} color="#6366f1" />
            <h1>Updated 7 minutes ago</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
