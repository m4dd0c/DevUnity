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
    <div className="h-screen max-lg:h-full w-full bg-black text-white flex overflow-hidden">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title={`${user ? user.username : "Profile"} | DevUnity`}
        description="View and explore this developer's profile on DevUnity."
        name="DevUnity"
        ogType="profile"
        twitterCard="summery"
      />

      <div className="max-w-6xl w-full mx-auto flex max-lg:flex-col mt-20">
        {!user?.verification.verified && self && (
          <div className="lg:hidden mt-2 text-center bg-red-500 dark:text-white">
            <h1>
              Please verify your account within 3 days. <br /> Check
              verification mail to associated email address, also checkout spam
              section.
            </h1>
          </div>
        )}
        <div className="h-screen max-lg:h-full p-8 border-r-2 border-r-gray-800">
          <div className="min-w-60 min-h-60">
            <img
              src={
                user && user?.avatar?.secure_url
                  ? user.avatar.secure_url
                  : fallback_pp
              }
              alt="user"
              className="object-cover rounded-full h-56 w-56"
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
                  className="block mt-4 mb-5 bg-gradient-to-br relative group/btn from-indigo-500 dark:from-indigo-700 dark:to-purple-700 to-purple-500 dark:bg-purple-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--purple-800)_inset,0px_-1px_0px_0px_var(--purple-800)_inset]"
                  onClick={() => nav("edit")}
                >
                  Edit Profile
                  <BottomGradient />
                </button>
              </>
            ) : (
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            )}
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
        <ProfileProjects user={user} />
      </div>
    </div>
  );
};

export default Profile;
