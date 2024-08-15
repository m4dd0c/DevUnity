import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { LabelInputContainer } from "../ui/misc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateRoomSchema } from "../../lib/schemas/room.schema";
import { Label } from "../ui/label";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoomAction } from "../../lib/actions/roomAction";
import { KEYS } from "../../lib/utils";
import { Textarea } from "../ui/textarea";
import AceButton from "../ui/AceButton";

export default function DescribeForm({
  room,
  isAdmin,
}: {
  room: IRoom | undefined;
  isAdmin: boolean;
}) {
  const { roomId } = useParams();
  const editorRef = useRef();

  const nav = useNavigate();
  const queryClient = useQueryClient();

  // update room useForm
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateRoomSchema),
    defaultValues: {
      title: room?.project?.title || "",
      explanation: room?.project?.explanation || "",
      description: room?.project?.description || "",
    },
  });

  // submit function
  const onSubmit = (data: z.infer<typeof UpdateRoomSchema>) => {
    console.log("submitting");
    if (roomId) {
      mutate({ formData: data, roomId });
    }
  };

  // mutation
  const { mutate, isPending } = useMutation({
    mutationFn: updateRoomAction,
    onSuccess: (res) => {
      if (res) {
        queryClient.invalidateQueries({ queryKey: [KEYS.GET_ROOM] });
        tabButtons?.descriptionBtn?.click();
      }
    },
  });

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
    if (!isAdmin) return nav(`/room/${roomId}`);
  }, [isAdmin, nav, roomId]);

  return (
    <>
      <p className="text-sm font-normal">
        Describe your project to everyone in detail.
        <br />
        <strong>Note:</strong> Don't forget to save.
      </p>
      <form className="mt-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="title">Title</Label>
            <Input
              {...register("title")}
              id="title"
              placeholder="Collabrite"
              type="text"
              className="bg-slate-800 font-normal"
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="explanation">Brief Explanation</Label>
            <Textarea
              {...register("explanation")}
              useSlate={true}
              id="explanation"
              placeholder="brief explanation about your project. max 150 letters"
              className="font-normal p-4"
            />
            {errors.explanation && (
              <span className="text-sm text-red-500">
                {errors.explanation.message}
              </span>
            )}
          </LabelInputContainer>
          <Editor
            {...register("description")}
            apiKey={import.meta.env.VITE_TINYMCE_API_SECRET}
            onInit={(_evt, editor) => {
              //@ts-expect-error ignore please
              editorRef.current = editor;
            }}
            onEditorChange={(content) =>
              setValue("description", content, { shouldValidate: true })
            }
            init={{
              menubar: false,
              height: 500,
              plugins: [
                "codesample",
                "preview",
                "anchor",
                "autolink",
                "image",
                "link",
                "searchreplace",
                "table",
                "visualblocks",
                "fullscreen",
                "insertdatetime",
              ],
              toolbar:
                "undo redo | codesample preview | bold italic underline forecolor | link image table | numlist bullist ",
              skin: "oxide-dark",
              content_css: "dark",
            }}
            initialValue={room?.project?.description}
          />
          {errors.description && (
            <span className="text-red-500 font-normal text-[1rem]">
              {errors.description.message}
            </span>
          )}
        </div>
        <div className="text-sm flex justify-end gap-3">
          <AceButton
            className="block bg-gradient-to-br relative group/btn dark:from-white from-gray-200 to-gray-300 dark:to-white bg-gray-400 w-full dark:text-gray-800 rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--gray-400)_inset,0px_-1px_0px_0px_var(--gray-400)_inset]"
            isLoading={isPending}
            type="submit"
          >
            Save
          </AceButton>
          <AceButton onClick={() => nav(-1)} disabled={isPending}>
            Cancel
          </AceButton>
        </div>
      </form>
    </>
  );
}
