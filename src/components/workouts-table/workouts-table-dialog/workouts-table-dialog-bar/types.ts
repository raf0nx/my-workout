import type { WorkoutsTableDialogState } from '../types'

export interface WorkoutsTableDialogBarProps {
  state: WorkoutsTableDialogState
  onClose: () => void
  onSave: () => void
}
