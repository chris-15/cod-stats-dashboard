"use client";

import Image from "next/image";

import { signIn } from "next-auth/react";

function SignInButtons() {
  return (
    <section className="flex justify-center items-center min-h-[calc(100vh-180px)]">
      <div className="p-8">
        <h1 className="text-center text-4xl font-bold mb-4">
          Sign in / Sign Up
        </h1>
        <p className="text-center text-sm mb-4 text-[#8b949e]">
          You can use your Google account to sign in or create a new account.
        </p>
        <div className="mt-4 p-4 flex flex-col items-center justify-center gap-4">
          <button
            onClick={() => signIn("google")}
            className="flex items-center border p-4 rounded-full gap-4 hover:bg-[#161B22] transition"
          >
            <span>
              <Image
                src={"/google-logo.svg"}
                width={30}
                height={30}
                alt="google-logo"
              />
            </span>
            Sign In / Sign Up with Google
          </button>
        </div>
      </div>
    </section>
  );
}
export default SignInButtons;
