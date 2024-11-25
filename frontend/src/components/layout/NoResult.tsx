const NoResult = ({ text }: { text?: string }) => {
  return (
    <div className="grid size-full place-items-center dark:bg-black">
      <div className="flex flex-col items-center justify-center">
        <div>
          <img
            src="/assets/layout/noresult.png"
            alt="no-result"
            className="size-72 opacity-80 invert"
          />
        </div>
        <div>{text ? text : "No result found!"}</div>
      </div>
    </div>
  );
};

export default NoResult;
