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
import toast from "react-hot-toast";

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
  // eslint-disable-next-line
  const onSubmit = (data: z.infer<typeof ContactMeSchema>) => {
    mutate(data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: contactMeAction,
    onSuccess: (res) => {
      if (res) {
        toast.success(res.message);
      } else toast.error("something went wrong!");
    },
  });

  return (
    <div className="max-w-md w-full mx-auto rounded-none border border-neutral-900 md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Contact Collabrite
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 flex items-center gap-2">
        <span>Get in touch</span> <span className="text-lg font-bold">•</span>{" "}
        <span>24/7 support</span>
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              {...register("f_name")}
              id="firstname"
              placeholder="Takuya"
              type="text"
            />
            {errors.f_name && (
              <span className="text-red-500 text-sm">
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
              <span className="text-red-500 text-sm">
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
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="message">Message/Feedback</Label>
          <Textarea
            {...register("message")}
            placeholder="eg: Collabrite is so awesome..."
            id="message"
          />
          {errors.message && (
            <span className="text-red-500 text-sm">
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
