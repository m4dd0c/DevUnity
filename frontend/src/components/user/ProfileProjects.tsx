import { HoverEffect } from "../ui/card-hover-effect";
import NoResult from "../layout/NoResult";
import { useEffect, useState } from "react";
import { filters } from "../../constants";

const ProfileProjects = ({ user }: { user: IUser | null }) => {
  const [active, setActive] = useState<TFilters>("all");
  const [data, setData] = useState(user?.rooms);

  // search user projects
  const onSubmit = (
    filter: TFilters,
    e: React.MouseEvent<HTMLHeadingElement>,
  ) => {
    e.preventDefault();
    setActive(filter);

    // if filter owned then showing only projects user has created.
    if (filter === "owned") {
      // if userid there then refetchig else falling back to category 'all';
      if (user) {
        const rooms = user.rooms.filter((room) => room.admin === user._id);
        setData(rooms);
      }
    }

    if (filter === "all") setData(user?.rooms);

    if (filter === "contributions") {
      if (user) {
        const rooms = user?.rooms.filter((room) => room.admin !== user._id);
        setData(rooms);
      }
    }
  };

  // setData on page load
  useEffect(() => {
    if (user) setData(user.rooms);
  }, [setData, user]);

  return (
    <div className="lg:w-full lg:overflow-y-scroll">
      {self && !user?.verification.verified && (
        <div className="mb-2 bg-red-500 px-4 text-center dark:text-white max-lg:hidden">
          <h1>
            Please verify your account within 3 days. <br /> Check verification
            mail to associated email address, also checkout spam section.
          </h1>
        </div>
      )}
      <div className="mx-4">
        <div className="flex items-center gap-2 py-2">
          {filters.map((filter) => (
            <h1
              key={filter}
              onClick={(e) => onSubmit(filter, e)}
              className={`${active === filter && "text-indigo-500"} cursor-pointer select-none rounded-full bg-slate-800 px-4 py-2 capitalize`}
            >
              {filter}
            </h1>
          ))}
        </div>
      </div>
      <div className="m-2">
        {data && data.length > 0 ? (
          <HoverEffect items={data} />
        ) : (
          <NoResult text="No project found! Create or contribute." />
        )}
      </div>
    </div>
  );
};

export default ProfileProjects;
