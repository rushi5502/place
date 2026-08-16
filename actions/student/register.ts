"use server";

import { db } from "@/lib/db";
import RegisterSchema from "@/schemas/RegisterSchema";
import bcryptjs from "bcryptjs";
import z from "zod";

export const register = async (
  values: z.infer<typeof RegisterSchema>
) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }

    const { name, email, password } = validatedFields.data;

    const userExist = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      return { error: "User already exists" };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashpassword,
        emailVerified: new Date(),
      },
    });

    return {
      success: "Account created successfully. You can now login.",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong while creating the account.",
    };
  }
};