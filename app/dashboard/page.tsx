import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LuChevronRight, LuStar } from "react-icons/lu";

async function ChooseDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <main className="flex flex-col min-h-screen">
      <div className="container mx-auto px-6 py-16 text-center">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Choose Your <span className="text-[#ff9900]">Dashboard</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
          Track live stats in the Black Ops 6 or view past data in the legacy Modern Warfare 3 dashboard.
          </p>
        </div>

        <div className="grid gap-8 mt-12 justify-center">
          {/* 1st div */}
          <div className="">
            <div className="block group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ff9900] to-[#ff5500] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#343a40] p-8 rounded-lg transition-all duration-300 hover:bg-[#3a4147] group-hover:shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#ff9900] text-black font-bold py-1 px-4 rounded-bl-lg">
                  <LuStar className="inline-block mr-1" />
                  Featured
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-4 text-[#ff9900]">
                    Black Ops 6
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    Track and analyze your BO6 performance.
                  </p>
                  <Link
                    href="/dashboard/bo6"
                    className="inline-flex items-center bg-[#ff9900] hover:bg-[#ff5500] text-black font-bold py-4 px-8 rounded-lg text-xl transition duration-300 hover:shadow-lg"
                  >
                    View My BO6 Stats
                    <LuChevronRight className="ml-2 text-2xl" />
                  </Link>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
              </div>
            </div>
          </div>

          {/* 2nd div */}
          <div>
            <div className="block group">
              <div className="bg-[#343a40] p-6 rounded-lg transition-all duration-300 hover:bg-[#3a4147] group-hover:shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-2 text-[#b0ff34]">
                    Modern Warfare 3
                  </h3>
                  <p className="text-gray-300 mb-4">
                    View your legacy MW3 statistics.
                  </p>
                  <Link
                    href="/dashboard/mw3"
                    className="inline-flex items-center bg-[#b0ff34] hover:bg-[#8ccc26] text-black font-medium py-3 px-8 rounded-lg text-lg transition duration-300 hover:shadow-md"
                  >
                    View My MW3 Stats
                    <LuChevronRight className="ml-1" />
                  </Link>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default ChooseDashboard;
