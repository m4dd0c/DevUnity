import { LabelInputContainer } from "../../components/ui/misc";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { Spotlight } from "../../components/ui/Spotlight";
import { z } from "zod";
import { ResetPasswordSchema } from "../../lib/schemas/user.schema";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordAction } from "../../lib/actions/userAction";
import AceButton from "../../components/ui/AceButton";
import { showToast } from "../../lib/utils";
import SEO from "../../components/layout/SEO";

function ResetPassword() {
  const nav = useNavigate();
  const { token } = useParams();

  const onSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
    if (!token) return;
    if (data.confirmPassword !== data.newPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Both new password and confirm password must match.",
      });
      return;
    }
    mutate({ token, newPassword: data.newPassword });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordAction,
    onSuccess: (res) => {
      if (res) {
        showToast({ message: res.message });
        nav("/auth/signin");
      }
    },
  });

  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="bg-grid-white/[0.02] relative flex h-screen w-full overflow-hidden bg-black/[0.96] antialiased md:items-center md:justify-center">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Reset password | DevUnity"
        description="Create a new password for your DevUnity account."
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
          Reset Password.
        </h1>
        <form
          className="mx-auto my-8 max-w-md text-white "
          onSubmit={handleSubmit(onSubmit)}
        >
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
          <LabelInputContainer className="mb-4">
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
          <AceButton type="submit" isLoading={isPending}>
            Reset
          </AceButton>
          <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </form>
      </div>
    </div>
  );
}
export default ResetPassword;
