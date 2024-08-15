import { Label } from "@radix-ui/react-label";
import { LabelInputContainer } from "../ui/misc";
import { Input } from "../ui/input";
import AceButton from "../ui/AceButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePassAndLangSchema } from "../../lib/schemas/room.schema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { updatePasswordAndLangAction } from "../../lib/actions/roomAction";
import { useNavigate, useParams } from "react-router-dom";
import { langs } from "../../constants";
import { useEffect, useState } from "react";

const SettingsForm = ({ isAdmin }: { isAdmin?: boolean }) => {
  const nav = useNavigate();
  const { roomId } = useParams();

  // useform
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(UpdatePassAndLangSchema),
    defaultValues: {
      password: "",
      lang: "",
    },
  });

  // mutation
  const { mutate, isPending } = useMutation({
    mutationFn: updatePasswordAndLangAction,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  // submit handler
  const onSubmit = (data: z.infer<typeof UpdatePassAndLangSchema>) => {
    if (roomId)
      mutate({ formData: { password: data.password, lang: "js" }, roomId });
  };

  useEffect(() => {
    if (!isAdmin) {
      nav(`/room/${roomId}/about`);
    }
  }, [nav, isAdmin, roomId]);

  const [language, setLanguage] = useState("js");
  return (
    <>
      <p className="text-sm font-normal">
        Change your room password and language.
      </p>
      <form className="mt-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10 text-[1rem] font-normal ">
          {/* select language */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="lang">Select Language</Label>
            <div
              className="flex justify-center items-center w-full h-full"
              id="radio-select"
            >
              <div className="text-white w-full space-y-2">
                {langs.map((lang) => (
                  <div
                    key={lang.value}
                    className="bg-slate-800 flex items-center w-full py-2 px-4 rounded-md"
                  >
                    <input
                      type="radio"
                      onChange={(e) => setLanguage(e.target.value)}
                      value={language}
                      id={lang.value}
                      name="radio-select"
                    />
                    <label
                      htmlFor={lang.value}
                      className="px-4 inline-block w-full"
                    >
                      {lang.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </LabelInputContainer>

          {/* password  */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">New Password</Label>
            <Input
              {...register("password")}
              id="password"
              placeholder="••••••"
              type="password"
              className="bg-slate-800 font-normal"
            />
            <span className="text-sm opacity-50 font-normal">
              Keeping password field empty won't affect current room password.
            </span>
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </LabelInputContainer>
          <AceButton
            className="block bg-gradient-to-br relative group/btn dark:from-white from-gray-200 to-gray-300 dark:to-white bg-gray-400 w-full dark:text-gray-800 rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--gray-400)_inset,0px_-1px_0px_0px_var(--gray-400)_inset]"
            isLoading={isPending}
            type="submit"
          >
            Save
          </AceButton>
        </div>
      </form>
    </>
  );
};

export default SettingsForm;
