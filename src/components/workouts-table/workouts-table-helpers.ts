import { QUARTER_HOUR } from '~/constants'
import { isTestMode } from '~/utils/utils'
import { SnackbarSeverity } from '~/components/snackbar/types'

/* c8 ignore next */
export const getWorkoutsQueryStaleTime = () => (isTestMode() ? 0 : QUARTER_HOUR)

export const getGetWorkoutsErrorSnackbarProps = () => ({
  title: 'Error',
  description: 'Failed to fetch workouts. Please try again.',
  dissmissable: true,
  severity: SnackbarSeverity.ERROR,
})
