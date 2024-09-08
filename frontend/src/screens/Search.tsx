import { IconArrowsExchange2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import UserCard from "../components/Cards/UserCard";
import ProjectCard from "../components/Cards/ProjectCard";
import NoResult from "../components/layout/NoResult";
import { useQuery } from "@tanstack/react-query";
import { KEYS } from "../lib/utils";
import { searchUsersAction } from "../lib/actions/userAction";
import { searchRoomsAction } from "../lib/actions/roomAction";
import SearchLoading from "../components/layout/Loadings/SearchLoading";
import Pagination from "../components/layout/Pagination";
import SEO from "../components/layout/SEO";

const Search = () => {
  const placeholders = [
    "Who's the next coding rockstar?",
    "Find that hidden gem of a project",
    "Looking for a mastermind? Start typing...",
    "Uncover the next big thing in code",
    "Type to reveal the future of development",
    "Search project by language",
  ];

  const [type, setType] = useState<"Users" | "Projects">("Users");

  // switch b/w projects and users data
  const handleType = () => {
    setType((prev) => (prev === "Users" ? "Projects" : "Users"));
    setPaginationState({ size: 10, page: 1 });
  };

  // eslint-disable-next-line
  const onSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!query.trim()) return;
    if (type === "Users") fetchUsers();
    if (type === "Projects") fetchProjects();
  };

  // query
  const [query, setQuery] = useState("");
  const [paginationState, setPaginationState] = useState({ page: 1, size: 10 });

  // fetching users
  const {
    refetch: fetchUsers,
    isLoading: isLoadingUsers,
    data: users,
  } = useQuery({
    queryFn: async () =>
      await searchUsersAction({
        query,
        page: paginationState.page,
        size: paginationState.size,
      }),
    queryKey: [KEYS.SEARCH_USERS],
    enabled: false,
  });

  // fetching projects
  const {
    refetch: fetchProjects,
    isLoading: isLoadingProjects,
    data: projects,
  } = useQuery({
    queryFn: async () =>
      await searchRoomsAction({
        query,
        page: paginationState.page,
        size: paginationState.size,
      }),
    queryKey: [KEYS.SEARCH_PROJECTS],
    enabled: false,
  });
  const [active, setActive] = useState(false);

  // Refetching data whenever paginationState changes
  useEffect(() => {
    onSubmit();
  }, [paginationState]);

  const isLoading = isLoadingUsers || isLoadingProjects;
  return (
    <div className="min-h-screen bg-black">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Search | DevUnity"
        description="Search for developers & rooms on DevUnity."
        name="DevUnity"
        ogType="website"
        twitterCard="summary"
      />

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
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            onSubmit={onSubmit}
          />
        </div>
        <h1 className="max-md:mx-2 mx-10 my-4">Results</h1>
        <div className="mx-auto space-y-2">
          {/* little messed up here focus little to understand */}
          {/* isLoading than show loader else not */}
          {isLoading ? (
            <SearchLoading />
          ) : /* if type is User than check if result available or not, if result available than show result else noResult page */
          type === "Users" ? (
            users && users.data && users.data.users.length > 0 ? (
              <>
                {users.data.users.map((user) => (
                  <UserCard user={user} key={user._id} />
                ))}
                <Pagination
                  query={query}
                  isNext={users.data.isNext}
                  setPaginationState={setPaginationState}
                  paginationState={paginationState}
                />
              </>
            ) : (
              <NoResult text="No user found! Check the input again." />
            )
          ) : projects && projects.data && projects.data.rooms.length > 0 ? (
            /* if type is other than User (means Projects) than check if result available or not, if result available than show result else noResult page */
            <>
              {projects.data.rooms.map((room) => (
                <ProjectCard room={room} key={room._id} />
              ))}
              <Pagination
                query={query}
                isNext={projects.data.isNext}
                paginationState={paginationState}
                setPaginationState={setPaginationState}
              />
            </>
          ) : (
            <NoResult text="No Project found! Check the input again." />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
