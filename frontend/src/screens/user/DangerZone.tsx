import { LabelInputContainer } from "../../components/ui/misc";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { Spotlight } from "../../components/ui/Spotlight";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { deleteAccountAction } from "../../lib/actions/userAction";
import { DeleteAccountSchema } from "../../lib/schemas/user.schema";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AceButton from "../../components/ui/AceButton";

function DangerZone({ username }: { username: string | null }) {
  const nav = useNavigate();

  const [inputs, setInputs] = useState({ verify: "", confirm: "" });
  const [disabled, setDisabled] = useState(true);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => {
      const newInputs = { ...prev, [e.target.name]: e.target.value };
      //TODO : make it dynamic later
      if (
        newInputs.verify.toLowerCase() === "yes" &&
        newInputs.confirm.toLowerCase() === `delete/@${username}`
      )
        setDisabled(false);
      else setDisabled(true);
      return newInputs;
    });
  };

  const onSubmit = (data: z.infer<typeof DeleteAccountSchema>) => {
    // TODO: make it dynamic later
    if (data.verify === "yes" && data.confirm === "delete/@m4dd0c") mutate();
    else return;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: deleteAccountAction,
    onSuccess: (res) => {
      if (res) {
        nav("/auth/signin");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(DeleteAccountSchema),
    defaultValues: {
      verify: "",
      confirm: "",
    },
  });

  if (!username) nav("/");

  return (
    <div className="h-screen w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-32 md:pt-0">
        <h1 className="text-xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Delete account.
        </h1>
        <form
          className="my-8 max-w-md mx-auto text-white "
          onSubmit={handleSubmit(onSubmit)}
        >
          <LabelInputContainer className="mb-4">
            <Label htmlFor="verify">Are you sure?</Label>
            <Input
              {...register("verify")}
              id="verify"
              value={inputs.verify}
              onChange={handleInput}
              name="verify"
              placeholder='Type "yes" to continue'
              type="text"
            />
            {errors.verify && (
              <span className="text-red-500 text-sm">
                {errors.verify.message}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="confirm">
              Enter "delete/@{username}" to continue
            </Label>
            <Input
              {...register("confirm")}
              id="confirm"
              value={inputs.confirm}
              onChange={handleInput}
              name="confirm"
              placeholder="eg: delete/@m4dd0c"
              type="text"
            />
            {errors.verify && (
              <span className="text-red-500 text-sm">
                {errors.verify.message}
              </span>
            )}
          </LabelInputContainer>
          <AceButton
            icon={
              <IconTrash
                color={disabled || isPending ? "gray" : "red"}
                size={15}
              />
            }
            isLoading={isPending}
            disabled={isPending || disabled}
          >
            <span
              className={
                disabled || isPending ? "text-gray-500" : "text-red-500"
              }
            >
              Delete
            </span>
          </AceButton>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </div>
  );
}
export default DangerZone;
