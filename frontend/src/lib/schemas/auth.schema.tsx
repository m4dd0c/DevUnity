import { z } from "zod";
export const SignupSchema = z.object({
  username: z.string().min(3).max(32),
  name: z.string().max(32),
  email: z.string().min(5).max(100).email(),
  password: z.string().min(8).max(100),
});
export const SigninSchema = z.object({
  input: z.string().min(3).max(100),
  password: z.string().min(8).max(100),
});
export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(8).max(100),
  newPassword: z.string().min(8).max(100),
  confirmPassword: z.string().min(8).max(100),
});
export const ForgetPasswordSchema = z.object({
  email: z.string().min(5).max(100).email(),
});
export const ResetPasswordSchema = z.object({
  newPassword: z.string().min(8).max(100),
  confirmPassword: z.string().min(8).max(100),
});
export const DeleteAccountSchema = z.object({
  verify: z.string().min(3).max(3),
  confirm: z.string().min(6).max(100),
});
export const EditAccountSchema = z.object({
  name: z.string().max(50),
  username: z.string().min(3).max(32),
  location: z.string().max(50),
  bio: z.string().max(150),
  portfolio: z.string().max(100),
});
export const ContactMeSchema = z.object({
  f_name: z.string().min(3).max(100),
  l_name: z.string().max(100),
  email: z.string().min(5).max(100).email(),
  message: z.string().max(2000),
});
