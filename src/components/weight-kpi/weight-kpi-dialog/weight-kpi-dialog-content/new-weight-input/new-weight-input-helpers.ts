import { SnackbarSeverity } from '~/components/snackbar/types'

export const getAddNewUserWeightSuccessSnackbarProps = () => ({
  title: 'Success',
  description: 'Your weight has been saved successfully',
  dissmissable: true,
})

export const getAddNewUserWeightErrorSnackbarProps = () => ({
  title: 'Error',
  description:
    'Something went wrong while trying to save your weight. Please try again.',
  dissmissable: true,
  severity: SnackbarSeverity.ERROR,
})
