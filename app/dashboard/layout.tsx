
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NextAuthProvider } from "@/components/Providers";
import { MatchesProvider } from "@/components/matchesContext";
import { Toaster } from "react-hot-toast";
import { SideBar } from "@/components/SideBar";

export default function DashboardLayout({
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

              <div className=" ">{children}</div>
            </div>
          </div>
        </MatchesProvider>
        <Toaster />
      </NextAuthProvider>
    )
  }