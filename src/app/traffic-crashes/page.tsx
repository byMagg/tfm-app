import Image from 'next/image'
import { TrafficCrash, columns } from './columns'
import { DataTable } from './data-table'
import LinkTransition from '@/components/LinkTransition'

async function getData(): Promise<TrafficCrash[]> {
  const response = await fetch('http://localhost:4321/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
          query GetCrashes{
            getCrashes(limit: 10) {
              CRASH_RECORD_ID
              LOCATION
              WEATHER_CONDITION
              CRASH_DATE
            }
          }
        `,
    }),
  })

  if (!response.ok) throw new Error('Failed to fetch data')

  const { data } = await response.json()
  return data.getCrashes
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

      {data && <DataTable columns={columns} data={data} />}
    </div>
  )
}
