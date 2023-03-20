import type { Exercise } from '~/components/workouts-table/types'
import { removeTrailingNonDigits } from '~/utils/utils'

export const getConsecutiveNumberOfColumns = (maxColumnNumber: number) =>
  Array.from({ length: maxColumnNumber }, (_, i) => i + 1)

export const getMaxColumnNumber = (exercises: Exercise[]) =>
  exercises.reduce(
    (currMax, exercise) => Math.max(currMax, exercise.sets.length),
    0
  )

export const getSetIdxFromTargetSet = (targetSet: string) =>
  +removeTrailingNonDigits(targetSet) - 1
