import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { LabelInputContainer } from "../ui/misc";
import { Link, useNavigate } from "react-router-dom";
import { IconLogin2 } from "@tabler/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupSchema } from "../../lib/schemas/user.schema";
import { z } from "zod";
import { isValidUsername, showToast } from "../../lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  checkAvailabilityAction,
  signupAction,
} from "../../lib/actions/userAction";
import AceButton from "../ui/AceButton";

function SignupForm({
  setAuth,
}: {
  setAuth: Dispatch<SetStateAction<boolean>>;
}) {
  // navigation
  const nav = useNavigate();
  // inputs
  const [input, setInput] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
  });
  // handling inputs
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // zod_react-hook-form_hook/resolver
  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // submit function
  const onSubmit = (data: z.infer<typeof SignupSchema>) => {
    if (errors.username) {
      // check again for verification
      const error = isValidUsername(input.username);
      if (error) setError("username", { type: "manual", message: error });
      else clearErrors("username");
      usernameMutate({ username: data.username });
      if (errors.username) return;
    }
    // sending submit request
    mutate(data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: signupAction,
    onSuccess: (res) => {
      if (res) {
        showToast({ message: res.message });
        setAuth(true);
        nav(`/user/${res.data}`);
      }
    },
  });

  const { mutate: usernameMutate } = useMutation({
    mutationFn: checkAvailabilityAction,
    onSuccess: (res) => {
      if (res) {
        if (!res.data)
          setError("username", {
            type: "manual",
            message: "Username already taken by someone else.",
          });
        if (res.data) clearErrors("username");
      }
    },
  });

  // debounce for username validition
  useEffect(() => {
    // check format validity
    const delay = 1000;
    const debounce = setTimeout(() => {
      if (input.username.length > 0) {
        const error = isValidUsername(input.username);
        if (error) setError("username", { type: "manual", message: error });
        else {
          clearErrors("username"); // Clear previous errors if validation passes
          // checking username availability
          usernameMutate({ username: input.username });
        }
      }
    }, delay);
    return () => {
      clearTimeout(debounce);
    };
  }, [input.username, clearErrors, setError, usernameMutate]);

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-transparent">
      <h2 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200">
        Welcome to DevUnity<span className="text-cyan-500">.</span>
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        We together Create, Build, and Collaborate.
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            {...register("name")}
            id="fullName"
            useCyan={true}
            placeholder="Manish Suthar"
            type="text"
            className="bg-slate-900"
            name="name"
            onChange={handleInput}
            value={input.name}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            {...register("username")}
            id="username"
            useCyan={true}
            placeholder="m4dd0c"
            type="text"
            className="bg-slate-950"
            name="username"
            onChange={handleInput}
            value={input.username}
          />
          {
            <div className="text-red-500 text-sm min-h-5">
              {errors.username && errors.username.message}
            </div>
          }
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            {...register("email")}
            id="email"
            useCyan={true}
            placeholder="projectmayhem@fc.com"
            type="email"
            className="bg-slate-950"
            name="email"
            onChange={handleInput}
            value={input.email}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-2">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            id="password"
            useCyan={true}
            placeholder="••••••••"
            type="password"
            className="bg-slate-950"
            name="password"
            onChange={handleInput}
            value={input.password}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </LabelInputContainer>
        <small className="text-white">
          Already have an account?{" "}
          <Link className="text-cyan-500" to={"/auth/signin"}>
            Sign in
          </Link>
        </small>
        <AceButton
          type="submit"
          icon={<IconLogin2 size={15} />}
          isLoading={isPending}
        >
          Sign up
        </AceButton>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}
export default SignupForm;
