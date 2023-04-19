import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'

import type { Workout, WorkoutDateFormat } from '../types'

dayjs.extend(weekOfYear)

export const getWorkoutDetailsInitialState = (): Workout => ({
  name: '',
  description: '',
  totalReps: '',
  week: getCurrentWeekOfYear(),
  date: getCurrentDateInWorkoutDateFormat(),
  duration: '',
  exercises: { exercise1: { name: '', sets: [0] } },
})

export const getCurrentDateInWorkoutDateFormat = (): WorkoutDateFormat =>
  dayjs().format('DD.MM.YYYY') as WorkoutDateFormat

export const getCurrentWeekOfYear = () => dayjs().week().toString()
