const NoResult = ({ text }: { text?: string }) => {
  return (
    <div className="w-full h-full grid place-items-center dark:bg-black">
      <div className="flex flex-col justify-center items-center">
        <div>
          <img
            src="/assets/layout/noresult.png"
            alt="no-result"
            className="h-72 w-72 opacity-80 invert"
          />
        </div>
        <div>{text ? text : "No result found!"}</div>
      </div>
    </div>
  );
};

export default NoResult;
