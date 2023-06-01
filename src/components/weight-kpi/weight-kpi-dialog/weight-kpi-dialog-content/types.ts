export interface WeightInfo {
  weight: 'string'
  date: 'string'
}

export interface WeightKpiDialogContentProps {
  weightInfo?: WeightInfo[]
}

export interface WeightsTableProps extends WeightKpiDialogContentProps {}
