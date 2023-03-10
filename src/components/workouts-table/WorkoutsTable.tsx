import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@suid/material'
import { createSignal, For, Index, Show } from 'solid-js'
import { createStore } from 'solid-js/store'

import { Card } from '~/components/card'
import { TableHeaderCell } from '~/components/table-header-cell'
import { workouts as mockedWorkouts } from '~/mockedData'

import { WorkoutsTableDialog, WorkoutsTableToolbar } from '.'

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
  const [workouts, setWorkouts] = createStore(mockedWorkouts)
  const [selectedWorkoutId, setSelectedWorkoutId] = createSignal<string | null>(
    null
  )

  const closeWorkoutDetails = () => {
    setSelectedWorkoutId(null)
  }

  return (
    <Card>
      <WorkoutsTableToolbar setWorkouts={setWorkouts} />
      <TableContainer sx={{ borderRadius: 1 }}>
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
            <For each={workouts}>
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
                      workout={{ ...workout }}
                      onClose={closeWorkoutDetails}
                      setWorkouts={setWorkouts}
                      state="show"
                    />
                  </Show>
                </>
              )}
            </For>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
