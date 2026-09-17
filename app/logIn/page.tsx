"use client";

import Link from "next/link";
import { LogIn, Mail, Lock, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

import { loginUser } from "@/lib/api/auth";
import { loginSchema } from "@/lib/validations/auth";

export default function LoginPage() {
  const searchParams = useSearchParams();

  const callbackUrl =
    searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    try {
      await loginUser(email, password);

      window.location.href = callbackUrl;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Login failed"
      );
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1e6]">
              <LogIn
                size={22}
                className="text-[#ff6a00]"
              />
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Login to continue to your account.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold text-gray-900"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold text-gray-900"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                  minLength={4}
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#ff6a00] px-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#e65f00] hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn size={17} />

              {isLoading
                ? "Logging In..."
                : "Log In"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
            <ShieldCheck size={13} />
            <span>
              Your account is securely handled.
            </span>
          </div>

          <div className="my-6 h-px bg-gray-200" />

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#ff6a00] transition-colors hover:text-[#e65f00]"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}