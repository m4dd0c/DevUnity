import * as React from "react";
import { cn } from "../../utils/cn";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { IconLoader } from "@tabler/icons-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  transparent?: boolean;
  useCyan?: boolean;
  isLoading?: boolean;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, useCyan = false, transparent, isLoading, ...props },
    ref,
  ) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(${useCyan ? "--cyan-500" : "--blue-500"}),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className={`group/input w-full rounded-lg p-[2px] transition duration-300 ${isLoading && "relative"}`}
      >
        <input
          type={type}
          className={cn(
            `flex h-10 w-full border-none bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400
           ${transparent ? "bg-[rgba(0,0,0,0.5)]" : "bg-zinc-800"}`,
            className,
          )}
          ref={ref}
          {...props}
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <IconLoader size={15} className="animate-spin" color="white" />
          </div>
        )}
      </motion.div>
    );
  },
);
Input.displayName = "Input";

export { Input };
