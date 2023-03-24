import type { SetStoreFunction } from 'solid-js/store'

import type { Workout } from '~/components/workouts-table/types'

export type WorkoutsTableDialogState = 'create' | 'show' | 'edit'

export interface WorkoutsTableDialogProps {
  isOpen: boolean
  workout?: Workout
  state: WorkoutsTableDialogState
  onClose: () => void
  setWorkouts: SetStoreFunction<Workout[]>
}

export const workoutDetailsInitialState: Workout = {
  id: '',
  name: '',
  description: '',
  totalReps: '',
  week: '',
  date: '',
  duration: '',
  exercises: { exercise1: { name: '', sets: [0] } },
}
