import { LabelInputContainer } from "../../components/ui/misc";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../../components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fallback_pp from "/assets/fallback_pp.jpg";
import {
  checkAvailabilityAction,
  editAccountAction,
} from "../../lib/actions/userAction";
import { useEffect, useState } from "react";
import { isValidUsername, KEYS, showToast } from "../../lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditAccountSchema } from "../../lib/schemas/user.schema";
import AceButton from "../../components/ui/AceButton";
import { z } from "zod";
import SEO from "../../components/layout/SEO";

function EditProfile({ user }: { user: IUser | null }) {
  const onSubmit = (data: z.infer<typeof EditAccountSchema>) => {
    if (errors.username) {
      // check again for verification
      const error = isValidUsername(username);
      if (error) setError("username", { type: "manual", message: error });
      else clearErrors("username");
      if (user) usernameMutation({ username: data.username, userId: user._id });
      if (errors.username) return;
    }
    // sending submit request
    // formdata creation
    const formData = new FormData();
    formData.set("username", data.username);
    formData.set("name", data.name);
    formData.set(
      "avatar",
      image as Blob,
    ) /* user can pass null image as well */;
    formData.set("portfolio", data.portfolio);
    formData.set("location", data.location);
    formData.set("bio", data.bio);
    mutate(formData);
  };

  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: editAccountAction,
    onSuccess: (res) => {
      if (res && user) {
        showToast({ message: res.message });
        queryClient.invalidateQueries({
          queryKey: [KEYS.GET_ME, KEYS.GET_USER, user._id],
        });
        // invalidate user
        nav(`/user/${user._id}`);
      }
    },
  });

  const nav = useNavigate();
  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditAccountSchema),
    defaultValues: {
      name: user && user.name ? user.name : "",
      username: user ? user.username : "",
      location: user && user.location ? user.location : "",
      bio: user && user.bio ? user.bio : "",
      portfolio: user && user.portfolio ? user.portfolio : "",
    },
  });

  const [username, setUsername] = useState(user ? user.username : "");
  const [image, setImage] = useState<File | null>(null);
  const [imagePrev, setImagePrev] = useState<string | ArrayBuffer | null>(
    user && user.avatar.secure_url ? user.avatar.secure_url : fallback_pp,
  );

  // image handler
  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImage(file);
      setImagePrev(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
  const { mutate: usernameMutation, isPending: isLoading } = useMutation({
    mutationFn: checkAvailabilityAction,
    onSuccess: (res) => {
      if (res) {
        if (!res.data)
          setError("username", {
            type: "manual",
            message: "Username already taken by someone else.",
          });
        if (res.data) clearErrors("username");
      }
    },
  });

  // username validation checking
  useEffect(() => {
    const delay = 1000;
    const debounce = setTimeout(() => {
      if (username.length > 0) {
        const error = isValidUsername(username);
        if (error) {
          setError("username", { type: "manual", message: error });
        } else {
          clearErrors("username");
          if (user) usernameMutation({ username, userId: user._id });
        }
      }
    }, delay);
    return () => {
      clearTimeout(debounce);
    };
  }, [username, clearErrors, setError, usernameMutation, user]);

  if (!user) nav("/");
  return (
    <div className="min-h-screen bg-black grid place-items-center pt-20">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Edit Profile | DevUnity"
        description="Edit your DevUnity profile information and preferences."
        name="DevUnity"
        ogType="website"
        twitterCard="summary"
      />

      <form
        className="max-w-2xl w-full h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="min-w-60 min-h-60 my-5">
          <img
            src={imagePrev as string}
            alt="user"
            className="object-cover rounded-full h-52 w-52 shadow-input shadow-slate-800 max-md:mx-auto"
          />
          <label className="text-indigo-500 cursor-pointer block my-2 ml-12 max-md:ml-0 max-md:text-center">
            <input
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleImageInput}
            />
            Change Avatar
          </label>
        </div>
        <div className="w-full max-md:w-11/12 gap-2 flex items-center justify-between mb-4 mx-auto">
          <AceButton isPurple={true} isLoading={isPending} type="submit">
            Save
          </AceButton>
          <AceButton type="button" onClick={() => nav(-1)} disabled={isPending}>
            Cancel
          </AceButton>
        </div>
        <div className="max-md:w-11/12 w-full mx-auto">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              {...register("name")}
              id="fullName"
              placeholder="Manish Suthar"
              type="text"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register("username")}
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="m4dd0c"
              type="text"
              isLoading={isLoading}
            />
            {
              <div className="text-red-500 text-sm min-h-5">
                {errors.username && errors.username.message}
              </div>
            }
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="location">Location</Label>
            <Input
              {...register("location")}
              id="location"
              placeholder="Osaka, Japan"
              type="text"
            />
            {errors.location && (
              <span className="text-red-500 text-sm">
                {errors.location.message}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="portfolio">Portfolio</Label>
            <Input
              {...register("portfolio")}
              id="portfolio"
              placeholder="https://m4dd0c.netlify.app"
              type="text"
            />
            {errors.portfolio && (
              <span className="text-red-500 text-sm">
                {errors.portfolio.message}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              {...register("bio")}
              id="bio"
              placeholder="About you..."
            />
            {errors.bio && (
              <span className="text-red-500 text-sm">{errors.bio.message}</span>
            )}
          </LabelInputContainer>
        </div>
      </form>
    </div>
  );
}
export default EditProfile;
