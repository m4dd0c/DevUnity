import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IconSend2 } from "@tabler/icons-react";
import { Textarea } from "../ui/textarea";
import { LabelInputContainer } from "../ui/misc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactMeSchema } from "../../lib/schemas/user.schema";
import { z } from "zod";
import { contactMeAction } from "../../lib/actions/userAction";
import { useMutation } from "@tanstack/react-query";
import AceButton from "../ui/AceButton";
import { showToast } from "../../lib/utils";

function ContactForm() {
  // zod_react-hook-form_hook/resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ContactMeSchema),
    defaultValues: {
      f_name: "",
      l_name: "",
      email: "",
      message: "",
    },
  });

  // submit function

  const onSubmit = (data: z.infer<typeof ContactMeSchema>) => {
    mutate(data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: contactMeAction,
    onSuccess: (res) => {
      if (res) showToast({ message: res.message });
    },
  });

  return (
    <div className="mx-auto w-full max-w-md rounded-none border border-neutral-900 bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Contact DevUnity
      </h2>
      <p className="mt-2 flex max-w-sm items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
        <span>Get in touch</span> <span className="text-lg font-bold">•</span>{" "}
        <span>24/7 support</span>
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              {...register("f_name")}
              id="firstname"
              placeholder="Takuya"
              type="text"
            />
            {errors.f_name && (
              <span className="text-sm text-red-500">
                {errors.f_name.message}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              {...register("l_name")}
              id="lastname"
              placeholder="Matsumaya"
              type="text"
            />
            {errors.l_name && (
              <span className="text-sm text-red-500">
                {errors.l_name.message}
              </span>
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            {...register("email")}
            id="email"
            placeholder="takuya@matsumaya.com"
            type="email"
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="message">Message/Feedback</Label>
          <Textarea
            {...register("message")}
            placeholder="eg: DevUnity is so awesome..."
            id="message"
          />
          {errors.message && (
            <span className="text-sm text-red-500">
              {errors.message.message}
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
      </form>
    </div>
  );
}

export default ContactForm;
