import type { Workout } from '../workouts-table-types'

export interface WorkoutsTableDialogProps {
  isOpen: boolean
  onClose: () => void
}

export const workoutDetailsInitialState: Workout = {
  name: '',
  description: '',
  totalReps: '',
  week: '',
  date: '',
  duration: '',
}
