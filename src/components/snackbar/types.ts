export interface SnackbarProps {
  title?: string
  description: string
  severity?: SnackbarSeverity
  dissmissable?: boolean
  timeout?: number
  onClose?: () => void
}

export enum SnackbarSeverity {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}
