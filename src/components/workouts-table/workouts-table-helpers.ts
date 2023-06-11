import { SnackbarSeverity } from '~/components/snackbar/types'

export const getGetWorkoutsErrorSnackbarProps = () => ({
  title: 'Error',
  description: 'Failed to fetch workouts. Please try again.',
  dismissable: true,
  severity: SnackbarSeverity.ERROR,
})
