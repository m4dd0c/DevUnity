const Heading = ({ children, subtitle, className = "", ...rest }: any) => {
  return (
    <div className="mb-5 py-4">
      <h1
        {...rest}
        className={`mx-auto max-w-4xl flex-1 select-none px-4 text-center text-2xl font-bold leading-relaxed text-neutral-700 dark:text-white md:text-4xl lg:text-5xl lg:leading-snug ${className}`}
      >
        {children}
      </h1>
      {subtitle && (
        <p className="pb-2 text-center text-sm text-neutral-200">{subtitle}</p>
      )}
      <div className="flex items-center justify-center gap-3">
        <span className="inline-block h-2 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></span>
        <span className="inline-block h-2 w-8 rounded-full bg-purple-500 bg-gradient-to-r to-indigo-500"></span>
      </div>
    </div>
  );
};

export default Heading;
