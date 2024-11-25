import * as React from "react";
import { cn } from "../../utils/cn";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  useSlate?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, useSlate = false, rows = 5, ...props }, ref) => {
    const radius = 200; // change this to increase the radius of the hover effect
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
              var(--blue-500),
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-lg p-[2px] transition duration-300"
      >
        <textarea
          rows={rows}
          className={cn(
            `flex w-full border-none bg-gray-50 ${useSlate ? "dark:bg-slate-800" : "dark:bg-zinc-800"} text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm resize-none file:bg-transparent file:text-sm file:font-medium 
            placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
            focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
            disabled:cursor-not-allowed disabled:opacity-50
            dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
            group-hover/input:shadow-none transition duration-400
           `,
            className,
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
