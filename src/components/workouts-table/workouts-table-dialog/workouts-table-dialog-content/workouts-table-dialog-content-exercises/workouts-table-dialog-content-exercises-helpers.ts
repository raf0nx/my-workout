import type { Exercise } from '~/components/workouts-table/types'

export const getConsecutiveNumberOfColumns = (maxColumnNumber: number) =>
  Array.from({ length: maxColumnNumber }, (_, i) => i + 1)

export const getMaxColumnNumber = (exercises: Exercise[]) =>
  exercises.reduce(
    (currMax, exercise) => Math.max(currMax, exercise.sets.length),
    0
  )
