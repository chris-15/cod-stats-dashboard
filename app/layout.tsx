import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NextAuthProvider } from "@/components/Providers";
import { MatchesProvider } from "@/components/matchesContext";
import { Toaster } from "react-hot-toast";
import { SideBar } from "@/components/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoD Dashboard",
  description: "Your Call of Duty Ranked Stats Hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {/* mx-auto min-h-screen bg-[#0D1117] text-white py-4 pr-4 */}

          <MatchesProvider>
            <div className="">
              <div className="">
                <div className="">{children}</div>
              </div>
            </div>
          </MatchesProvider>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
