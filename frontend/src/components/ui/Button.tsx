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
      className={`mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 ${classes}`}
    >
      {children}
    </button>
  ) : (
    <button
      {...props}
      className={`group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800 ${classes}`}
    >
      <span
        className={`relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900 ${spanClasses}`}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
