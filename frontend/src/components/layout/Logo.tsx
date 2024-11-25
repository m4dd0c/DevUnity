import { useEffect, useRef } from "react";

const Logo = ({ size = "25px" }: { size?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty("--logo-size", size);
    }
  }, [ref, size]);
  return (
    <div
      className="relative flex size-[var(--logo-size)] justify-center"
      ref={ref}
    >
      <div className="absolute left-0 top-0 size-full border-l-[calc(var(--logo-size)/4)] border-t-[calc(var(--logo-size)/4)] border-[#31b4f1]" />
      <div className="absolute bottom-0 right-0 size-[calc(var(--logo-size)/2+4px)] border-b-[calc(var(--logo-size)/4)] border-r-[calc(var(--logo-size)/4)] border-[#31b4f1]" />
      <div className="absolute left-1/2 top-1/2 size-1/4 -translate-x-1/2 -translate-y-1/2 bg-[#31b4f1]" />
    </div>
  );
};

export default Logo;
