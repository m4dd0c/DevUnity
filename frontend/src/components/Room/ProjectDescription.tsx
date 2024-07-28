import { mdx } from "../../constants";
import ParseHtml from "./ParseHtml";

const ProjectDescription = () => {
  const projectName = "CordEditor";
  const slogan = "Edit with your friends.";
  return (
    <div>
      <p>{projectName}</p>
      <p className="text-sm font-normal">{slogan}</p>
      <ParseHtml data={mdx} />
    </div>
  );
};

export default ProjectDescription;
