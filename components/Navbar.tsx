"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { HiPlusCircle } from "react-icons/hi";
import { LuMenu, LuX } from "react-icons/lu";

function Navbar() {
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

  type TNavBarItems = {
    name: string;
    path: string;
  };

  const navBarItems: TNavBarItems[] = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Add Stats",
      path: "/add-stats",
    },
    {
      name: "Hardpoint",
      path: "/dashboard/hardpoint",
    },
    {
      name: "Control",
      path: "/dashboard/control",
    },
    {
      name: "S&D",
      path: "/dashboard/searchanddestroy",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="flex justify-between p-4 relative ">
      <div className="text-white">
        <Link href={status === "authenticated" ? "/dashboard " : "/"}>
          <h1 className="text-4xl font-bold tracking-tighter">CoD Dashboard</h1>
        </Link>
        <p className="text-sm ">Your Call of Duty Ranked Stats Hub </p>
      </div>

      {status === "authenticated" ? (
        /*  if the user session status is authenticated then render navbar for logged in user otherwise show sigin button */
        <>
          <div
            className={`absolute z-30 right-12 top-14 bg-[#212529] text-white border-2 p-6 shadow-lg rounded-md  flex-col gap-2 text-right min-w-[160px] ${
              showMenu ? "flex" : "hidden"
            } `}
            ref={menuRef}
          >
            <div className="font-bold">{session?.user?.email}</div>
            {navBarItems.map((item) => {
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`hover:underline ${
                    pathname === item.path ? `underline text-[#b0ff34]` : ""
                  } `}
                  onClick={() => setshowMenu(false)}
                >
                  <p>{item.name}</p>
                </Link>
              );
            })}

            <button className="btn" onClick={() => signOut()}>
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
        </>
      ) : (
        <div className="flex items-center">
          <Link href={"/sign-in"} className="btn">
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}
export default Navbar;
