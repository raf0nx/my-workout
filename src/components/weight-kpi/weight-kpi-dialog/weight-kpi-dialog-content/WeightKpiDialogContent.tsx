import { DialogContent, DialogContentText } from '@suid/material'

import { NewWeightInput } from './NewWeightInput'
import { WeightsTable } from './WeightsTable'

export default function WeightKpiDialogContent() {
  return (
    <DialogContent dividers>
      <DialogContentText sx={{ mb: 1 }}>
        Put your current weight below:
      </DialogContentText>
      <NewWeightInput />
      <WeightsTable />
    </DialogContent>
  )
}
