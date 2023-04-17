import type { AvailableExercises } from '~/components/exercises-select/types'
import type { Day, Month, Year } from '~/utils/types'

import type { TargetExercise } from './workouts-table-dialog/workouts-table-dialog-content/workouts-table-dialog-content-exercises/types'

export interface Workout {
  id?: string
  name: string
  description: string
  totalReps: string
  week: string
  // TODO: UI changes/validation needed to ensure the type
  date: WorkoutDateFormat | string
  duration: string
  exercises: Exercises
}

export type Exercises = Record<TargetExercise, Exercise>

export interface Exercise {
  name: AvailableExercises | ''
  sets: number[]
}

export type WorkoutProps = Exclude<keyof Workout, 'exercises' | 'id'>
export type WorkoutDateFormat = `${Day}.${Month}.${Year}`
