import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { cn } from "../../utils/cn";
import { userSettingsLinks } from "../../constants";

function UserSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-slate-900 w-screen flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen",
      )}
    >
      <Sidebar>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-14 pl-2 flex flex-col gap-2">
              {userSettingsLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}

export default UserSidebar;
