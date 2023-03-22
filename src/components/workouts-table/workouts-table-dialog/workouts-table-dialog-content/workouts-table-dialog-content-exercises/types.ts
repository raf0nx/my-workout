import type { SetStoreFunction } from 'solid-js/store'

import type { Exercises, Workout } from '~/components/workouts-table/types'
import type { WorkoutsTableDialogState } from '~/components/workouts-table/workouts-table-dialog/types'

export interface WorkoutsTableDialogContentExercisesProps {
  exercises: Exercises
  state: WorkoutsTableDialogState
  setWorkoutDetails: SetStoreFunction<Workout>
}

export type TargetExercise = `exercise${number}`
export type TargetSet = `set${number}`
