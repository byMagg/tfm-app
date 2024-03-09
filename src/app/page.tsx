import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>Home</h1>
      <Link href="/profile">
        <Image
          src={'https://picsum.photos/200'}
          alt="Picture of the author"
          className="profile-pic"
          width={200}
          height={200}
        />
      </Link>
    </main>
  )
}
