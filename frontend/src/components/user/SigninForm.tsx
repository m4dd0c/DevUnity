import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { BottomGradient, LabelInputContainer } from "../ui/misc";
import { IconLogin2 } from "@tabler/icons-react";
import { Link } from "react-router-dom";

function SigninForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-2xl p-4 md:p-8 bg-white dark:bg-transparent">
      <h2 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200">
        Welcome back<span className="text-cyan-500">.</span>
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="input">Email/Username</Label>
          <Input
            id="email"
            useCyan={true}
            autoComplete="off"
            placeholder="projectmayhem@fc.com or m4dd0c"
            type="input"
            className="bg-slate-900"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            useCyan={true}
            placeholder="••••••••"
            type="password"
            className="bg-slate-950"
          />
        </LabelInputContainer>
        <small className="text-white">
          <Link className="text-cyan-500" to="/password/forget">
            Forget Password?{" "}
          </Link>
        </small>
        <button
          className="flex justify-center items-center bg-gradient-to-br relative group/btn from-black dark:from-neutral-900 dark:to-neutral-900 to-neutral-600 dark:bg-neutral-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--neutral-800)_inset,0px_-1px_0px_0px_var(--neutral-800)_inset] my-2"
          type="submit"
        >
          <h1>Sign in&nbsp;</h1>
          <IconLogin2 size={15} />
          <BottomGradient />
        </button>
        <small className="text-white">
          Don't have an account yet?{" "}
          <Link className="text-cyan-500" to="/auth/signup">
            Sign up
          </Link>
        </small>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}
export default SigninForm;
