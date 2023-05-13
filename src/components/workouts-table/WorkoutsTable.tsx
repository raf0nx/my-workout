import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@suid/material'
import { createSignal, For, Index, Show, Suspense } from 'solid-js'
import { createQuery, type CreateQueryResult } from '@tanstack/solid-query'

import { Card } from '~/components/card'
import { TableHeaderCell } from '~/components/table-header-cell'
import { getWorkouts } from '~/api/workouts'
import { WORKOUTS_DOC_ID } from '~/constants'
import { useSnackbar } from '~/contexts/snackbar'

import { WorkoutsTableDialog, WorkoutsTableToolbar } from '.'
import type { Workout } from './types'
import {
  getGetWorkoutsErrorSnackbarProps,
  getWorkoutsQueryStaleTime,
} from './workouts-table-helpers'
import { WorkoutsTableSpinner } from './workouts-table-spinner'

const WORKOUTS_TABLE_HEADERS = [
  'Workout name',
  'Description',
  'Total reps',
  'Week',
  'Date',
  'Duration (mins)',
] as const

// TODO: Improve Table accessibility (e.g. add caption)
export default function WorkoutsTable() {
  const { showSnackbar } = useSnackbar()

  const workoutsQuery: CreateQueryResult<Workout[]> = createQuery(
    () => [WORKOUTS_DOC_ID],
    getWorkouts,
    {
      staleTime: getWorkoutsQueryStaleTime(),
      onError: () => showSnackbar(getGetWorkoutsErrorSnackbarProps()),
    }
  )

  const [selectedWorkoutId, setSelectedWorkoutId] = createSignal<string | null>(
    null
  )

  const closeWorkoutDetails = () => {
    setSelectedWorkoutId(null)
  }

  return (
    <Card>
      <WorkoutsTableToolbar />
      <TableContainer
        sx={{
          borderRadius: 1,
          height: 'calc(100% - 6rem)',
          position: 'relative',
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <Index each={WORKOUTS_TABLE_HEADERS}>
                {(headerValue, i) => (
                  <TableHeaderCell align={i > 1 ? 'right' : 'left'}>
                    {headerValue()}
                  </TableHeaderCell>
                )}
              </Index>
            </TableRow>
          </TableHead>
          <TableBody>
            <Suspense fallback={<WorkoutsTableSpinner />}>
              <For each={workoutsQuery.data}>
                {workout => (
                  <>
                    <TableRow
                      hover
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        cursor: 'pointer',
                      }}
                      onClick={[setSelectedWorkoutId, workout.id]}
                      data-testid="workouts-table-row"
                    >
                      <TableCell component="th" scope="row">
                        {workout.name}
                      </TableCell>
                      <TableCell>{workout.description}</TableCell>
                      <TableCell align="right">{workout.totalReps}</TableCell>
                      <TableCell align="right">{workout.week}</TableCell>
                      <TableCell align="right">{workout.date}</TableCell>
                      <TableCell align="right">{workout.duration}</TableCell>
                    </TableRow>
                    <Show when={selectedWorkoutId() === workout.id}>
                      <WorkoutsTableDialog
                        isOpen
                        workout={JSON.parse(JSON.stringify(workout))}
                        onClose={closeWorkoutDetails}
                        state="show"
                      />
                    </Show>
                  </>
                )}
              </For>
            </Suspense>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
