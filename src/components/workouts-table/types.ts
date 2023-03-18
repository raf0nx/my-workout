import type { AvailableExercises } from '../exercises-select/types'

export interface Workout {
  id: string
  name: string
  description: string
  totalReps: string
  week: string
  date: string
  duration: string
  exercises: Exercises
}

export type Exercises = Record<string, Exercise>

export interface Exercise {
  name: AvailableExercises | ''
  sets: number[]
}

// TODO: Adjust while handling exercises creation/edition
export type WorkoutProps = Exclude<keyof Workout, 'exercises'>
