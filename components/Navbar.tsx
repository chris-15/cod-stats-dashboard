import Link from "next/link";

function Navbar() {
  return (
    <div className="flex justify-between pb-4 border-b mb-4">
      <div>
        <Link href={"/"}>
          <h1 className="text-4xl font-bold tracking-tighter">Ranked Stats</h1>
        </Link>
        <p className="text-sm">Your Call of Duty Ranked Stats Hub </p>
      </div>

      <div className="flex items-center">
        <Link href={"/sign-in"} className="btn">
          Sign In
        </Link>
      </div>
    </div>
  );
}
export default Navbar;
