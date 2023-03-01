import type { SetStoreFunction } from 'solid-js/store'

import type { Workout } from '~/components/workouts-table/types'

export interface WorkoutsTableDialogProps {
  isOpen: boolean
  onClose: () => void
  setWorkouts: SetStoreFunction<Workout[]>
}

export const workoutDetailsInitialState: Workout = {
  name: '',
  description: '',
  totalReps: '',
  week: '',
  date: '',
  duration: '',
}
