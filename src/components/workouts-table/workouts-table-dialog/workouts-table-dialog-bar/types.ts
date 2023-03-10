import type { Setter } from 'solid-js'

import type { WorkoutsTableDialogState } from '../types'

export interface WorkoutsTableDialogBarProps {
  state: WorkoutsTableDialogState
  onClose: () => void
  onSave: () => void
  onStateChange: Setter<WorkoutsTableDialogState>
  onEdit: () => void
}
