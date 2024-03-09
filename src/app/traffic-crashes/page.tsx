import Image from 'next/image'
import { Payment, columns } from './columns'
import { DataTable } from './data-table'
import LinkTransition from '@/components/LinkTransition'

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '728ed52g',
      amount: 200,
      status: 'processing',
      email: 'm@example.com',
    },
    // ...
  ]
}

export default async function TrafficCrashes() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <LinkTransition href="/">
        <Image
          src={'/favicon.ico'}
          alt="Picture of the author"
          className="profile-pic"
          width={200}
          height={200}
        />
      </LinkTransition>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
