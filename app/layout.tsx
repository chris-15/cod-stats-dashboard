import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NextAuthProvider } from "@/components/Providers";
import { MatchesProvider } from "@/components/matchesContext";
import { Toaster } from "react-hot-toast";

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
          <div className="mx-auto min-h-screen flex flex-col bg-[#0D1117] text-white p-4">
            <nav className="">
              <Navbar />
            </nav>
            <MatchesProvider>
              <div className="flex-auto">{children}</div>
              <Footer />
            </MatchesProvider>
          </div>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
