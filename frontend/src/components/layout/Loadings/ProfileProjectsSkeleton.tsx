import { filters } from "../../../constants";

const ProfileProjectsSkeleton = () => {
  return (
    <div className="lg:overflow-y-scroll lg:w-full">
      <div className="mx-4">
        <div className="flex items-center gap-2 py-2">
          {filters.map((filter) => (
            <h1
              key={filter}
              className={`capitalize select-none cursor-pointer bg-slate-800 rounded-full px-4 py-2`}
            >
              {filter}
            </h1>
          ))}
        </div>
      </div>
      <div className="m-2 flex max-md:justify-center flex-wrap gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-2 skeleton h-56 w-56 rounded-xl" />
        <div className="rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-2 skeleton h-56 w-56" />
        <div className="rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-2 skeleton h-56 w-56 " />
      </div>
    </div>
  );
};

export default ProfileProjectsSkeleton;
