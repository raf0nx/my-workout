export interface WeightInfo {
  weight: 'string'
  date: 'string'
}

export interface WeightKpiDialogContentProps {
  weightsInfo?: WeightInfo[]
}

export interface WeightsTableProps extends WeightKpiDialogContentProps {}
