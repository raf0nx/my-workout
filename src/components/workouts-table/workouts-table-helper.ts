import { QUARTER_HOUR } from '~/constants'
import { isTestMode } from '~/utils/utils'

/* c8 ignore next */
export const getWorkoutsQueryStaleTime = () => (isTestMode() ? 0 : QUARTER_HOUR)
