import type { WeightInfo } from './weight-kpi-dialog-content/types'

export interface WeightKpiDialogProps {
  isOpen: boolean
  weightsInfo?: WeightInfo[]
  onClose: () => void
}
