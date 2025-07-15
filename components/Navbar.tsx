"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { HiPlusCircle } from "react-icons/hi";
import { LuMenu, LuX } from "react-icons/lu";

type TNavBarItems = {
  name: string;
  path: string;
};

//update this when new game drops
const navConfigs: Record<string, TNavBarItems[]> = {
  mw3: [
    {
      name: "Home",
      path: "/dashboard/mw3",
    },
    {
      name: "Add Stats",
      path: "/add-stats",
    },
    {
      name: "Hardpoint",
      path: "/dashboard/mw3/hardpoint",
    },
    {
      name: "Control",
      path: "/dashboard/mw3/control",
    },
    {
      name: "S&D",
      path: "/dashboard/mw3/searchanddestroy",
    },
    {
      name: "Black Ops 6",
      path: "/dashboard/bo6",
    },
  ],
  bo6: [
    {
      name: "Home",
      path: "/dashboard/bo6",
    },
    {
      name: "Add Stats",
      path: "/add-stats",
    },
    {
      name: "Hardpoint",
      path: "/dashboard/bo6/hardpoint",
    },
    {
      name: "Control",
      path: "/dashboard/bo6/control",
    },
    {
      name: "S&D",
      path: "/dashboard/bo6/searchanddestroy",
    },
    {
      name: "Maps",
      path: "/dashboard/bo6/maps",
    },
    {
      name: "Modern Warfare 3",
      path: "/dashboard/mw3",
    },
  ],
};

type NavBarProps = {
  game: keyof typeof navConfigs;
};

function Navbar({ game = "bo6" }: NavBarProps) {
  const { status, data: session } = useSession();
  //sets state for the Menu Pop Up
  const [showMenu, setshowMenu] = useState(false);

  // setting a ref to the dom element i need to reference for when the user clicks out of the menu
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // only runs whenever showMenu state changes
    // function to handle when the user clicks outside of the menu
    const handleClickOut = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setshowMenu(false);
      }
    };
    //add the event listener
    document.addEventListener("click", handleClickOut);

    //removes event listener when menu closes
    if (!showMenu) {
      document.removeEventListener("click", handleClickOut);
    }
    //remove event listenter
    return () => {
      document.removeEventListener("click", handleClickOut);
    };
  }, [showMenu]);

  const pathname = usePathname();

  const activeItems = navConfigs[game];

  return (
    <div className="flex justify-between p-4 relative ">
      <div className="space-y-1">
        <Link href={`/dashboard/${game}`} className="flex items-center gap-2">
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

      <div
        className={`absolute z-30 right-12 top-14 bg-black text-white border-4 p-6 shadow-lg rounded-md  flex-col gap-2 text-right min-w-[160px] ${
          showMenu ? "flex" : "hidden"
        } `}
        ref={menuRef}
      >
        <div className="font-bold">{session?.user?.email}</div>
        {activeItems.map((item) => {
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`hover:underline ${
                pathname === item.path
                  ? game === "mw3"
                    ? "underline text-[#b0ff34]"
                    : "underline text-[#ff9900]"
                  : game === "mw3"
                  ? ""
                  : ""
              } `}
              onClick={() => setshowMenu(false)}
            >
              <p>{item.name}</p>
            </Link>
          );
        })}

        <button
          className={game === "mw3" ? `btn` : `btn-bo6`}
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>

      <div className="flex gap-2 items-center">
        {showMenu ? (
          <LuX
            size={30}
            className="rounded-full cursor-pointer hover:scale-110 transition"
          />
        ) : (
          <LuMenu
            size={30}
            className="rounded-full cursor-pointer hover:scale-110 transition"
            onClick={() => setshowMenu((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );
}
export default Navbar;
