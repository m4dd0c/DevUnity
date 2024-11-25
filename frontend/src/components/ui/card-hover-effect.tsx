import { IconPointFilled, IconRotateClockwise2 } from "@tabler/icons-react";
import { cn } from "../../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getLangColor, getLangLabel, timeAgo } from "../../lib/utils";

export const HoverEffect = ({
  items,
  className,
}: {
  items: IPopulatedRoom[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          to={`/room/${item.roomId}/about`}
          key={idx}
          className="group relative  block size-full p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block size-full rounded-3xl bg-neutral-200 dark:bg-slate-800/[0.8]"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle className="text-lg text-indigo-500">
              {item.project.title}
            </CardTitle>
            <div className="my-2 flex gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-1" title="language">
                <IconPointFilled
                  size={25}
                  color={getLangColor(item.project.lang)}
                />
                <h1>{getLangLabel(item.project.lang)}</h1>
              </div>
              <div
                className="flex items-center gap-1"
                title={`updated ${timeAgo(item.updatedAt)}`}
              >
                <IconRotateClockwise2 size={18} color="#6366f1" />
                <h1 className="line-clamp-1">{timeAgo(item.updatedAt)}</h1>
              </div>
            </div>
            <CardDescription className="line-clamp-6">
              {item.project.explanation}
            </CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-2", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className,
      )}
    >
      {children}
    </p>
  );
};
