import { axiosInstance } from "..";

export const getDiscussionAction = async (roomId: string) => {
  try {
    const { data }: { data: IData<IDiscussion> } = await axiosInstance.get(
      `/discussion/${roomId}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateDiscussionAction = async ({
  roomId,
  chat,
}: {
  roomId: string;
  chat: IMessage[];
}) => {
  console.log("hello world");
  try {
    const { data }: { data: IData<ISearchRoom> } = await axiosInstance.put(
      `/discussion/${roomId}`,
      { chat },
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// export const updatePasswordAndLangAction = async ({
//   formData,
//   roomId,
// }: {
//   formData: { password: string; lang: TLang };
//   roomId: string;
// }) => {
//   if (!formData.lang) formData.lang = "" as any;
//   if (!formData.password) formData.password = "";
//   try {
//     const { data }: { data: IData<ISearchRoom> } = await axiosInstance.put(
//       `/room/settings/${roomId}`,
//       formData,
//     );
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
