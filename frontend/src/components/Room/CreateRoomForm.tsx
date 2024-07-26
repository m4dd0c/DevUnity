import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { BottomGradient, LabelInputContainer } from "../ui/misc";

function CreateRoomForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  const genRoomId = () => {
    console.log("generating roo id");
  };
  return (
    <div className="absolute top-1/2 -translate-y-1/4 inset-x-0 z-50 max-w-md w-full mx-auto rounded-xl border border-neutral-900 md:rounded-2xl p-4 md:p-8 bg-white dark:bg-[rgba(0,0,0,0.5)] shadow-input">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Create A Room
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 flex items-center gap-2">
        Start by putting your name in.
      </p>
      <form className="mt-8 mb-4" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              transparent={true}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              transparent={true}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="roomId">Room ID</Label>
          <Input
            id="roomId"
            placeholder="Custom room id"
            type="text"
            transparent={true}
          />
          <small className="text-white">
            Generate a RoomId,{" "}
            <button className="text-purple-400" onClick={genRoomId}>
              Click here
            </button>
          </small>
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] flex justify-center items-center"
          type="submit"
        >
          Create a Room
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

export default CreateRoomForm;
