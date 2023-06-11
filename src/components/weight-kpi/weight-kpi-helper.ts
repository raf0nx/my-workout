import { KPI_NO_VALUE_INDICATOR } from '~/constants'
import { SnackbarSeverity } from '~/components/snackbar/types'
import {
  calculatePercentageChange,
  formatPercentageChange,
} from '~/utils/utils'

import type { WeightInfo } from './weight-kpi-dialog/weight-kpi-dialog-content/types'

export const getWeightKpiValue = (weightsInfo?: WeightInfo[]) =>
  getLatestWeightValue(weightsInfo) || KPI_NO_VALUE_INDICATOR

export const getWeightKpiChangeValue = (weightsInfo?: WeightInfo[]) => {
  const currentWeight = getLatestWeightValue(weightsInfo)
  const previousWeight = getPreviousWeightValue(weightsInfo)

  if (!currentWeight) return

  if (!previousWeight) return '--'

  return formatPercentageChange(
    calculatePercentageChange(previousWeight, currentWeight)
  )
}

export const getGetUserWeightErrorSnackbarProps = () => ({
  title: 'Error',
  description: 'Failed to fetch user weight info. Please try again.',
  dismissable: true,
  severity: SnackbarSeverity.ERROR,
})

const getLatestWeightValue = (weightsInfo?: WeightInfo[]) =>
  weightsInfo?.at(0)?.weight

const getPreviousWeightValue = (weightsInfo?: WeightInfo[]) =>
  weightsInfo?.at(1)?.weight
