import { filters } from "../../../constants";

const ProfileProjectsSkeleton = () => {
  return (
    <div className="lg:w-full lg:overflow-y-scroll">
      <div className="mx-4">
        <div className="flex items-center gap-2 py-2">
          {filters.map((filter) => (
            <h1
              key={filter}
              className={`cursor-pointer select-none rounded-full bg-slate-800 px-4 py-2 capitalize`}
            >
              {filter}
            </h1>
          ))}
        </div>
      </div>
      <div className="m-2 flex flex-wrap gap-3 max-md:justify-center">
        <div className="skeleton grid size-56 grid-cols-1 rounded-xl py-2 md:grid-cols-2 lg:grid-cols-3" />
        <div className="skeleton grid size-56 grid-cols-1 rounded-xl py-2 md:grid-cols-2 lg:grid-cols-3" />
        <div className="skeleton grid size-56 grid-cols-1 rounded-xl py-2 md:grid-cols-2 lg:grid-cols-3 " />
      </div>
    </div>
  );
};

export default ProfileProjectsSkeleton;
