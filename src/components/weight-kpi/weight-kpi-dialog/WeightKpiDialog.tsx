import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from '@suid/material'
import { For, createSignal } from 'solid-js'
import type { ChangeEvent } from '@suid/types'

import { TableHeaderCell } from '~/components/table-header-cell'
import { weightsInfo } from '~/mocked-data'
import { TransitionSlideUp } from '~/utils/transition-slide-up'

import type { WeightKpiDialogProps } from './types'

export default function WeightKpiDialog(props: WeightKpiDialogProps) {
  const theme = useTheme()

  const [newWeight, setNewWeight] = createSignal('')

  const handleInputChange = (
    _: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => {
    setNewWeight(value)
  }

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
      <DialogContent dividers>
        <DialogContentText sx={{ mb: 1 }}>
          Put your current weight below:
        </DialogContentText>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <TextField
            label="New weight"
            name="newWeight"
            type="number"
            size="small"
            variant="filled"
            placeholder="84"
            autoFocus
            inputProps={{ step: 0.1 }}
            InputProps={{
              endAdornment: (
                <Typography variant="body2" sx={{ ml: 1, mt: 2 }}>
                  kg
                </Typography>
              ),
            }}
            onChange={handleInputChange}
            value={newWeight()}
          />
          <Button color="secondary" variant="contained">
            Add
          </Button>
        </Box>
        <TableContainer
          sx={{ mt: 4, borderRadius: 1, maxHeight: 'calc(100vh - 326.5px)' }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Weight</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <For each={weightsInfo}>
                {weightInfo => (
                  <>
                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {weightInfo.weight}
                      </TableCell>
                      <TableCell>{weightInfo.date}</TableCell>
                    </TableRow>
                  </>
                )}
              </For>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
