import { BottomGradient, LabelInputContainer } from "../../components/ui/misc";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../../components/ui/textarea";

export function EditProfile() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted");
  };
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-black grid place-items-center pt-20">
      <form className="max-w-2xl w-full h-full" onSubmit={handleSubmit}>
        <div className="min-w-60 min-h-60 my-5">
          <img
            src={`/assets/team/manish.jpg`}
            alt="user"
            className="object-cover rounded-full h-52 w-52 shadow-input shadow-slate-800 max-md:mx-auto"
          />
          <label className="text-indigo-500 cursor-pointer block my-2 ml-12 max-md:ml-0 max-md:text-center">
            <input className="hidden" type="file" accept="image/*" />
            Change Avatar
          </label>
        </div>
        <div className="w-full max-md:w-11/12 gap-2 flex items-center justify-between mb-4 mx-auto">
          <button
            className="block bg-gradient-to-br relative group/btn from-indigo-500 dark:from-indigo-700 dark:to-purple-700 to-purple-500 dark:bg-purple-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--purple-800)_inset,0px_-1px_0px_0px_var(--purple-800)_inset]"
            type="submit"
          >
            Save
            <BottomGradient />
          </button>
          <button
            className="block bg-gradient-to-br relative group/btn from-black dark:from-neutral-900 dark:to-neutral-800 to-neutral-600 dark:bg-neutral-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--neutral-800)_inset,0px_-1px_0px_0px_var(--neutral-800)_inset]"
            type="submit"
            onClick={() => nav(-1)}
          >
            Cancel
            <BottomGradient />
          </button>
        </div>
        <div className="max-md:w-11/12 w-full mx-auto">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="fullname">Full Name</Label>
            <Input id="fullName" placeholder="Manish Suthar" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="m4dd0c" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Osaka, Japan" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="portfolio">Portfolio</Label>
            <Input
              id="portfolio"
              placeholder="https://m4dd0c.netlify.app"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="About you..." />
          </LabelInputContainer>
        </div>
      </form>
    </div>
  );
}
export default EditProfile;
