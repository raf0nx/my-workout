import { QUARTER_HOUR } from '~/constants'
import { isTestMode } from '~/utils/utils'

export const getWorkoutsQueryStaleTime = () => (isTestMode() ? 0 : QUARTER_HOUR)
