import { z } from "zod";
import {
  ContactMeSchema,
  ForgetPasswordSchema,
  SigninSchema,
  SignupSchema,
} from "../schemas/user.schema";
import { axiosInstance } from "..";

export const checkAvailabilityAction = async ({
  username,
  userId,
}: {
  username: string;
  userId?: string;
}) => {
  try {
    const url = userId
      ? `/user/username/available?userId=${userId}`
      : "/user/username/available";
    const { data }: { data: IData<boolean> } = await axiosInstance.post(url, {
      username,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const signupAction = async (input: z.infer<typeof SignupSchema>) => {
  try {
    const { data }: { data: IData<string> } = await axiosInstance.post(
      "/user/signup",
      input,
    );
    return data;
  } catch (error) {
    console.log(error);
    // return error?.response?.data;
  }
};
export const verificationAction = async (token: string) => {
  try {
    const { data }: { data: IData<boolean> } = await axiosInstance.get(
      `/user/verify/${token}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const signinAction = async (input: z.infer<typeof SigninSchema>) => {
  try {
    const { data }: { data: IData<string> } = await axiosInstance.post(
      "/user/signin",
      input,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getMeAction = async () => {
  try {
    const { data }: { data: IData<IUser> } =
      await axiosInstance.get("/user/me");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getUserAction = async (userId: string) => {
  try {
    const { data }: { data: IData<IUser> } = await axiosInstance.get(
      `/user/profile/${userId}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const ChangePasswordAction = async (formData: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const { data }: { data: IData<boolean> } = await axiosInstance.put(
      `/user/password/change`,
      formData,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const forgetPasswordAction = async (
  formData: z.infer<typeof ForgetPasswordSchema>,
) => {
  try {
    const { data }: { data: IData<boolean> } = await axiosInstance.put(
      "/user/password/forget",
      formData,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const resetPasswordAction = async (formData: {
  token: string;
  newPassword: string;
}) => {
  try {
    const { data }: { data: IData<boolean> } = await axiosInstance.put(
      `/user/password/reset/${formData.token}`,
      { newPassword: formData.newPassword },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteAccountAction = async () => {
  try {
    const { data }: { data: IData<boolean> } =
      await axiosInstance.delete(`/user/me`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const editAccountAction = async (formData: FormData) => {
  try {
    const { data }: { data: IData<boolean> } = await axiosInstance.put(
      "/user/me",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const contactMeAction = async (
  formData: z.infer<typeof ContactMeSchema>,
) => {
  try {
    const { data }: { data: IData<boolean> } = await axiosInstance.post(
      "/user/contact",
      formData,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logoutAction = async () => {
  try {
    const { data }: { data: IData<boolean> } =
      await axiosInstance.get("/user/logout");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const searchUsersAction = async ({
  query,
  page = 1,
  size = 10,
}: {
  query: string;
  page: number;
  size: number;
}) => {
  try {
    const { data }: { data: IData<ISearchUser> } = await axiosInstance.get(
      `/user/search/${query}?page=${page}&size=${size}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
