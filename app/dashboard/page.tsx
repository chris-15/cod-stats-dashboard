import Link from "next/link"

function Dashboard() {
  return (
    <div>
        <Link href={"/add-stats"} className="btn">
          Add Stats
        </Link>
    </div>
  )
}
export default Dashboard