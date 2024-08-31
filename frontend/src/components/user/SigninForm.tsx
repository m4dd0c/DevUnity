import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { LabelInputContainer } from "../ui/misc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninSchema } from "../../lib/schemas/user.schema";
import AceButton from "../ui/AceButton";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { signinAction } from "../../lib/actions/userAction";
import { IconLogin2 } from "@tabler/icons-react";

function SigninForm() {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      input: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof SigninSchema>) => {
    mutate(data);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: signinAction,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (res) => {
      if (res) {
        nav(`/user/${res.data}`);
      } else console.log("Something went wrong.");
    },
  });

  return (
    <div className="max-w-md w-full mx-auto rounded-1xl p-4 md:p-8 bg-white dark:bg-transparent">
      <h3 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200">
        Welcome back<span className="text-cyan-500">.</span>
      </h3>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-3">
          <Label htmlFor="email">Email/Username</Label>
          <Input
            {...register("input")}
            id="email"
            useCyan={true}
            autoComplete="off"
            placeholder="projectmayhem@fc.com or m4dd0c"
            type="text"
            className="bg-slate-900"
          />
          {errors.input && (
            <span className="text-red-500 text-sm">{errors.input.message}</span>
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
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </LabelInputContainer>
        <small className="text-white">
          <Link className="text-cyan-500" to="/password/forget">
            Forget Password?{" "}
          </Link>
        </small>
        <AceButton
          icon={<IconLogin2 size={15} />}
          isLoading={isPending}
          type="submit"
        >
          Sign in
        </AceButton>
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
