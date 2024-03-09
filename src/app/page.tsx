'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { flushSync } from 'react-dom'

export default function Home() {
  const [listado, setListado] = useState(['HOLA'])

  const handleViewTransition = () => {
    // @ts-ignore
    document.startViewTransition(() => {
      flushSync(() => {
        setListado([...listado, 'CHAU'])
      })
    })
  }

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

      <Button onClick={handleViewTransition}>Añadir elemento</Button>

      <section className="grid grid-cols-6">
        {listado.map((item, index) => (
          <div className="bg-gray-200 p-4 m-4 rounded-md" key={index}>
            {item}
          </div>
        ))}
      </section>
    </main>
  )
}
