import { TrafficCrash } from '../columns'
import { useEffect, useState } from 'react'

async function getCrashById({
  trafficCrashId,
}: {
  trafficCrashId: string
}): Promise<TrafficCrash> {
  console.log('HOLA', trafficCrashId)

  const response = await fetch('http://localhost:4321/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query GetCrashes {
        getCrashById(
            crashId: "${trafficCrashId}"
        ) {
            CRASH_RECORD_ID
            CRASH_DATE_EST_I
            CRASH_DATE
            POSTED_SPEED_LIMIT
            TRAFFIC_CONTROL_DEVICE
            DEVICE_CONDITION
            WEATHER_CONDITION
            LIGHTING_CONDITION
            FIRST_CRASH_TYPE
            TRAFFICWAY_TYPE
            LANE_CNT
            ALIGNMENT
            ROADWAY_SURFACE_COND
            ROAD_DEFECT
            REPORT_TYPE
            CRASH_TYPE
            INTERSECTION_RELATED_I
            NOT_RIGHT_OF_WAY_I
            HIT_AND_RUN_I
            DAMAGE
            DATE_POLICE_NOTIFIED
            PRIM_CONTRIBUTORY_CAUSE
            SEC_CONTRIBUTORY_CAUSE
            STREET_NO
            STREET_DIRECTION
            STREET_NAME
            BEAT_OF_OCCURRENCE
            PHOTOS_TAKEN_I
            STATEMENTS_TAKEN_I
            DOORING_I
            WORK_ZONE_I
            WORK_ZONE_TYPE
            WORKERS_PRESENT_I
            NUM_UNITS
            MOST_SEVERE_INJURY
            INJURIES_TOTAL
            INJURIES_FATAL
            INJURIES_INCAPACITATING
            INJURIES_NON_INCAPACITATING
            INJURIES_REPORTED_NOT_EVIDENT
            INJURIES_NO_INDICATION
            INJURIES_UNKNOWN
            CRASH_HOUR
            CRASH_DAY_OF_WEEK
            CRASH_MONTH
            LATITUDE
            LONGITUDE
            LOCATION
        }
    }
        `,
    }),
  })

  if (!response.ok) throw new Error('Failed to fetch data')

  const { data } = await response.json()
  console.log(data.getCrashById)
  return data.getCrashById
}

export default async function TrafficCrash({
  params: { id },
}: {
  params: { id: string }
}) {
  const trafficCrash = await getCrashById({ trafficCrashId: id })

  return (
    <div className="container mx-auto py-10">
      <h1>Traffic Crash {id}</h1>
      <h1>{trafficCrash?.CRASH_RECORD_ID}</h1>
      <p>{trafficCrash?.LOCATION}</p>
      <p>{trafficCrash?.WEATHER_CONDITION}</p>
      <p>{trafficCrash?.CRASH_DATE}</p>
    </div>
  )
}
