"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import LoginSchema from "@/schemas/LoginSchema";
import { AuthError } from "next-auth";
import z from "zod";

export const login = async (
  values: z.infer<typeof LoginSchema>
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "User does not exist" };
  }

  if (existingUser.role !== "STUDENT") {
    return { error: "Invalid User" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
    });

    return { success: "Logged In" };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Invalid email or password" };
      }

      return {
        error: "Something went wrong",
        status: "error",
      };
    }

    throw error;
  }
};