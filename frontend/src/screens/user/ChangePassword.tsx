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
import { showToast } from "../../lib/utils";
import SEO from "../../components/layout/SEO";

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
        showToast({ message: res.message });
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
    <div className="bg-grid-white/[0.02] relative flex h-screen w-full overflow-hidden bg-black/[0.96] antialiased md:items-center md:justify-center">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Change password | DevUnity"
        description="Change your DevUnity account password to keep your account secure."
        name="DevUnity"
        ogType="website"
        twitterCard="summary"
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-32 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-xl font-bold text-transparent md:text-4xl">
          Change Password.
        </h1>
        <form
          className="mx-auto my-8 max-w-md text-white "
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
              <span className="text-sm text-red-500">
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
              <span className="text-sm text-red-500">
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
              <span className="text-sm text-red-500">
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
          <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </form>
      </div>
    </div>
  );
}
export default ChangePassword;
