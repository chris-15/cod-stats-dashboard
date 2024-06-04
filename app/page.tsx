import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:4xl, md:text-5xl lg:text-6xl/none mb-4 text-white">
          Welcome to CoD Dashboard
        </h1>
        <p className="text-xl text-[#8b949e] mb-8">Your one-stop solution for tracking Call of Duty performance.</p>
        <Link href={"/dashboard"} className="btn">
          Take Me to my Dashboard
        </Link>
      </div>
      <div className="mt-12 text-center">
      <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none mb-4 text-white">Why CoD Dashboard?</h2>
        <p className="text-lg text-[#8b949e] mb-4">
          With CoD Dashboard, you can track your match statistics and analyze
          your performance to improve your gameplay.
        </p>
        <p className="text-lg text-[#8b949e]">
          Join us today and take your Call of Duty skills to the next level!
        </p>
      </div>
    </main>
  );
}
