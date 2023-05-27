import { SportsGymnastics } from '@suid/icons-material'
import { useTheme } from '@suid/material'

import { Kpi } from '~/components/kpi'

import { getTotalWorkoutsAmount } from './total-workouts-kpi-helpers'
import type { TotalWorkoutsKpiProps } from './types'

export default function TotalWorkoutsKpi(props: TotalWorkoutsKpiProps) {
  const theme = useTheme()

  const totalWorkoutsAmount = () =>
    getTotalWorkoutsAmount(props.workoutsQueryData)

  return (
    <Kpi
      value={totalWorkoutsAmount()}
      description="Total Workouts"
      color={theme.palette.secondary.main}
      icon={SportsGymnastics}
    />
  )
}
