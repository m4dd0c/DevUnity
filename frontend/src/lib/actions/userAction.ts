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
  const url = userId
    ? `/user/username/available?userId=${userId}`
    : "/user/username/available";

  const { data }: { data: IData<boolean> } = await axiosInstance.post(url, {
    username,
  });
  return data;
};

export const signupAction = async (input: z.infer<typeof SignupSchema>) => {
  const { data }: { data: IData<string> } = await axiosInstance.post(
    "/user/signup",
    input,
  );
  return data;
};

export const verificationAction = async (token: string) => {
  const { data }: { data: IData<boolean> } = await axiosInstance.get(
    `/user/verify/${token}`,
  );
  return data;
};

export const signinAction = async (input: z.infer<typeof SigninSchema>) => {
  const { data }: { data: IData<string> } = await axiosInstance.post(
    "/user/signin",
    input,
  );
  return data;
};

export const getMeAction = async () => {
  const { data }: { data: IData<IUser> } = await axiosInstance.get("/user/me");
  return data;
};

export const getUserAction = async (userId: string) => {
  const { data }: { data: IData<IUser> } = await axiosInstance.get(
    `/user/profile/${userId}`,
  );
  return data;
};

export const ChangePasswordAction = async (formData: {
  currentPassword: string;
  newPassword: string;
}) => {
  const { data }: { data: IData<boolean> } = await axiosInstance.put(
    `/user/password/change`,
    formData,
  );
  return data;
};

export const forgetPasswordAction = async (
  formData: z.infer<typeof ForgetPasswordSchema>,
) => {
  const { data }: { data: IData<boolean> } = await axiosInstance.put(
    "/user/password/forget",
    formData,
  );
  return data;
};

export const resetPasswordAction = async (formData: {
  token: string;
  newPassword: string;
}) => {
  const { data }: { data: IData<boolean> } = await axiosInstance.put(
    `/user/password/reset/${formData.token}`,
    { newPassword: formData.newPassword },
  );
  return data;
};

export const deleteAccountAction = async () => {
  const { data }: { data: IData<boolean> } =
    await axiosInstance.delete(`/user/me`);
  return data;
};

export const editAccountAction = async (formData: FormData) => {
  const { data }: { data: IData<boolean> } = await axiosInstance.put(
    "/user/me",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data;
};

export const contactMeAction = async (
  formData: z.infer<typeof ContactMeSchema>,
) => {
  const { data }: { data: IData<boolean> } = await axiosInstance.post(
    "/user/contact",
    formData,
  );
  return data;
};

export const logoutAction = async () => {
  const { data }: { data: IData<boolean> } =
    await axiosInstance.get("/user/logout");
  return data;
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
  const { data }: { data: IData<ISearchUser> } = await axiosInstance.get(
    `/user/search/${query}?page=${page}&size=${size}`,
  );
  return data;
};
