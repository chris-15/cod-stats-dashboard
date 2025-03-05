"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HiChartSquareBar, HiHome, HiPlusCircle } from "react-icons/hi";
import { IoGameController, IoLogInSharp, IoLogOutSharp } from "react-icons/io5";
import { IconType } from "react-icons";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type TSidebarItem = {
  name: string;
  path: string;
  icon: IconType;
};

const navConfigs: Record<string, TSidebarItem[]> = {
  mw3: [
    {
      name: "Home",
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
      name: "Home",
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

export function NewSidebar({ game = "bo6" }: SideBarProps) {
  const { status, data: session } = useSession();

  const pathname = usePathname();

  const activeItems = navConfigs[game];

  return (
    <Sidebar className="">
      <SidebarHeader className="px-6 py-4">
        <div className="space-y-1">
          <Link
            href={status === "authenticated" ? `/dashboard/${game}` : "/"}
            className="flex items-center gap-2"
          >
            <h1 className="text-2xl font-bold tracking-tight text-white">
              CoD{" "}
              <span
                className={`${
                  game === "mw3"
                    ? "bg-gradient-to-r from-[#B0FF34] via-[#C5FF6A] to-[#8FD400]"
                    : "bg-gradient-to-r from-[#FF9900] via-[#FFAC38] to-[#FF7700]"
                } bg-clip-text text-transparent`}
              >
                Dashboard
              </span>
            </h1>
          </Link>
          <p className="text-xs">Your Call of Duty Ranked Stats Hub </p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {game === "mw3" ? "Modern Warfare 3" : "Black Ops 6"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {activeItems?.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton  asChild>
                    <Link
                      href={item.path}
                      className={
                        ` ${pathname === item.path
                          ? game === "mw3"
                            ? "bg-sidebar-active-mw3 text-black"
                            : "bg-sidebar-active-bo6 text-black"
                          : ""}`
                      }
                    >
                      <item.icon className="text-lg" />
                      <span className=" ">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-zinc-800 p-4">
        {status === "authenticated" && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src={session?.user?.image || ""}
                width={36}
                height={36}
                alt="Profile-picture"
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span>{session?.user?.name?.split(" ")[0] || ""}</span>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 hover:bg-sidebar-accent p-2 rounded-lg"
            >
              <IoLogOutSharp className="h-5 w-5" />
              <span className="">Sign Out</span>
            </button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
