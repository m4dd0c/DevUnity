import { BottomGradient, LabelInputContainer } from "../../components/ui/misc";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { Spotlight } from "../../components/ui/Spotlight";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";

function DangerZone() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  const [inputs, setInputs] = useState({ verify: "", confirm: "" });
  const [disabled, setDisabled] = useState(true);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => {
      const newInputs = { ...prev, [e.target.name]: e.target.value };
      //TODO : make it dynamic later
      if (
        newInputs.verify.toLowerCase() === "yes" &&
        newInputs.confirm.toLowerCase() === "delete/@m4dd0c"
      )
        setDisabled(false);
      else setDisabled(true);
      return newInputs;
    });
  };
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
          onSubmit={handleSubmit}
        >
          <LabelInputContainer className="mb-4">
            <Label htmlFor="verify">Are you sure?</Label>
            <Input
              id="verify"
              name="verify"
              onChange={handleInput}
              value={inputs.verify}
              placeholder='Type "yes" to continue'
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="confirm">Enter "delete/@m4dd0c" to continue</Label>
            <Input
              id="confirm"
              onChange={handleInput}
              name="confirm"
              value={inputs.confirm}
              placeholder="eg: delete/@m4dd0c"
              type="text"
            />
          </LabelInputContainer>
          <button
            className="flex justify-center items-center bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 dark:bg-zinc-800 w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] my-2 disabled:text-gray-500 text-red-500"
            type="submit"
            disabled={disabled}
          >
            <h1>Delete Account&nbsp;</h1>
            <IconTrash color={disabled ? "gray" : "red"} size={15} />
            <BottomGradient />
          </button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </div>
  );
}
export default DangerZone;
