import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'

import { SnackbarSeverity } from '~/components/snackbar/types'
import type {
  Workout,
  WorkoutDateFormat,
} from '~/components/workouts-table/types'

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

export const getSaveWorkoutSuccessSnackbarProps = () => ({
  title: 'Success',
  description: 'Workout saved successfully.',
  dissmissable: true,
})

export const getSaveWorkoutErrorSnackbarProps = () => ({
  title: 'Error',
  description: 'Something went wrong. Please try again later.',
  dissmissable: true,
  severity: SnackbarSeverity.ERROR,
})
