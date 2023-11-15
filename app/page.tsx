import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    
    <div className="flex items-center">
        <Link href={"/dashboard"} className="btn">
          Take Me to my Dashboard
        </Link>
      </div>
  )
}
