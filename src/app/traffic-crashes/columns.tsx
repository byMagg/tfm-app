'use client'

import { ColumnDef } from '@tanstack/react-table'

export type TrafficCrash = {
  CRASH_RECORD_ID: string
  LOCATION: string
  WEATHER_CONDITION: string
  CRASH_DATE: string
}

export const columns: ColumnDef<TrafficCrash>[] = [
  {
    accessorKey: 'CRASH_RECORD_ID',
    header: 'ID',
  },
  {
    accessorKey: 'LOCATION',
    header: 'Location',
  },
  {
    accessorKey: 'WEATHER_CONDITION',
    header: 'Weather',
  },
  {
    accessorKey: 'CRASH_DATE',
    header: 'Date',
  },
]
