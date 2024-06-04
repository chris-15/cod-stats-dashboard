"use client";

import Image from "next/image";

import { signIn } from "next-auth/react";

function SignInButtons() {
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="mx-4 w-full max-w-md  p-6 bg-secondary-bg border border-[#444444] rounded-lg ">
        <h1 className="text-center text-4xl font-bold mb-4 ">
         Welcome Back!
        </h1>
        <p className="text-center text-sm mb-4 text-[#AAAAAA]">
          Sign in to your account to continue.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => signIn("google")}
            className=" inline-flex h-10 items-center justify-center rounded-md border border-[#444444] px-4 text-sm font-medium shadow-sm transition-colors bg-[#b0ff34] hover:bg-[#8ccc26] text-[#333333]"
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
      </div>
    </section>
  );
}
export default SignInButtons;
