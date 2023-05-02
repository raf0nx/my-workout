export interface SnackbarProps {
  title?: string
  description: string
  severity?: SnackbarSeverity
  dissmissable?: boolean
  timeout?: number
  onClose?: () => void
}

export type SnackbarSeverity = 'error' | 'info' | 'success' | 'warning'
