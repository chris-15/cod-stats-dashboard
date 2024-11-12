"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { HiChartSquareBar, HiHome, HiPlusCircle } from "react-icons/hi";
import { IoGameController, IoLogInSharp, IoLogOutSharp } from "react-icons/io5";
import { IconType } from "react-icons";

type TSidebarItem = {
  name: string;
  path: string;
  icon: IconType;
};

const navConfigs: Record<string, TSidebarItem[]> = {
  mw3: [
    {
      name: "Dashboard",
      path: "/dashboard/mw3",
      icon: HiHome,
    },
    {
      name: "Hardpoint",
      path: "/dashboard/mw3/hardpoint",
      icon: HiChartSquareBar,
    },
    {
      name: "Control",
      path: "/dashboard/mw3/control",
      icon: HiChartSquareBar,
    },
    {
      name: "S&D",
      path: "/dashboard/mw3/searchanddestroy",
      icon: HiChartSquareBar,
    },
    {
      name: "Black Ops 6",
      path: "/dashboard/bo6",
      icon: IoGameController,
    },
  ],
  bo6: [
    {
      name: "Dashboard",
      path: "/dashboard/bo6",
      icon: HiHome,
    },
    {
      name: "Add Stats",
      path: "/add-stats",
      icon: HiPlusCircle,
    },
    {
      name: "Hardpoint",
      path: "/dashboard/bo6/hardpoint",
      icon: HiChartSquareBar,
    },
    {
      name: "Control",
      path: "/dashboard/bo6/control",
      icon: HiChartSquareBar,
    },
    {
      name: "S&D",
      path: "/dashboard/bo6/searchanddestroy",
      icon: HiChartSquareBar,
    },
    {
      name: "Modern Warfare 3",
      path: "/dashboard/mw3",
      icon: IoGameController,
    },
  ],
};

type SideBarProps = {
  game: keyof typeof navConfigs;
};

export function SideBar({ game = "bo6" }: SideBarProps) {
  const { status, data: session } = useSession();

  const pathname = usePathname();

  const activeItems = navConfigs[game];

  console.log("Game prop:", game);

  return (
    <div className="h-screen w-64 flex flex-col justify-between shadow-lg p-4 sticky top-0 bg-secondary-bg border-r border-[#444444] text-white">
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
            <p className="text-sm ">Your Call of Duty Ranked Stats Hub </p>
          </div>

          {/* Items */}
          <div className="flex flex-col space-y-4">
            {activeItems?.map((item) => {
              // must declar item.icon as Icon, because IconType is returns a react element
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:text-[#333333] ${
                    pathname === item.path
                      ? game === "mw3"
                        ? "bg-sidebar-active-mw3 text-[#333333]"
                        : "bg-sidebar-active-bo6 text-[#333333]"
                      : game === "mw3"
                      ? "hover:bg-sidebar-hover-mw3"
                      : "hover:bg-sidebar-hover-bo6"
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
          <button
            className="cursor-pointer hover:scale-105 transition"
            onClick={() => signOut()}
          >
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
