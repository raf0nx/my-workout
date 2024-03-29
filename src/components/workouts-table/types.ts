import type { AvailableExercises } from '~/components/exercises-select/types'
import type { DDMMYYYDateFormat } from '~/utils/types'

import type { TargetExercise } from './workouts-table-dialog/workouts-table-dialog-content/workouts-table-dialog-content-exercises/types'

export interface Workout {
  id?: string
  name: string
  description: string
  totalReps: string
  week: string
  // TODO: UI changes/validation needed to ensure the type
  date: DDMMYYYDateFormat | string
  duration: string
  exercises: Exercises
}

export type Exercises = Record<TargetExercise, Exercise>

export interface Exercise {
  name: AvailableExercises | ''
  sets: number[]
}

export type WorkoutDetailsProps = Exclude<keyof Workout, 'exercises' | 'id'>
