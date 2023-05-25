import { Grid } from '@suid/material'
import { createQuery, type CreateQueryResult } from '@tanstack/solid-query'

import { getWorkouts } from '~/api/workouts'
import { TotalWorkoutsKpi } from '~/components/total-workouts-kpi'
import type { Workout } from '~/components/workouts-table/types'
import {
  getGetWorkoutsErrorSnackbarProps,
  getWorkoutsQueryStaleTime,
} from '~/components/workouts-table/workouts-table-helpers'
import { WORKOUTS_DOC_ID } from '~/constants'
import { useSnackbar } from '~/contexts/snackbar'

export default function Dashboard() {
  const { showSnackbar } = useSnackbar()

  const workoutsQuery: CreateQueryResult<Workout[]> = createQuery(
    () => [WORKOUTS_DOC_ID],
    getWorkouts,
    {
      staleTime: getWorkoutsQueryStaleTime(),
      onError: () => showSnackbar(getGetWorkoutsErrorSnackbarProps()),
    }
  )

  const queryData = () => workoutsQuery.data

  const totalWorkoutsAmount = () => queryData()?.length || 0

  return (
    <main>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <TotalWorkoutsKpi totalWorkoutsAmount={totalWorkoutsAmount()} />
        </Grid>
      </Grid>
    </main>
  )
}
