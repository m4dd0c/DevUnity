import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

export default function DescribeForm() {
  const editorRef = useRef();
  return (
    <>
      <p className="text-sm font-normal">
        Describe your project to everyone in detail.
        <br />
        <strong>Note:</strong> Don't forget to save.
      </p>
      <div className="my-10">
        <Editor
          apiKey="gtxxne8xw29go89ovbcqf4bc9bvk032d2xmmf1lu5576wwjg"
          onInit={(_evt, editor) => {
            //@ts-expect-error ignore please
            editorRef.current = editor;
          }}
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
          initialValue={"Welcome to Collabrite!"}
        />
      </div>
      <div className="text-sm flex justify-end gap-3">
        <button className="px-2 py-1 bg-gray-200 text-black dark:bg-zinc-800 dark:text-white rounded-full text-sm w-28">
          Cancel
        </button>
        <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-full w-28">
          Save
        </button>
      </div>
    </>
  );
}
