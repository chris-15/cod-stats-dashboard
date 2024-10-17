"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function MobileNav() {
  const { status, data: session } = useSession();

  type TMobileNavItems = {
    name: string;
    path: string;
  };

  const navBarItems: TMobileNavItems[] = [
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

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return status === "authenticated" ? (
    <nav
      className={`h-16 px-4 pt-2 text-gray-400 bg-[#212529] transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="flex justify-around items-center bg-secondary-bg h-12 rounded-lg">
        {navBarItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`hover:underline  text-sm ${
              pathname === item.path ? `underline text-[#b0ff34]` : ""
            } `}
          >
            <p>{item.name}</p>
          </Link>
        ))}
      </div>
    </nav>
  ) : (
    <></>
  );
}
