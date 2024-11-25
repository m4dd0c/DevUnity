import { IconLoader } from "@tabler/icons-react";
import React from "react";
import { BottomGradient } from "./misc";

interface IAceButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  isPurple?: boolean;
  disabled?: boolean;
}
const AceButton: React.FC<IAceButton> = ({
  icon,
  isLoading,
  children, // expected text only,
  className,
  disabled,
  isPurple = false,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${
        isPurple
          ? "bg-gradient-to-br from-indigo-500 to-purple-500 dark:bg-purple-800 dark:from-indigo-700 dark:to-purple-700"
          : "my-2 bg-gradient-to-br from-black to-neutral-600 dark:bg-neutral-800 dark:from-neutral-900 dark:to-neutral-900"
      } group/btn relative mb-5 mt-4 flex h-10 w-full items-center justify-center rounded-md font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--neutral-800)_inset,0px_-1px_0px_0px_var(--neutral-800)_inset] ${className}`}
      disabled={disabled || isLoading}
    >
      <h1>{children}&nbsp;</h1>
      {isLoading ? (
        <IconLoader size={15} className="animate-spin" />
      ) : icon ? (
        icon
      ) : (
        ""
      )}
      <BottomGradient />
    </button>
  );
};

export default AceButton;
