import type { SnackbarProps } from '~/components/snackbar/types'

export interface SnackbarContextProps {
  showSnackbar: (options: SnackbarProps) => void
}
