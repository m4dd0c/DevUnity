import { LabelInputContainer } from "../../components/ui/misc";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { Spotlight } from "../../components/ui/Spotlight";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AceButton from "../../components/ui/AceButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangePasswordSchema } from "../../lib/schemas/user.schema";
import { ChangePasswordAction } from "../../lib/actions/userAction";
import toast from "react-hot-toast";

function ChangePassword() {
  const onSubmit = (data: z.infer<typeof ChangePasswordSchema>) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "New password and confirm password must match.",
      });
      return;
    }
    mutate({
      newPassword: data.newPassword,
      currentPassword: data.currentPassword,
    });
  };
  const nav = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: ChangePasswordAction,
    onSuccess: (res) => {
      if (res) {
        toast.success(res.message);
        nav("/");
      }
    },
  });
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  return (
    <div className="h-screen w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-32 md:pt-0">
        <h1 className="text-xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Change Password.
        </h1>
        <form
          className="my-8 max-w-md mx-auto text-white "
          onSubmit={handleSubmit(onSubmit)}
        >
          <LabelInputContainer className="mb-4">
            <Label htmlFor="currPassword">Current Password</Label>
            <Input
              {...register("currentPassword")}
              id="currPassword"
              placeholder="••••••••"
              type="password"
            />
            {errors.currentPassword && (
              <span className="text-red-500 text-sm">
                {errors.currentPassword.message}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              {...register("newPassword")}
              id="newPassword"
              placeholder="••••••••"
              type="password"
            />
            {errors.newPassword && (
              <span className="text-red-500 text-sm">
                {errors.newPassword.message}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>

            <Input
              {...register("confirmPassword")}
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </LabelInputContainer>
          <small className="text-indigo-500">
            <Link to={"/password/forget"}>Forget password?</Link>
          </small>
          <AceButton isLoading={isPending} type="submit">
            Change Password
          </AceButton>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </div>
  );
}
export default ChangePassword;
