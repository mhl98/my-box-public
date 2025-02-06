"use client";
import { LoginForm } from "@/components/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-neutral-100 p-6 md:p-10 dark:bg-neutral-800">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Suspense fallback={<div>Loading...</div>}>
          {" "}
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
