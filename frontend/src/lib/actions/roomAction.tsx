import { axiosInstance } from "..";

export const searchRoomsAction = async ({
  query,
  page = 1,
  size = 10,
}: {
  query: string;
  page: number;
  size: number;
}) => {
  try {
    const { data }: { data: IData<ISearchRoom> } = await axiosInstance.get(
      `/room/search/${query}?page=${page}&size=${size}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
