import { AddCircle } from '@suid/icons-material'
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@suid/material'
import type { ChangeEvent } from '@suid/types'
import { For, Index } from 'solid-js'
import { produce } from 'solid-js/store'

import { ExercisesSelect } from '~/components/exercises-select'
import type { AvailableExercises } from '~/components/exercises-select/types'
import { TableHeaderCell } from '~/components/table-header-cell'
import {
  getInputProps,
  getInputStyle,
} from '~/components/workouts-table/workouts-table-dialog/workouts-table-dialog-content/workouts-table-dialog-content-helpers'

import type {
  TargetExercise,
  TargetSet,
  WorkoutsTableDialogContentExercisesProps,
} from './types'
import {
  getConsecutiveNumberOfColumns,
  getMaxColumnNumber,
  getSetIdxFromTargetSet,
} from './workouts-table-dialog-content-exercises-helpers'

export default function WorkoutsTableDialogContentExercises(
  props: WorkoutsTableDialogContentExercisesProps
) {
  const isInputReadOnly = () => props.state === 'show'
  const exercises = () => Object.values(props.exercises)
  const consecutiveColumnNumbers = () =>
    getConsecutiveNumberOfColumns(getMaxColumnNumber(exercises()))

  const handleAddNewExercise = () => {
    const nextExerciseNumber = Object.keys(props.exercises).length + 1

    props.setWorkoutDetails(
      produce(state => {
        state.exercises[`exercise${nextExerciseNumber}`] = {
          name: '',
          sets: [0],
        }
      })
    )
  }

  const handleAddNewSet = (exerciseNumber: number) => {
    props.setWorkoutDetails(
      produce(state => {
        state.exercises[`exercise${exerciseNumber}`].sets.push(0)
      })
    )
  }

  const handleExerciseChange = (
    selectedExercise: AvailableExercises,
    targetExercise: TargetExercise
  ) => {
    props.setWorkoutDetails(
      produce(state => {
        state.exercises[targetExercise].name = selectedExercise
      })
    )
  }

  const handleExerciseSetChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => {
    const [targetExercise, targetSet] = event.target.name.split('-') as [
      TargetExercise,
      TargetSet
    ]

    props.setWorkoutDetails(
      produce(state => {
        state.exercises[targetExercise].sets[
          getSetIdxFromTargetSet(targetSet)
        ] = +value
      })
    )
  }

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
            {(exercise, idx) => (
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
                hover
              >
                <TableCell component="th" scope="row">
                  <ExercisesSelect
                    selectedExercise={exercise.name}
                    name={`exercise${idx() + 1}`}
                    ariaLabel={`exercise${idx() + 1}`}
                    onChange={handleExerciseChange}
                  />
                </TableCell>
                <Index each={exercise.sets}>
                  {(set, setIdx) => (
                    <TableCell align="right" sx={{ width: '80', pr: 0 }}>
                      <TextField
                        classes={{
                          root: getInputStyle(isInputReadOnly()),
                        }}
                        variant="standard"
                        size="small"
                        type="number"
                        value={set()}
                        inputProps={{
                          style: { 'text-align': 'right' },
                          'aria-label': `exercise${idx() + 1}-set${setIdx + 1}`,
                          ...getInputProps(isInputReadOnly()),
                        }}
                        name={`exercise${idx() + 1}-set${setIdx + 1}`}
                        onChange={handleExerciseSetChange}
                      />
                    </TableCell>
                  )}
                </Index>
                <TableCell
                  sx={{ width: '40', border: 0, background: '#fff' }}
                  align="right"
                >
                  <IconButton
                    color="secondary"
                    aria-label="add next set"
                    onClick={[handleAddNewSet, idx() + 1]}
                  >
                    <AddCircle />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </For>
          <TableRow>
            <TableCell sx={{ border: 0 }}>
              <IconButton
                color="secondary"
                aria-label="add next exercise"
                onClick={handleAddNewExercise}
              >
                <AddCircle />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
