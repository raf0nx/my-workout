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
import { For, Index, Show } from 'solid-js'
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
  const isComponentInReadOnlyState = () => props.state === 'show'
  const exercises = () => Object.values(props.exercises)
  const consecutiveColumnNumbers = () =>
    getConsecutiveNumberOfColumns(getMaxColumnNumber(exercises()))

  const handleAddNewExercise = () => {
    const nextExerciseNumber = exercises().length + 1

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
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell sx={{ minWidth: '11rem' }}>
              Exercise type
            </TableHeaderCell>
            <Index each={consecutiveColumnNumbers()}>
              {columnNumber => (
                <TableHeaderCell align="right" sx={{ minWidth: '3rem' }}>
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
                  height: '4.5rem',
                }}
                hover
              >
                <TableCell component="th" scope="row">
                  <ExercisesSelect
                    selectedExercise={exercise.name}
                    name={`exercise${idx() + 1}`}
                    isReadOnly={isComponentInReadOnlyState()}
                    ariaLabel={`exercise${idx() + 1}`}
                    onChange={handleExerciseChange}
                  />
                </TableCell>
                <Index each={exercise.sets}>
                  {(set, setIdx) => (
                    <TableCell align="right" sx={{ width: '3rem' }}>
                      <TextField
                        classes={{
                          root: getInputStyle(isComponentInReadOnlyState()),
                        }}
                        variant="standard"
                        size="small"
                        type="number"
                        value={set()}
                        inputProps={{
                          style: { 'text-align': 'right' },
                          'aria-label': `exercise${idx() + 1}-set${setIdx + 1}`,
                          ...getInputProps(isComponentInReadOnlyState()),
                        }}
                        name={`exercise${idx() + 1}-set${setIdx + 1}`}
                        onChange={handleExerciseSetChange}
                      />
                    </TableCell>
                  )}
                </Index>
                <Show when={!isComponentInReadOnlyState()}>
                  <TableCell
                    sx={{
                      width: '3rem',
                      minWidth: '3rem',
                      border: 0,
                      background: '#fff',
                    }}
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
                </Show>
              </TableRow>
            )}
          </For>
          <Show when={!isComponentInReadOnlyState()}>
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
          </Show>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
