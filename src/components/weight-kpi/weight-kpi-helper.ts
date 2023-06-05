import { KPI_NO_VALUE_INDICATOR } from '~/constants'
import {
  calculatePercentageChange,
  formatPercentageChange,
} from '~/utils/utils'

import type { WeightInfo } from './weight-kpi-dialog/weight-kpi-dialog-content/types'

export const getLatestWeightValue = (weightsInfo?: WeightInfo[]) =>
  weightsInfo?.at(0)?.weight

export const getPreviousWeightValue = (weightsInfo?: WeightInfo[]) =>
  weightsInfo?.at(1)?.weight

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
