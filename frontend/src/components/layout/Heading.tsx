const Heading = ({ children, subtitle, className = "", ...rest }: any) => {
  return (
    <div className="py-4 mb-5">
      <h1
        {...rest}
        className={`text-2xl select-none px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl text-center leading-relaxed lg:leading-snug mx-auto flex-1 ${className}`}
      >
        {children}
      </h1>
      {subtitle && (
        <p className="text-sm text-neutral-200 text-center pb-2">{subtitle}</p>
      )}
      <div className="flex gap-3 justify-center items-center">
        <span className="rounded-full w-16 inline-block bg-gradient-to-r from-indigo-500 to-purple-500 h-2"></span>
        <span className="rounded-full w-8 inline-block bg-gradient-to-r bg-purple-500 to-indigo-500 h-2"></span>
      </div>
    </div>
  );
};

export default Heading;
