import type { Workout } from '~/components/workouts-table/types'

export const getTotalWorkoutsAmount = (workoutsQueryData?: Workout[]) =>
  workoutsQueryData?.length || 0
