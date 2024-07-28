import RoomSidebar from "../../components/layout/RoomSidebar";
import DescribeForm from "../../components/Room/DescribeForm";
import ProjectDescription from "../../components/Room/ProjectDescription";
import { Tabs } from "../../components/ui/tabs";

function Describe() {
  const tabs = [
    {
      title: "Describe",
      value: "describe",
      content: (
        <div className="w-full overflow-y-auto relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Describe</p>
          <DescribeForm />
        </div>
      ),
    },
    {
      title: "Description",
      value: "description",
      content: (
        <div className="w-full overflow-y-auto relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <ProjectDescription />
        </div>
      ),
    },
  ];

  return (
    <RoomSidebar>
      <div className="p-5 min-h-screen [perspective:1000px] relative flex flex-col w-full items-start justify-start">
        <Tabs tabs={tabs} contentClassName="mt-10" />
      </div>
    </RoomSidebar>
  );
}
export default Describe;
