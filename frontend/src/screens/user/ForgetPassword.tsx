import { LabelInputContainer } from "../../components/ui/misc";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { IconSend2 } from "@tabler/icons-react";
import { Spotlight } from "../../components/ui/Spotlight";
import AceButton from "../../components/ui/AceButton";
import { z } from "zod";
import { ForgetPasswordSchema } from "../../lib/schemas/user.schema";
import { useMutation } from "@tanstack/react-query";
import { forgetPasswordAction } from "../../lib/actions/userAction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "../../lib/utils";
import SEO from "../../components/layout/SEO";

function ForgetPassword() {
  const onSubmit = (data: z.infer<typeof ForgetPasswordSchema>) => {
    mutate(data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: forgetPasswordAction,
    onSuccess: (res) => {
      if (res) {
        showToast({ message: res.message });
      }
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  return (
    <div className="bg-grid-white/[0.02] relative flex h-screen w-full overflow-hidden bg-black/[0.96] antialiased md:items-center md:justify-center">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Forget password | DevUnity"
        description="Reset your DevUnity password if you've forgotten it."
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
          Forget Password.
        </h1>
        <form
          className="mx-auto my-8 max-w-md text-white "
          onSubmit={handleSubmit(onSubmit)}
        >
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="projectmayhem@fc.com"
              type="text"
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </LabelInputContainer>
          <AceButton
            type="submit"
            icon={<IconSend2 size={15} />}
            isLoading={isPending}
          >
            Send
          </AceButton>
          <small>
            A password reset link will be sent to your email address.
            <br /> Use that to retrieve your account.
          </small>
          <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </form>
      </div>
    </div>
  );
}
export default ForgetPassword;
