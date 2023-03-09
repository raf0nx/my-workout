import type { ChangeEvent } from '@suid/types'

import type { Workout } from '~/components/workouts-table/types'
import type { WorkoutsTableDialogState } from '~/components/workouts-table/workouts-table-dialog/types'

export interface WorkoutsTableDialogContentProps {
  onInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => void
  workoutDetails: Workout
  state: WorkoutsTableDialogState
}
