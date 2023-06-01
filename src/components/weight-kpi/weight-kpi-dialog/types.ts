import type { WeightInfo } from './weight-kpi-dialog-content/types'

export interface WeightKpiDialogProps {
  isOpen: boolean
  weightInfo?: WeightInfo[]
  onClose: () => void
}
