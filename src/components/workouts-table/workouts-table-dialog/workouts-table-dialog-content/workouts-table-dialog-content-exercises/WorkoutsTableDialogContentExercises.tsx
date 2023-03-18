import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@suid/material'
import { For, Index } from 'solid-js'

import { ExercisesSelect } from '~/components/exercises-select'
import { TableHeaderCell } from '~/components/table-header-cell'

import type { WorkoutsTableDialogContentExercisesProps } from './types'
import {
  getConsecutiveNumberOfColumns,
  getMaxColumnNumber,
} from './workouts-table-dialog-content-exercises-helpers'

export default function WorkoutsTableDialogContentExercises(
  props: WorkoutsTableDialogContentExercisesProps
) {
  const exercises = () => Object.values(props.exercises)
  const consecutiveColumnNumbers = () =>
    getConsecutiveNumberOfColumns(getMaxColumnNumber(exercises()))

  return (
    <TableContainer sx={{ borderRadius: 1 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Exercise type</TableHeaderCell>
            <Index each={consecutiveColumnNumbers()}>
              {columnNumber => (
                <TableHeaderCell align="right">
                  Set {columnNumber()}
                </TableHeaderCell>
              )}
            </Index>
          </TableRow>
        </TableHead>
        <TableBody>
          <For each={exercises()}>
            {exercise => (
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
                hover
              >
                <TableCell component="th" scope="row">
                  <ExercisesSelect selectedExercise={exercise.name} />
                </TableCell>
                <Index each={exercise.sets}>
                  {set => (
                    <TableCell align="right" sx={{ width: '80', pr: 0 }}>
                      <TextField
                        variant="standard"
                        size="small"
                        type="number"
                        value={set()}
                        inputProps={{
                          style: { 'text-align': 'right' },
                        }}
                      />
                    </TableCell>
                  )}
                </Index>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
