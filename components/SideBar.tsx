"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { HiChartSquareBar, HiHome, HiPlusCircle } from "react-icons/hi";
import { IoLogInSharp, IoLogOutSharp } from "react-icons/io5";
import { IconType } from "react-icons";

type TSidebarItems = {
  name: string;
  path: string;
  icon: IconType;
};

const sidebarItems: TSidebarItems[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: HiHome,
  },
  {
    name: "Add Stats",
    path: "/add-stats",
    icon: HiPlusCircle,
  },
  {
    name: "Hardpoint",
    path: "/dashboard/hardpoint",
    icon: HiChartSquareBar,
  },
  {
    name: "Control",
    path: "/dashboard/control",
    icon: HiChartSquareBar,
  },
  {
    name: "S&D",
    path: "/dashboard/searchanddestroy",
    icon: HiChartSquareBar,
  },
];

export function SideBar() {
  const { status, data: session } = useSession();

  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="h-screen w-64 flex flex-col justify-between bg-slate-400 shadow-lg p-4 sticky top-0 ">
      <div className="">
        <div className=" flex flex-col space-y-10">
          {/* Header */}
          <div className="">
            <Link
              href={status === "authenticated" ? "/dashboard " : "/"}
              className=""
            >
              <h1 className="text-4xl font-bold tracking-tighter">
                CoD Dashboard
              </h1>
            </Link>
            <p className="text-sm">Your Call of Duty Ranked Stats Hub </p>
          </div>

          {/* Items */}
          <div className="flex flex-col space-y-4">
            {sidebarItems.map((item) => {
              // must declar item.icon as Icon, because IconType is returns a react element
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center space-x-2 p-2 hover:bg-slate-200 rounded-lg cursor-pointer hover:text-blue-500 ${
                    pathname === item.path ? `bg-slate-200 text-blue-500 ` : ``
                  }`}
                >
                  <Icon size={30} />
                  <p className="text-sm font font-semibold">{item.name} </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* log out button and image */}
      {status === "authenticated" ? (
        <div className="flex justify-between items-center">
          <button className="cursor-pointer hover:scale-105 transition" onClick={() => signOut()}>
            <span className="hover:underline flex items-center space-x-2">
              {" "}
              <IoLogOutSharp size={36} className=""></IoLogOutSharp>
              <span className="underline underline-offset-2">Sign Out</span>
            </span>
          </button>
          <Image
            src={session?.user?.image || ""}
            width={36}
            height={36}
            alt="Profile-picture"
            className="rounded-full"
          />
        </div>
      ) : (
        <Link
          href={"/sign-in"}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <IoLogInSharp size={24}></IoLogInSharp>
          <span>Sign In</span>
        </Link>
      )}
    </div>
  );
}
