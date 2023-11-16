'use client'

import Image from "next/image";

import { signIn } from "next-auth/react";

function SignInButtons() {
  return (
    <>
      <h1 className="text-center text-2xl font-bold mt-8">Sign in</h1>
      <div className="mt-4 p-4 flex flex-col items-center justify-center gap-4">
        <button
          onClick={() => signIn("google")}
          className="flex items-center border p-4 rounded-full gap-4 hover:bg-slate-800 transition"
        >
          <span>
            <Image
              src={"/google-logo.svg"}
              width={30}
              height={30}
              alt="google-logo"
            />
          </span>
          Sign In with Google
        </button>
      </div>
    </>
  );
}
export default SignInButtons;
