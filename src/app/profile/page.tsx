import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Profile() {
  return (
    <main>
      <h1 className="text-4xl font-bold">Profile</h1>
      <Button>Save</Button>
      <Image
        src={'https://picsum.photos/200'}
        alt="Picture of the author"
        className="profile-pic"
        width={200}
        height={200}
      />
    </main>
  )
}
