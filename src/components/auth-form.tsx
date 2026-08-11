"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "@/lib/validations";
import { loginUser, registerUser } from "@/app/actions/auth";
import { Logo } from "@/components/logo";

type Mode = "login" | "register";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const isLogin = mode === "login";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    // Login mode validates a subset of the fields, so widen the resolver type.
    resolver: zodResolver(
      isLogin ? loginSchema : registerSchema
    ) as unknown as Resolver<RegisterInput>,
  });

  async function onSubmit(data: RegisterInput) {
    setServerError(null);
    const result = isLogin
      ? await loginUser(data as LoginInput)
      : await registerUser(data);

    if (result.success) {
      router.push("/");
      router.refresh();
    } else {
      setServerError(result.error);
    }
  }

  return (
    <Card className="p-6 sm:p-10">
      <div className="mb-6 flex items-center justify-between">
        <Logo />
      </div>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {isLogin ? "Welcome back" : "Create your account"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {isLogin
          ? "Sign in to track your pickups and bookings."
          : "Join JustBin and start turning your scrap into value."}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
        noValidate
      >
        {!isLogin && (
          <div>
            <Label htmlFor="auth-name">Name</Label>
            <Input
              id="auth-name"
              placeholder="Enter your full name"
              className="mt-2"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>
        )}
        <div>
          <Label htmlFor="auth-email">Email</Label>
          <Input
            id="auth-email"
            type="email"
            placeholder="your.email@example.com"
            className="mt-2"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="auth-password">Password</Label>
          <Input
            id="auth-password"
            type="password"
            placeholder={isLogin ? "Your password" : "At least 8 characters"}
            className="mt-2"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {serverError}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : isLogin ? (
            <>
              Sign in <LogIn className="size-4" />
            </>
          ) : (
            <>
              Create account <UserPlus className="size-4" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isLogin ? (
          <>
            New to JustBin?{" "}
            <Link
              href="/register"
              className="font-medium text-brand-green hover:underline"
            >
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-brand-green hover:underline"
            >
              Sign in
            </Link>
          </>
        )}
      </p>
    </Card>
  );
}
