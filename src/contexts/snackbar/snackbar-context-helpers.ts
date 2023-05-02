import {
  type SnackbarProps,
  SnackbarSeverity,
} from '~/components/snackbar/types'

export const getInitialSnackbarContextProps = () => ({
  showSnackbar: () => null,
})

export const getInitialSnackbarProps = (): SnackbarProps => ({
  title: '',
  description: '',
  severity: SnackbarSeverity.SUCCESS,
  dissmissable: false,
  timeout: 5000,
})
