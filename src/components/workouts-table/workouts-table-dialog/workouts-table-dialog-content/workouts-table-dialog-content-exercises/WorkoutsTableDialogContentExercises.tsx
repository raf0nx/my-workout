import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@suid/material'
import { For, Index } from 'solid-js'

import { TableHeaderCell } from '~/components/table-header-cell'

import type { WorkoutsTableDialogContentExercisesProps } from './types'
import { getNumberOfSetsColumns } from './workouts-table-dialog-content-exercises-helpers'

export default function WorkoutsTableDialogContentExercises(
  props: WorkoutsTableDialogContentExercisesProps
) {
  const exercises = () => Object.values(props.exercises)
  const numOfSetsColumns = () => getNumberOfSetsColumns(exercises())

  return (
    <TableContainer sx={{ borderRadius: 1 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Exercise type</TableHeaderCell>
            <Index each={numOfSetsColumns()}>
              {setNumber => (
                <TableHeaderCell align="right">
                  Set {setNumber()}
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
                  <FormControl
                    variant="standard"
                    size="small"
                    sx={{ width: '100%' }}
                  >
                    <Select id="exercise-1" value={exercise.name} displayEmpty>
                      <MenuItem value="">
                        <em>Select&nbsp;exercise</em>
                      </MenuItem>
                      <MenuItem value={exercise.name}>{exercise.name}</MenuItem>
                    </Select>
                  </FormControl>
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
