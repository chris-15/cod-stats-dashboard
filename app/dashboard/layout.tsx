import Navbar from "@/components/Navbar";
import { NextAuthProvider } from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import { SideBar } from "@/components/SideBar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>

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
      <Toaster />
    </NextAuthProvider>
  );
}
