import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  useTheme,
} from '@suid/material'

import { TransitionSlideUp } from '~/utils/transition-slide-up'

import type { WeightKpiDialogProps } from './types'
import { WeightKpiDialogContent } from './weight-kpi-dialog-content'

export default function WeightKpiDialog(props: WeightKpiDialogProps) {
  const theme = useTheme()

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      fullWidth
      TransitionComponent={TransitionSlideUp}
      aria-labelledby="weight-kpi-dialog-title"
    >
      <DialogTitle
        id="weight-kpi-dialog-title"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
        }}
      >
        Your weight history
      </DialogTitle>
      <WeightKpiDialogContent weightsInfo={props.weightsInfo} />
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
