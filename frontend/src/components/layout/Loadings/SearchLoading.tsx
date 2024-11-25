const SearchLoading = () => {
  return (
    <div className="grid place-items-center">
      <div className="skeleton mx-auto flex h-24 w-11/12 items-center gap-7 rounded-xl p-4 max-md:w-full max-md:gap-4 max-md:rounded-none max-md:p-2" />
      <div className="skeleton mx-auto flex h-24 w-11/12 items-center gap-7 rounded-xl p-4 max-md:w-full max-md:gap-4 max-md:rounded-none max-md:p-2" />
      <div className="skeleton mx-auto flex h-24 w-11/12 items-center gap-7 rounded-xl p-4 max-md:w-full max-md:gap-4 max-md:rounded-none max-md:p-2" />
    </div>
  );
};

export default SearchLoading;
