import ProfileProjectsSkeleton from "./ProfileProjectsSkeleton";
const ProfileSkeleton = () => {
  return (
    <div className="h-screen max-lg:h-full w-full bg-black text-white flex overflow-hidden">
      <div className="max-w-6xl w-full mx-auto flex max-lg:flex-col mt-20">
        <div className="h-screen max-lg:h-full p-8 border-r-2 border-r-gray-800">
          <div className="w-56 h-56 skeleton rounded-full" />
          <div className="w-full mt-4">
            <div className="w-fit lg:mx-auto">
              <div className="skeleton h-7 w-52 rounded-lg" />
              <div className="skeleton h-7 w-52 rounded-lg" />
            </div>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full my-8" />
            <div className=" flex flex-col justify-start items-start max-lg:gap-1 gap-1">
              <div className="skeleton h-7 w-52 rounded-lg" />
              <div className="skeleton h-7 w-52 rounded-lg" />
            </div>
          </div>
        </div>
        <ProfileProjectsSkeleton />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
