import { SportsGymnastics } from '@suid/icons-material'
import { Box, Grid, Typography, useTheme } from '@suid/material'
import { createQuery, type CreateQueryResult } from '@tanstack/solid-query'

import { getWorkouts } from '~/api/workouts'
import { Card } from '~/components/card'
import type { Workout } from '~/components/workouts-table/types'
import {
  getGetWorkoutsErrorSnackbarProps,
  getWorkoutsQueryStaleTime,
} from '~/components/workouts-table/workouts-table-helpers'
import { WORKOUTS_DOC_ID } from '~/constants'
import { useSnackbar } from '~/contexts/snackbar'

export default function Dashboard() {
  const { showSnackbar } = useSnackbar()
  const theme = useTheme()

  const workoutsQuery: CreateQueryResult<Workout[]> = createQuery(
    () => [WORKOUTS_DOC_ID],
    getWorkouts,
    {
      staleTime: getWorkoutsQueryStaleTime(),
      onError: () => showSnackbar(getGetWorkoutsErrorSnackbarProps()),
    }
  )

  const totalWorkoutsAmount = () => workoutsQuery.data?.length || 0

  return (
    <main>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: `${theme.palette.secondary.main}1A`,
                  borderRadius: '50%',
                  height: '4rem',
                  width: '4rem',
                }}
              >
                <SportsGymnastics
                  sx={{
                    fontSize: '2rem',
                    color: theme.palette.secondary.main,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" component="h2" fontWeight={700}>
                  {totalWorkoutsAmount()}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                  Total Workouts
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </main>
  )
}
