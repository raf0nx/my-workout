import type { DDMMYYYDateFormat } from '~/utils/types'

export interface WeightInfo {
  weight: number
  date: DDMMYYYDateFormat
}

export interface WeightKpiDialogContentProps {
  weightsInfo?: WeightInfo[]
}
