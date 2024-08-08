import { IconArrowsExchange2 } from "@tabler/icons-react";
import { useState } from "react";
import { projects, users } from "../constants";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import UserCard from "../components/Cards/UserCard";
import ProjectCard from "../components/Cards/ProjectCard";
import NoResult from "../components/layout/NoResult";

const Search = () => {
  const placeholders = [
    "Who's the next coding rockstar?",
    "Find that hidden gem of a project",
    "Looking for a mastermind? Start typing...",
    "Uncover the next big thing in code",
    "Type to reveal the future of development",
  ];
  const [type, setType] = useState<"Users" | "Projects">("Projects");
  const [result, setResult] = useState<any[] | null>(projects);
  const handleType = () => {
    setType((prev) => {
      const newType = prev === "Users" ? "Projects" : "Users";
      setResult(() => (newType === "Users" ? users : projects));
      return newType;
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  const [active, setActive] = useState(false);
  return (
    <div className="min-h-screen bg-black">
      <div className="w-full mx-auto pt-20 max-w-3xl dark:text-white">
        <div className="flex justify-center items-center gap-2 mx-4 py-2 px-4 bg-gray-900 rounded-md">
          <button
            className={`flex justify-between items-center w-[6.4rem] bg-slate-800 rounded-full px-3 py-1 ${active && "max-md:hidden"}`}
            onClick={handleType}
          >
            <h1>{type}</h1>
            <IconArrowsExchange2 size={20} />
          </button>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            onSubmit={onSubmit}
          />
        </div>
        <h1 className="max-md:mx-2 mx-10 my-4">Results</h1>
        <div className="mx-auto space-y-2">
          {result ? (
            result.map((res: any) => {
              return type === "Users" ? (
                <UserCard user={res} key={res.username} />
              ) : (
                <ProjectCard project={res} key={res.name} />
              );
            })
          ) : (
            <NoResult
              text={
                type === "Users"
                  ? "No user found! Check the input again."
                  : "No Project found! Check the input again."
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
