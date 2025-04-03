import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { LabelInputContainer } from "../ui/misc";
import AceButton from "../ui/AceButton";
import { KEYS, showToast } from "../../lib/utils";
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
    if (data && user) {
      showToast({ message: data.message });
      joinEvent({ roomId: data.data, userId: user._id });
      return nav(`/room/${data.data}/about`, { state: { query: "rwx" } });
    }
  }, [data, nav, user, joinEvent]);

  return (
    <div className="shadow-input absolute inset-x-0 top-1/2 z-50 mx-auto w-full max-w-md -translate-y-1/4 rounded-none border border-neutral-900 bg-white p-4 md:rounded-2xl md:p-8 dark:bg-[rgba(0,0,0,0.5)]">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Join A Room
      </h2>
      <p className="mt-2 flex max-w-sm items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
        Join with fellows and dominate the World together.
      </p>
      <form className="mb-4 mt-8" onSubmit={handleSubmit(onSubmit)}>
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
