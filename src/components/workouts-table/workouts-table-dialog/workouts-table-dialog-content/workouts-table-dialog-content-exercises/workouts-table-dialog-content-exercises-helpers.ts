import type { Exercise } from '~/components/workouts-table/types'

export const getNumberOfSetsColumns = (exercises: Exercise[]) =>
  Array.from({ length: getMaxSetsColumnsNumber(exercises) }, (_, i) => i + 1)

const getMaxSetsColumnsNumber = (exercises: Exercise[]) =>
  exercises.reduce(
    (currMax, exercise) => Math.max(currMax, exercise.sets.length),
    0
  )
