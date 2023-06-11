import { Grid } from '@suid/material'
import { createQuery, type CreateQueryResult } from '@tanstack/solid-query'

import { getUserWeight } from '~/api/user-data'
import { getWorkouts } from '~/api/workouts'
import { TotalWorkoutsKpi } from '~/components/total-workouts-kpi'
import { WeightKpi } from '~/components/weight-kpi'
import { getGetUserWeightErrorSnackbarProps } from '~/components/weight-kpi/weight-kpi-helper'
import type { Workout } from '~/components/workouts-table/types'
import { getGetWorkoutsErrorSnackbarProps } from '~/components/workouts-table/workouts-table-helpers'
import { USER_DATA_WEIGHT_QUERY_KEY, WORKOUTS_COLLECTION_ID } from '~/constants'
import { useSnackbar } from '~/contexts/snackbar'
import { getQueryStaleTime } from '~/utils/utils'

export default function Dashboard() {
  const { showSnackbar } = useSnackbar()

  const workoutsQuery: CreateQueryResult<Workout[]> = createQuery(
    () => [WORKOUTS_COLLECTION_ID],
    getWorkouts,
    {
      staleTime: getQueryStaleTime(),
      onError: () => showSnackbar(getGetWorkoutsErrorSnackbarProps()),
    }
  )

  const userWeightQuery = createQuery(
    () => [USER_DATA_WEIGHT_QUERY_KEY],
    getUserWeight,
    {
      staleTime: getQueryStaleTime(),
      onError: () => showSnackbar(getGetUserWeightErrorSnackbarProps()),
    }
  )

  const workoutsQueryData = () => workoutsQuery.data

  const userWeightQueryData = () => userWeightQuery.data

  return (
    <main>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <TotalWorkoutsKpi workoutsQueryData={workoutsQueryData()} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <WeightKpi weightsInfo={userWeightQueryData()} />
        </Grid>
      </Grid>
    </main>
  )
}
