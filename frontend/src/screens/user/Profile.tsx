import { useEffect, useState } from "react";
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
import { getMeAction } from "../../lib/actions/userAction";
import { formatDate, KEYS } from "../../lib/utils";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const placeholders = [
    "Hunting for the next big project?",
    "Which project will ignite your passion?",
    "Type to unlock groundbreaking code...",
    "Find that project that changes everything",
    "Ready to discover your next obsession?",
  ];
  const [input, setInput] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted", input);
  };
  const { isPending, data, isError, isSuccess } = useQuery({
    queryFn: getMeAction,
    queryKey: [KEYS.GET_ME],
  });
  const [user, setUser] = useState<IUser | null>(null);
  console.log(user);
  useEffect(() => {
    if (isSuccess && data) setUser(data.data);
    if (isError) return console.log("error");
  }, [isSuccess, isError, data]);
  const nav = useNavigate();
  return isPending ? (
    <h1>loading...</h1>
  ) : (
    <div className="h-screen max-lg:h-full w-full bg-black text-white flex overflow-hidden">
      <div className="max-w-6xl w-full mx-auto flex max-lg:flex-col mt-20">
        <div className="h-screen max-lg:h-full p-8 border-r-2 border-r-gray-800">
          <div className="min-w-60 min-h-60">
            <img
              src={
                user && user?.avatar?.secure_url
                  ? user.avatar.secure_url
                  : "/assets/team/manish.jpg"
              }
              alt="user"
              className="object-cover rounded-full h-56 w-56 border-2 border-gray-800"
            />
          </div>
          <div className="w-full">
            <div>
              <h1 className="text-3xl font-bold">{user && user?.name}</h1>
              <h1 className="text-gray-500">@{user && user.username}</h1>
            </div>
            <button
              className="block my-2 bg-gradient-to-br relative group/btn from-indigo-500 dark:from-indigo-700 dark:to-purple-700 to-purple-500 dark:bg-purple-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--purple-800)_inset,0px_-1px_0px_0px_var(--purple-800)_inset]"
              onClick={() => nav("edit")}
            >
              Edit Profile
              <BottomGradient />
            </button>
            <p className="line-clamp-4">{user && user?.bio}</p>
            <div className="mt-3 flex flex-col justify-start items-start max-lg:gap-5 gap-1">
              <div className="flex gap-2 items-center">
                <IconCalendarMonth size={18} />{" "}
                <h1>Joined {user && formatDate(user.createdAt)}</h1>
              </div>
              {user && user.location && (
                <div className="flex gap-2 items-center">
                  <IconMapPin size={18} />{" "}
                  <h1 className="line-clamp-1">{user.location}</h1>
                </div>
              )}
              {user && user.portfolio && (
                <div className="flex gap-2 items-center">
                  <IconLink size={18} />{" "}
                  <a
                    href={user.portfolio}
                    target="_blank"
                    className="line-clamp-1 text-indigo-500"
                  >
                    {user.portfolio}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:overflow-y-scroll">
          <div className="flex justify-center items-center gap-2 mx-4 py-2 px-4 bg-gray-900 rounded-md">
            <IconNotebook size={20} />
            <h1>Projects</h1>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={(e) => setInput(e.target.value)}
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
