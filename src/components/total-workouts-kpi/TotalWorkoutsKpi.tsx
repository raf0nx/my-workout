import { SportsGymnastics } from '@suid/icons-material'
import { useTheme } from '@suid/material'

import { Kpi } from '~/components/kpi'

import type { TotalWorkoutsKpiProps } from './types'

export default function TotalWorkoutsKpi(props: TotalWorkoutsKpiProps) {
  const theme = useTheme()

  return (
    <Kpi
      value={props.totalWorkoutsAmount}
      description="Total Workouts"
      color={theme.palette.secondary.main}
      icon={SportsGymnastics}
    />
  )
}
