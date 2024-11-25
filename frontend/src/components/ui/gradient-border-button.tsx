import React from "react";

const GradientBorderButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="text-md group relative inline-block cursor-pointer rounded-md bg-slate-800 p-px font-semibold leading-6 text-white no-underline shadow-2xl shadow-zinc-900">
      <span className="absolute inset-0 overflow-hidden rounded-md">
        <span className="absolute inset-0 rounded-md bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <div className="relative z-10 flex items-center rounded-md bg-zinc-950 px-6 py-2 ring-1 ring-white/10 ">
        <span>{children}</span>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
    </button>
  );
};

export default GradientBorderButton;
