"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  LuBarChart2,
  LuCrosshair,
  LuClock,
  LuTrendingUp,
  LuChevronRight,
} from "react-icons/lu";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen ">
      <div className="container mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Elevate Your Game with{" "}
            <span className="text-[#b0ff34]">CoD Dashboard</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your personal performance tracker for Call of Duty. Analyze your
            stats, improve your gameplay, and dominate the competiton.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center bg-[#b0ff34] hover:bg-[#8ccc26] text-[#333333] font-medium py-3 px-8 rounded-lg text-lg transition duration-300 hover:underline hover:underline-offset-2"
          >
            View My Stats
            <LuChevronRight className=" ml-1"></LuChevronRight>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2"
        >
        </motion.div>
      </div>

      <section className="bg-[#2c3237] py-16">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
          >
            Why Choose CoD Dashboard?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: LuCrosshair,
                title: "Performance Tracking",
                description:
                  "Track your overall performance and see how you're improving over time.",
              },
              {
                icon: LuBarChart2,
                title: "Detailed Match Statistics",
                description:
                  "Get comprehensive stats for each of your matches, including K/D ratio, efficiency, and more.",
              },

              {
                icon: LuClock,
                title: "Real-time Updates",
                description:
                  "See your stats update in real-time after each match you play.",
              },
              {
                icon: LuTrendingUp,
                title: "Progress Visualization",
                description:
                  "View your progress through intuitive graphs and charts for easy understanding.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#343a40] p-6 rounded-lg"
              >
                <feature.icon className="w-12 h-12 mb-4 text-[#b0ff34]" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="bg-[#343a40] rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Improve Your Game?
              </h2>
              <p className="text-xl text-gray-300">
                Start tracking your Call of Duty performance today and see the
                difference it makes in your gameplay.
              </p>
            </div>
            <Link
              href="/signup"
              className="inline-flex items-center bg-[#b0ff34] hover:bg-[#8ccc26] text-[#333333] font-medium py-3 px-8 rounded-lg text-lg transition duration-300 hover:underline hover:underline-offset-2"
            >
              Sign Up Now
              <LuChevronRight className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} CoD Dashboard. All rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* 
 <main className="flex flex-col justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:4xl, md:text-5xl lg:text-6xl/none mb-4 text-white">
          Welcome to CoD Dashboard
        </h1>
        <p className="text-xl text-[#8b949e] mb-8 px-4">Your one-stop solution for tracking Call of Duty performance.</p>
        <Link href={"/dashboard"} className="btn">
          Take Me to my Dashboard
        </Link>
      </div>
      <div className="mt-12 text-center">
      <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none mb-4 text-white">Why CoD Dashboard?</h2>
        <p className="text-lg text-[#8b949e] mb-4 px-4">
          With CoD Dashboard, you can track your match statistics and analyze
          your performance to improve your gameplay.
        </p>
        <p className="text-lg text-[#8b949e] px-4">
          Join us today and take your Call of Duty skills to the next level!
        </p>
      </div>
    </main>

*/
