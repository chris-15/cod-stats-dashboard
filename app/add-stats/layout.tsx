import Navbar from "@/components/Navbar";

import { NextAuthProvider } from "@/components/Providers";

import { SideBar } from "@/components/SideBar";
import { MobileNav } from "@/components/MobileNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NewSidebar } from "@/components/NewSidebar";

export default function AddStatsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
    <SidebarProvider>
      <div className="hidden md:block">
        <NewSidebar game="bo6" />
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="md:hidden">
          <Navbar game="bo6" />
        </div>
        <div className="">{children}</div>
      </div>

      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 ">
        <MobileNav game="bo6" />
      </div>

   
    </SidebarProvider>
  </NextAuthProvider>
  );
}
