
import Navbar from "@/components/Navbar";

import { NextAuthProvider } from "@/components/Providers";
import { MatchesProvider } from "@/components/matchesContext";
import { Toaster } from "react-hot-toast";
import { SideBar } from "@/components/SideBar";

export default function EditStatsLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
        <NextAuthProvider>
        {/* mx-auto min-h-screen bg-[#0D1117] text-white py-4 pr-4 */}

        <MatchesProvider>
          <div className="flex">
            <div className="hidden md:block">
              <SideBar />
            </div>
            <div className="flex flex-col flex-1 relative">
              <div className="md:hidden">
                <Navbar />
              </div>

              <div className="grid grid-cols-1 w-full">{children}</div>
            </div>
          </div>
        </MatchesProvider>
        <Toaster />
      </NextAuthProvider>
    )
  }