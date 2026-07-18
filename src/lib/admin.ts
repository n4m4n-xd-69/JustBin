import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * Server-side helper to check if the current user is an admin.
 * Redirects to login if not authenticated or not an admin.
 */
export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/?error=unauthorized");
  }

  return session;
}

/**
 * Check if user is admin without redirecting
 */
export async function isAdmin() {
  const session = await auth();
  return session?.user?.role === "ADMIN";
}
