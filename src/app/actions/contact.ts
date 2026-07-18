"use server";

import { prisma } from "@/lib/prisma";
import { contactSchema, type ContactInput } from "@/lib/validations";

export type ContactResult = { success: true } | { success: false; error: string };

export async function sendContactMessage(
  input: ContactInput
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid message",
    };
  }

  try {
    await prisma.contactMessage.create({ data: parsed.data });
    return { success: true };
  } catch (error) {
    console.error("Failed to save contact message:", error);
    return {
      success: false,
      error: "Something went wrong on our side. Please try again or WhatsApp us.",
    };
  }
}
