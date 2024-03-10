'use client'

import { TrafficCrash } from '@/constants/types'
import { ColumnDef } from '@tanstack/react-table'

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
