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

export function NewSidebar({ game = "bo6" }: SideBarProps) {
  const { status, data: session } = useSession();

  const pathname = usePathname();

  const activeItems = navConfigs[game];

  return (
    <Sidebar className="">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {activeItems?.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link href={item.path}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {status === "authenticated" && (
          <div className="flex justify-between items-center">
            <SidebarMenuButton onClick={() => signOut()}>
              <IoLogOutSharp /> Sign Out
            </SidebarMenuButton>

            <Image
              src={session?.user?.image || ""}
              width={36}
              height={36}
              alt="Profile-picture"
              className="rounded-full"
            />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
