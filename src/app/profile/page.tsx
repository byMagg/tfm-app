import LinkTransition from '@/components/LinkTransition'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Profile() {
  return (
    <main>
      <h1 className="text-4xl font-bold">Profile</h1>
      <LinkTransition href="/">
        <Image
          src={'/favicon.ico'}
          alt="Picture of the author"
          className="profile-pic rounded-full scale-150"
          width={200}
          height={200}
        />
      </LinkTransition>
    </main>
  )
}
