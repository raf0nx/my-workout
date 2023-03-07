export interface Workout {
  id: string
  name: string
  description: string
  totalReps: string
  week: string
  date: string
  duration: string
}

export type WorkoutProps = keyof Workout
