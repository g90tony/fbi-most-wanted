import { string, z } from "zod";

export const signUpFormSchema = z.object({
  name: string()
    .min(5, "Pease ensure your names include more than 5 characters")
    .includes(" ", {
      message: "Please esure you have entered your first and last name",
    })
    .max(50, "Please ensure your names do not exceed 50 characters"),
  email: string().email(
    "Please make sure you have entered a valid email address"
  ),
  username: string()
    .min(3, "Please ensure your username is at least 3 characters long")
    .max(15, "Please make sure your username does not sxceed 15 characters"),
  password: string()
    .min(8, "Please make sure that your password is at lease 8 characters long")
    .max(
      20,
      "Please make usre that your password does not exceed 20 characters"
    ),
  password2: string()
    .min(
      8,
      "Please make sure that your confirmation password is at lease 8 characters long"
    )
    .max(
      20,
      "Please make usre that your confirmation password does not exceed 20 characters"
    ),
});

export type TSignUpFormSchema = z.infer<typeof signUpFormSchema>;

export const signInFormSchema = z.object({
  email: string().email(
    "Please make sure you have entered a valid email address"
  ),

  password: string()
    .min(8, "Please make sure that your password is at lease 8 characters long")
    .max(
      20,
      "Please make usre that your password does not exceed 20 characters"
    ),
});

export type TSignInFormSchema = z.infer<typeof signInFormSchema>;
