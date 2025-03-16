"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type TMobileNavItems = {
  name: string;
  path: string;
};

const navConfigs: Record<string, TMobileNavItems[]> = {
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
  ],
};

type MobileNavProps = {
  game: keyof typeof navConfigs;
};

export function MobileNav({ game: game = "bo6" }: MobileNavProps) {
  const { status, data: session } = useSession();

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

  const activeItmes = navConfigs[game];

  return status === "authenticated" ? (
    <nav
      className={`h-20 px-4 pt-4 text-gray-400 bg-background transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="flex justify-around items-center bg-sidebar border h-12 rounded-lg">
        {activeItmes.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`hover:underline  text-sm ${
              pathname === item.path
                ? game === "mw3"
                  ? "underline text-[#b0ff34]"
                  : "underline text-[#ff9900]"
                : game === "mw3"
                ? ""
                : ""
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
