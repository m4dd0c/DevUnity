import { Label } from "../ui/label";
import { LabelInputContainer } from "../ui/misc";
import { Input } from "../ui/input";
import AceButton from "../ui/AceButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePassAndLangSchema } from "../../lib/schemas/room.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { updatePasswordAndLangAction } from "../../lib/actions/roomAction";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { langs } from "../../constants";
import { KEYS, showToast } from "../../lib/utils";

const SettingsForm = ({
  isAdmin,
  room,
}: {
  isAdmin?: boolean;
  room: IRoom | undefined;
}) => {
  const { roomId } = useParams();

  const {
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    register,
  } = useForm({
    resolver: zodResolver(UpdatePassAndLangSchema),
    defaultValues: {
      password: "",
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updatePasswordAndLangAction,
    onSuccess: (res) => {
      if (res) {
        queryClient.invalidateQueries({ queryKey: [KEYS.GET_ROOM, roomId] });
        tabButtons?.descriptionBtn?.click();
      }
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const [language, setLanguage] = useState<TLang>(room?.project.lang || "js");

  const onSubmit = (data: z.infer<typeof UpdatePassAndLangSchema>) => {
    // Check if there's no language and no password
    if (!language && !data.password) return;
    // Prepare the form data object
    const formData = { password: data.password, lang: language };
    // Check if the roomId is present
    if (roomId) {
      // Validate the password length
      if (formData.password && formData.password.trim().length < 6) {
        setError("password", {
          type: "manual",
          message: "Password must contain at least 6 characters.",
        });
      } else {
        clearErrors("password");
        // Pass an object with formData and roomId to mutate
        mutate({ formData, roomId });
      }
    }
  };
  const [tabButtons, setTabButtons] = useState<ITabButtons>({
    describeBtn: null,
    descriptionBtn: null,
  });
  useEffect(() => {
    const descriptionBtn = document.querySelector(
      "#tab-button-0",
    ) as HTMLButtonElement;
    const describeBtn = document.querySelector(
      "#tab-button-1",
    ) as HTMLButtonElement;
    setTabButtons({ descriptionBtn, describeBtn });
  }, []);

  // if isNotAdmin then redirecting to playground
  useEffect(() => {
    if (!isAdmin) {
      showToast({ message: "It seems like you're not admin", type: "error" });
      tabButtons?.descriptionBtn?.click();
    }
  }, [isAdmin, roomId, tabButtons?.descriptionBtn]);

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
                    className="bg-slate-800 flex items-center w-full py-2 px-4 rounded-md"
                    key={lang.value}
                  >
                    <input
                      onChange={(e) => setLanguage(e.target.value as TLang)}
                      type="radio"
                      id={lang.value}
                      checked={language === lang.value}
                      value={lang.value}
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
              Keeping the password field empty won't affect the current room
              password.
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
