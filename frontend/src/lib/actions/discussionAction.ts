import { axiosInstance } from "..";

export const getDiscussionAction = async (roomId: string) => {
  const { data }: { data: IData<IDiscussion> } = await axiosInstance.get(
    `/discussion/${roomId}`,
  );
  return data;
};

export const updateDiscussionAction = async ({
  roomId,
  chat,
}: {
  roomId: string;
  chat: IMessage[];
}) => {
  const { data }: { data: IData<ISearchRoom> } = await axiosInstance.put(
    `/discussion/${roomId}`,
    { chat },
  );
  return data;
};
