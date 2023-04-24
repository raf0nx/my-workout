export interface SnackbarProps {
  title?: string
  description: string
  severity?: SnackbarSeverity
  dissmissable?: boolean
  timeout?: number
}

export type SnackbarSeverity = 'error' | 'info' | 'success' | 'warning'
