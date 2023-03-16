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
  name: string
  sets: number[]
}

export type WorkoutProps = keyof Workout
