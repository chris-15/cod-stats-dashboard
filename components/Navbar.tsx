"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

  return (
    <div className="flex justify-between pb-4  mb-4 relative">
      <div>
        <Link href={"/"}>
          <h1 className="text-4xl font-bold tracking-tighter">CoD Dashboard</h1>
        </Link>
        <p className="text-sm">Your Call of Duty Ranked Stats Hub </p>
      </div>

      {status === "authenticated" ? (
       /*  if the user session status is authenticated then render navbar for logged in user otherwise show sigin button */
        <>
          <div
            className={`absolute z-30 right-0 top-14 bg-white text-black p-6 shadow-lg rounded-md  flex-col gap-2 text-right min-w-[160px] ${
              showMenu ? "flex" : "hidden"
            } `}
            ref={menuRef}
          >
            <div className="font-bold">{session?.user?.email}</div>
            <Link
              onClick={() => setshowMenu(false)}
              href={"/dashboard"}
              className="hover:underline"
            >
              Dashboard
            </Link>
            <Link
              onClick={() => setshowMenu(false)}
              href={"/add-stats"}
              className="hover:underline"
            >
              Add Stats
            </Link>
            <Link
              onClick={() => setshowMenu(false)}
              href={"/dashboard/hardpoint"}
              className="hover:underline"
            >
              Hardpoint
            </Link>
            <Link
              onClick={() => setshowMenu(false)}
              href={"/dashboard/control"}
              className="hover:underline"
            >
              Control
            </Link>
            <Link
              onClick={() => setshowMenu(false)}
              href={"/dashboard/searchanddestroy"}
              className="hover:underline"
            >
              S&D
            </Link>
            <button className="btn" onClick={() => signOut()}>
              Sign Out
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <Link
              href={"/add-stats"}
              className="hidden md:flex gap-2 items-center mr-6"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <span className="hover:underline">Add Stats</span>
            </Link>
            <Image
              src={session?.user?.image || ""}
              width={36}
              height={36}
              alt="Profile-picture"
              className="rounded-full cursor-pointer hover:scale-110 transition "
              onClick={() => setshowMenu((prev) => !prev)}
            />
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
