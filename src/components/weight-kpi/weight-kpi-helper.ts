import { KPI_NO_VALUE_INDICATOR } from '~/constants'

import type { WeightInfo } from './weight-kpi-dialog/weight-kpi-dialog-content/types'

export const getLatestWeightValue = (weightsInfo?: WeightInfo[]) =>
  weightsInfo?.at(0)?.weight

export const getWeightKpiValue = (weightsInfo?: WeightInfo[]) =>
  getLatestWeightValue(weightsInfo) || KPI_NO_VALUE_INDICATOR
