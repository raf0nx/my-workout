import type { SnackbarProps } from '~/components/snackbar/types'

export const getInitialSnackbarContextProps = () => ({
  showSnackbar: () => null,
})

export const getInitialSnackbarProps = (): SnackbarProps => ({
  title: '',
  description: '',
  severity: 'success',
  dissmissable: false,
  timeout: 5000,
})
