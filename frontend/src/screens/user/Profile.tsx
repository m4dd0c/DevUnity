import { useEffect, useState } from "react";
import fallback_pp from "/assets/fallback_pp.jpg";
import { IconCalendarMonth, IconLink, IconMapPin } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { BottomGradient } from "../../components/ui/misc";
import { getUserAction } from "../../lib/actions/userAction";
import { formatDate, KEYS } from "../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import ProfileProjects from "../../components/user/ProfileProjects";
import ProfileSkeleton from "../../components/layout/Loadings/ProfileSkeleton";
import SEO from "../../components/layout/SEO";

const Profile = ({ user_id }: { user_id?: string }) => {
  // state and vars
  const nav = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [self, setSelf] = useState(false);

  // requesting
  const { isLoading, refetch, data, isError, isSuccess } = useQuery({
    queryFn: async () => await getUserAction(userId || ""),
    queryKey: [KEYS.GET_USER, user_id],
  });

  // response processing
  useEffect(() => {
    if (isSuccess && data) setUser(data.data);
  }, [isSuccess, isError, data]);

  // refetching when userId is available
  useEffect(() => {
    if (userId) refetch();
  }, [userId, refetch]);

  // checking if visiter is visting own profile
  useEffect(() => {
    if (user_id) {
      if (userId) {
        if (userId === user_id) setSelf(true);
      }
    } else {
      setSelf(false);
    }
  }, [setSelf, userId, user_id]);

  return isLoading ? (
    <ProfileSkeleton />
  ) : (
    <div className="flex h-screen w-full overflow-hidden bg-black text-white max-lg:h-full">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title={`${user ? user.username : "Profile"} | DevUnity`}
        description="View and explore this developer's profile on DevUnity."
        name="DevUnity"
        ogType="profile"
        twitterCard="summary"
      />

      <div className="mx-auto mt-20 flex w-full max-w-6xl max-lg:flex-col">
        {!user?.verification.verified && self && (
          <div className="mt-2 bg-red-500 text-center dark:text-white lg:hidden">
            <h1>
              Please verify your account within 3 days. <br /> Check
              verification mail to associated email address, also checkout spam
              section.
            </h1>
          </div>
        )}
        <div className="h-screen border-r-2 border-r-gray-800 p-8 max-lg:h-full">
          <div className="min-h-60 min-w-60">
            <img
              src={
                user && user?.avatar?.secure_url
                  ? user.avatar.secure_url
                  : fallback_pp
              }
              alt="user"
              className="size-56 rounded-full object-cover"
            />
          </div>
          <div className="w-full">
            <div>
              <h1 className="text-3xl font-bold">{user && user?.name}</h1>
              <h1 className="text-gray-500">@{user && user.username}</h1>
            </div>
            {self ? (
              <>
                <button
                  className="group/btn relative mb-5 mt-4 block h-10 w-full rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-purple-800 dark:from-indigo-700 dark:to-purple-700 dark:shadow-[0px_1px_0px_0px_var(--purple-800)_inset,0px_-1px_0px_0px_var(--purple-800)_inset]"
                  onClick={() => nav("edit")}
                >
                  Edit Profile
                  <BottomGradient />
                </button>
              </>
            ) : (
              <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
            )}
            <p className="line-clamp-4">{user && user?.bio}</p>
            <div className="mt-3 flex flex-col items-start justify-start gap-1 max-lg:gap-5">
              <div className="flex items-center gap-2">
                <IconCalendarMonth size={18} />{" "}
                <h1>Joined {user && formatDate(user.createdAt)}</h1>
              </div>
              {user && user.location && (
                <div className="flex items-center gap-2">
                  <IconMapPin size={18} />{" "}
                  <h1 className="line-clamp-1">{user.location}</h1>
                </div>
              )}
              {user && user.portfolio && (
                <div className="flex items-center gap-2">
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
        <ProfileProjects user={user} />
      </div>
    </div>
  );
};

export default Profile;
