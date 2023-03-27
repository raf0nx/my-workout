import type { Workout } from '~/components/workouts-table/types'

export type WorkoutsTableDialogState = 'create' | 'show' | 'edit'

export interface WorkoutsTableDialogProps {
  isOpen: boolean
  workout?: Workout
  state: WorkoutsTableDialogState
  onClose: () => void
}

export const workoutDetailsInitialState: Workout = {
  name: '',
  description: '',
  totalReps: '',
  week: '',
  date: '',
  duration: '',
  exercises: { exercise1: { name: '', sets: [0] } },
}
