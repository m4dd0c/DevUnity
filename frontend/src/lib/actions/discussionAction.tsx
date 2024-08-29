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
// TODO :later change type
export const updateDiscussionAction = async ({
  roomId,
  msg,
}: {
  roomId: string;
  msg: string;
}) => {
  console.log(msg);
  try {
    const { data }: { data: IData<ISearchRoom> } = await axiosInstance.put(
      `/discussion/${roomId}`,
      { msg },
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
