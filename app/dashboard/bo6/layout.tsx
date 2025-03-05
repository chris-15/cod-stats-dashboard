import Navbar from "@/components/Navbar";
import { NextAuthProvider } from "@/components/Providers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import { MobileNav } from "@/components/MobileNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NewSidebar } from "@/components/NewSidebar";


export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
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
          <div className="px-4 sm:px-6 md:px-8 py-6 md:py-8">{children}</div>
        </div>

        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 ">
          <MobileNav game="bo6" />
        </div>
      </SidebarProvider>
    </NextAuthProvider>
  );
}
