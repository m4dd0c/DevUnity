import ProfileProjectsSkeleton from "./ProfileProjectsSkeleton";
const ProfileSkeleton = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-black text-white max-lg:h-full">
      <div className="mx-auto mt-20 flex w-full max-w-6xl max-lg:flex-col">
        <div className="h-screen border-r-2 border-r-gray-800 p-8 max-lg:h-full">
          <div className="skeleton size-56 rounded-full" />
          <div className="mt-4 w-full">
            <div className="w-fit lg:mx-auto">
              <div className="skeleton h-7 w-52 rounded-lg" />
              <div className="skeleton h-7 w-52 rounded-lg" />
            </div>
            <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
            <div className=" flex flex-col items-start justify-start gap-1 max-lg:gap-1">
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
