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
      className="relative flex justify-center size-[var(--logo-size)]"
      ref={ref}
    >
      <div className="border-t-[calc(var(--logo-size)/4)] border-l-[calc(var(--logo-size)/4)] border-[#31b4f1] size-full absolute top-0 left-0" />
      <div className="border-b-[calc(var(--logo-size)/4)] border-r-[calc(var(--logo-size)/4)] border-[#31b4f1] size-[calc(var(--logo-size)/2+4px)] absolute bottom-0 right-0" />
      <div className="size-1/4 bg-[#31b4f1] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

export default Logo;
