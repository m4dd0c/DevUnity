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
import toast from "react-hot-toast";

function ForgetPassword() {
  const onSubmit = (data: z.infer<typeof ForgetPasswordSchema>) => {
    mutate(data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: forgetPasswordAction,
    onSuccess: (res) => {
      if (res) {
        toast.success(res.message);
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
    <div className="h-screen w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-32 md:pt-0">
        <h1 className="text-xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Forget Password.
        </h1>
        <form
          className="my-8 max-w-md mx-auto text-white "
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
              <span className="text-red-500 text-sm">
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
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </div>
  );
}
export default ForgetPassword;
