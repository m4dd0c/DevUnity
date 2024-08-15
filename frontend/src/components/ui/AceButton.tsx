import { IconLoader } from "@tabler/icons-react";
import React from "react";
import { BottomGradient } from "./misc";

interface IAceButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
const AceButton: React.FC<IAceButton> = ({
  icon,
  isLoading,
  children, // expected text only,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${className} flex justify-center items-center bg-gradient-to-br relative group/btn from-black dark:from-neutral-900 dark:to-neutral-900 to-neutral-600 dark:bg-neutral-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--neutral-800)_inset,0px_-1px_0px_0px_var(--neutral-800)_inset] my-2`}
      type="submit"
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
