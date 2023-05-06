import {
  type SnackbarProps,
  SnackbarSeverity,
} from '~/components/snackbar/types'

/* c8 ignore start */
export const getInitialSnackbarContextProps = () => ({
  showSnackbar: () => null,
})
/* c8 ignore end */

export const getInitialSnackbarProps = (): SnackbarProps => ({
  title: '',
  description: '',
  severity: SnackbarSeverity.SUCCESS,
  dissmissable: false,
  timeout: 5000,
})
