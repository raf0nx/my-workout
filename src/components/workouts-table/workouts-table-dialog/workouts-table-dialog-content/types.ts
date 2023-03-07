import type { ChangeEvent } from '@suid/types'

import type { WorkoutsTableDialogState } from '../types'

export interface WorkoutsTableDialogContentProps {
  onInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => void
  state: WorkoutsTableDialogState
}
