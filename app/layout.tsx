import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/Providers";
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
      <body className={`${inter.className}`}>
        <NextAuthProvider>
          {/* mx-auto min-h-screen bg-[#0D1117] text-white py-4 pr-4 */}

          <div className="">
            <div className="">
              <div className="">{children}</div>
            </div>
          </div>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
