import type { ChangeEvent } from '@suid/types'
import type { SetStoreFunction } from 'solid-js/store'

import type { Workout } from '~/components/workouts-table/types'
import type { WorkoutsTableDialogState } from '~/components/workouts-table/workouts-table-dialog/types'

export interface WorkoutsTableDialogContentProps {
  onInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => void
  setWorkoutDetails: SetStoreFunction<Workout>
  workoutDetails: Workout
  state: WorkoutsTableDialogState
}
