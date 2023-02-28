import type { ChangeEvent } from '@suid/types'

export interface WorkoutsTableDialogContentProps {
  onInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => void
}
