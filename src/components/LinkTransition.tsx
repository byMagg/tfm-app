'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { flushSync } from 'react-dom'

export default function LinkTransition(props: any) {
  const router = useRouter()

  const handleTransition = () => {
    // @ts-ignore
    if (document.startViewTransition) {
      // @ts-ignore
      document.startViewTransition(() => {
        flushSync(() => {
          router.push(props.href)
        })
      })
    }
  }

  return (
    <Link href={props.href} onClick={handleTransition} {...props}>
      {props.children}
    </Link>
  )
}
