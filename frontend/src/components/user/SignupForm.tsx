import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { BottomGradient, LabelInputContainer } from "../ui/misc";
import { Link } from "react-router-dom";
import { IconLogin2 } from "@tabler/icons-react";

function SignupForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-transparent">
      <h2 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200">
        Welcome to Collabrite<span className="text-cyan-500">.</span>
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        We together Create, Build, and Collaborate.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            id="fullName"
            useCyan={true}
            placeholder="Manish Suthar"
            type="text"
            className="bg-slate-900"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            useCyan={true}
            placeholder="m4dd0c"
            type="text"
            className="bg-slate-950"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            useCyan={true}
            placeholder="projectmayhem@fc.com"
            type="email"
            className="bg-slate-950"
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
          Already have an account?{" "}
          <Link className="text-cyan-500" to={"/auth/signin"}>
            Sign in
          </Link>
        </small>
        <button
          className="flex justify-center items-center mt-2 bg-gradient-to-br relative group/btn from-black dark:from-neutral-900 dark:to-neutral-900 to-neutral-600 dark:bg-neutral-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--neutral-800)_inset,0px_-1px_0px_0px_var(--neutral-800)_inset]"
          type="submit"
        >
          <h1>Sign up&nbsp;</h1>
          <IconLogin2 size={15} />
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}
export default SignupForm;
