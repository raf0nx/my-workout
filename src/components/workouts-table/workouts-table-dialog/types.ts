import type { SetStoreFunction } from 'solid-js/store'

import type { Workout } from '~/components/workouts-table/types'

export type WorkoutsTableDialogState = 'create' | 'show'

export interface WorkoutsTableDialogProps {
  isOpen: boolean
  workout?: Workout
  state: WorkoutsTableDialogState
  onClose: () => void
  setWorkouts: SetStoreFunction<Workout[]>
}

export const workoutDetailsInitialState: Workout = {
  id: Date.now().toString(),
  name: '',
  description: '',
  totalReps: '',
  week: '',
  date: '',
  duration: '',
}
