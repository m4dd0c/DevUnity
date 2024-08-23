import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { LabelInputContainer } from "../ui/misc";
import AceButton from "../ui/AceButton";
import { KEYS } from "../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinRoomAction } from "../../lib/actions/roomAction";
import { JoinRoomSchema } from "../../lib/schemas/room.schema";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/useSocket";

function JoinRoomForm({ user }: { user: IUser | null }) {
  const nav = useNavigate();

  const { isLoading, refetch, data } = useQuery({
    queryFn: async () =>
      await joinRoomAction({
        roomId: getValues("roomId"),
        password: getValues("password"),
      }),
    queryKey: [KEYS.JOIN_ROOM],
    enabled: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(JoinRoomSchema),
    defaultValues: {
      roomId: "",
      password: "",
    },
  });

  // sending submition
  const onSubmit = () => {
    refetch();
  };

  // setting up socketio
  const { joinEvent } = useSocket();

  // if error / response handling
  useEffect(() => {
    // if (!user) {
    //   console.log("going back");
    //   return nav("/room/join");
    // }
    // if (error) console.log(error);
    //
    if (data && user) {
      joinEvent({ roomId: data.data, userId: user._id });
      return nav(`/room/${data.data}/about`, { state: { query: "rwx" } });
    }
  }, [data, nav, user, joinEvent]);

  return (
    <div className="absolute top-1/2 -translate-y-1/4 inset-x-0 z-50 max-w-md w-full mx-auto rounded-none border border-neutral-900 md:rounded-2xl p-4 md:p-8 bg-white dark:bg-[rgba(0,0,0,0.5)] shadow-input">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Join A Room
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 flex items-center gap-2">
        Join with fellows and dominate the World together.
      </p>
      <form className="mt-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="roomId">Room ID</Label>
          <Input
            {...register("roomId")}
            id="roomId"
            placeholder="Enter room id to join"
            type="text"
            transparent={true}
          />
          {errors.roomId && (
            <span className="text-sm text-red-500">
              {errors.roomId.message}
            </span>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            id="password"
            placeholder="••••••••"
            type="password"
            transparent={true}
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </LabelInputContainer>
        <AceButton type="submit" isLoading={isLoading}>
          Join Room
        </AceButton>
        <small className="mt-2 dark:text-neutral-300">
          Room admin can join without password.
        </small>
      </form>
    </div>
  );
}

export default JoinRoomForm;
