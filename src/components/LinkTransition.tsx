'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { flushSync } from 'react-dom'

export default function LinkTransition({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) {
  const router = useRouter()

  const handleTransition = () => {
    // @ts-ignore
    if (document.startViewTransition) {
      // @ts-ignore
      document.startViewTransition(() => {
        flushSync(() => {
          console.log('Transition started')
          router.push(href)
        })
      })
    }
  }

  return (
    <Link href={href} onClick={handleTransition}>
      {children}
    </Link>
  )
}
