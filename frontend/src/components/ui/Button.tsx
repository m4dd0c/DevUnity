import React from "react";
interface IBtn extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  classes?: string;
  spanClasses?: string;
}
const Button: React.FC<IBtn> = ({
  children,
  variant = "primary",
  classes,
  spanClasses,
  ...props
}) => {
  return variant === "primary" ? (
    <button
      {...props}
      type="button"
      className={`text-white transition bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${classes}`}
    >
      {children}
    </button>
  ) : (
    <button
      {...props}
      className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ${classes}`}
    >
      <span
        className={`relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 ${spanClasses}`}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
