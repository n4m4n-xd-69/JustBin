"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "@/lib/validations";

export type AuthResult = { success: true } | { success: false; error: string };

export async function registerUser(input: RegisterInput): Promise<AuthResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid details",
    };
  }

  const { name, email, password } = parsed.data;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { success: false, error: "An account with this email already exists" };
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.create({ data: { name, email, passwordHash } });
  } catch (error) {
    console.error("Registration failed:", error);
    return {
      success: false,
      error: "Could not create your account right now. Please try again.",
    };
  }

  // Sign the new user in immediately.
  return loginUser({ email, password });
}

export async function loginUser(input: LoginInput): Promise<AuthResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid credentials",
    };
  }

  try {
    await signIn("credentials", { ...parsed.data, redirect: false });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: "Incorrect email or password" };
    }
    console.error("Login failed:", error);
    return { success: false, error: "Could not sign you in. Please try again." };
  }
}

export async function logoutUser() {
  await signOut({ redirect: false });
  revalidatePath("/", "layout");
}
