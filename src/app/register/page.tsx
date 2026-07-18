import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <div className="relative overflow-hidden pt-28 pb-20 sm:pt-36">
      <div className="glow-green pointer-events-none absolute -top-40 left-1/2 size-150 -translate-x-1/2 opacity-40" />
      <div className="bg-noise pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-md px-4 sm:px-6">
        <AuthForm mode="register" />
      </div>
    </div>
  );
}
