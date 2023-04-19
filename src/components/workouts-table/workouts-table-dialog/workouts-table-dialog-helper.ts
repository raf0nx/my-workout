import dayjs from 'dayjs'
import type { Workout, WorkoutDateFormat } from '../types'

export const getWorkoutDetailsInitialState = (): Workout => ({
  name: '',
  description: '',
  totalReps: '',
  week: '',
  date: getCurrentDateInWorkoutDateFormat(),
  duration: '',
  exercises: { exercise1: { name: '', sets: [0] } },
})

export const getCurrentDateInWorkoutDateFormat = (): WorkoutDateFormat =>
  dayjs().format('DD.MM.YYYY') as WorkoutDateFormat
