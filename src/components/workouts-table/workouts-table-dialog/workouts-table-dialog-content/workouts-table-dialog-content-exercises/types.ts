import type { SetStoreFunction } from 'solid-js/store'

import type { Exercises, Workout } from '~/components/workouts-table/types'

export interface WorkoutsTableDialogContentExercisesProps {
  exercises: Exercises
  setWorkoutDetails: SetStoreFunction<Workout>
}

export type TargetExercise = `exercise${number}`
export type TargetSet = `set${number}`
