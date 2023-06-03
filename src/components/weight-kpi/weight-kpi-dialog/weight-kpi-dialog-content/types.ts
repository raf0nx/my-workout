import type { DDMMYYYDateFormat } from '~/utils/types'

export interface WeightInfo {
  weight: string
  date: DDMMYYYDateFormat
}

export interface WeightKpiDialogContentProps {
  weightsInfo?: WeightInfo[]
}

export interface WeightsTableProps extends WeightKpiDialogContentProps {}
