import {
  IconCalendarMonth,
  IconLink,
  IconMapPin,
  IconNotebook,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { HoverEffect } from "../../components/ui/card-hover-effect";
import { projects } from "../../constants";
import { PlaceholdersAndVanishInput } from "../../components/ui/placeholders-and-vanish-input";
import { BottomGradient } from "../../components/ui/misc";
import NoResult from "../../components/layout/NoResult";

const Profile = () => {
  const placeholders = [
    "Hunting for the next big project?",
    "Which project will ignite your passion?",
    "Type to unlock groundbreaking code...",
    "Find that project that changes everything",
    "Ready to discover your next obsession?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  const user = {
    name: "Manish Suthar",
    username: "m4dd0c",
    bio: "You see I've been leveling up this whole time.",
    location: "Osaka, Japan.",
    portfolio: "https://m4dd0c.netlify.app",
    createdAt: "June, 13",
    avatar: "/assets/team/manish.jpg",
  };
  const nav = useNavigate();
  return (
    <div className="h-screen max-lg:h-full w-full bg-black text-white flex overflow-hidden ">
      <div className="max-w-6xl w-full mx-auto flex max-lg:flex-col mt-20">
        <div className="h-screen p-8 border-r-2 border-r-gray-800">
          <div className="min-w-60 min-h-60">
            <img
              src={user.avatar}
              alt="user"
              className="object-cover rounded-full h-56 w-56 border-2 border-gray-800"
            />
          </div>
          <div className="w-full">
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <h1 className="text-gray-500">@{user.username}</h1>
            </div>
            <button
              className="block my-2 bg-gradient-to-br relative group/btn from-indigo-500 dark:from-indigo-700 dark:to-purple-700 to-purple-500 dark:bg-purple-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--purple-800)_inset,0px_-1px_0px_0px_var(--purple-800)_inset]"
              onClick={() => nav("edit")}
            >
              Edit Profile
              <BottomGradient />
            </button>
            <p className="line-clamp-4">{user.bio}</p>
            <div className="mt-3 flex flex-col justify-start items-start max-lg:gap-5 gap-1">
              <div className="flex gap-2 items-center">
                <IconCalendarMonth size={18} /> <h1>{user.createdAt}</h1>
              </div>
              <div className="flex gap-2 items-center">
                <IconMapPin size={18} />{" "}
                <h1 className="line-clamp-1">{user.location}</h1>
              </div>
              <div className="flex gap-2 items-center">
                <IconLink size={18} />{" "}
                <h1 className="line-clamp-1">{user.portfolio}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:overflow-y-scroll">
          <div className="flex justify-center items-center gap-2 mx-4 py-2 px-4 bg-gray-900 rounded-md">
            <IconNotebook size={20} />
            <h1>Projects</h1>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div>
          <div className="m-2">
            {projects ? (
              <HoverEffect items={projects} />
            ) : (
              <NoResult text="No project found! Check the input again." />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
