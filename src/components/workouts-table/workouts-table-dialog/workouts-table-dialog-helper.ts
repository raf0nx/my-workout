import type { Workout } from '../types'

export const getWorkoutDetailsInitialState = (): Workout => ({
  name: '',
  description: '',
  totalReps: '',
  week: '',
  date: '',
  duration: '',
  exercises: { exercise1: { name: '', sets: [0] } },
})
