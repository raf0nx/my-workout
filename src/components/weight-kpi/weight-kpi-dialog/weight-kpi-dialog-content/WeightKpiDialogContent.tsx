import { DialogContent, DialogContentText } from '@suid/material'

import { NewWeightInput } from './new-weight-input'
import { WeightsTable } from './weights-table'
import type { WeightKpiDialogContentProps } from './types'

export default function WeightKpiDialogContent(
  props: WeightKpiDialogContentProps
) {
  return (
    <DialogContent dividers>
      <DialogContentText sx={{ mb: 1 }}>
        Put your current weight below:
      </DialogContentText>
      <NewWeightInput />
      <WeightsTable weightsInfo={props.weightsInfo} />
    </DialogContent>
  )
}
