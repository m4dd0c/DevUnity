const DashboardSkeleton = () => {
  return (
    <div className="flex flex-1">
      <div className="flex size-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900 md:p-10">
        <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first-array" + i}
              className="h-20 w-full animate-pulse  rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          {[...new Array(2)].map((i) => (
            <div
              key={"second-array" + i}
              className="size-full animate-pulse rounded-lg  bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DashboardSkeleton;
