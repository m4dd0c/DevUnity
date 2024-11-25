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
import { Dispatch, SetStateAction } from "react";
import { showToast } from "../../lib/utils";

function SigninForm({
  setAuth,
}: {
  setAuth: Dispatch<SetStateAction<boolean>>;
}) {
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
    onSuccess: (res) => {
      if (res) {
        showToast({ message: res.message });
        setAuth(true);
        nav(`/user/${res.data}`);
      }
    },
  });

  return (
    <div className="rounded-1xl mx-auto w-full max-w-md bg-white p-4 dark:bg-transparent md:p-8">
      <h3 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
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
            <span className="text-sm text-red-500">{errors.input.message}</span>
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
            <span className="text-sm text-red-500">
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
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      </form>
    </div>
  );
}
export default SigninForm;
