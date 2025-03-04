import Navbar from "@/components/Navbar";
import { NextAuthProvider } from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import { SideBar } from "@/components/SideBar";
import { MobileNav } from "@/components/MobileNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NewSidebar } from "@/components/NewSidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      {/* <SidebarProvider> */}

     <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <div className="hidden md:block">
            <SideBar game="bo6" />
          </div>
          {/* <NewSidebar game="bo6"/> */}
          <div className="flex flex-col flex-1">
            <div className="md:hidden">
              <Navbar game="bo6" />
            </div>
            <div className="flex-1 pb-16 sm:pb-0">{children}</div>
          </div>
        </div>
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 ">
          <MobileNav game="bo6" />
        </div>
      </div>
      <Toaster />
      {/* </SidebarProvider> */}
    </NextAuthProvider>
  );
}
