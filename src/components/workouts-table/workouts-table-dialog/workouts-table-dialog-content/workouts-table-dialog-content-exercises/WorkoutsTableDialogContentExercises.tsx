import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@suid/material'

import { TableHeaderCell } from '~/components/table-header-cell'

export default function WorkoutsTableDialogContentExercises() {
  return (
    <TableContainer sx={{ borderRadius: 1 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Exercise type</TableHeaderCell>
            <TableHeaderCell align="right">Set 1</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
            }}
            hover
          >
            <TableCell component="th" scope="row">
              <FormControl
                variant="standard"
                size="small"
                sx={{ width: '100%' }}
              >
                <Select id="exercise-1" value="" displayEmpty>
                  <MenuItem value="">
                    <em>Select&nbsp;exercise</em>
                  </MenuItem>
                  <MenuItem value={1}>Workout 1</MenuItem>
                  <MenuItem value={2}>Workout 2</MenuItem>
                  <MenuItem value={3}>Workout 3</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
            <TableCell align="right" sx={{ width: '80', pr: 0 }}>
              <TextField
                variant="standard"
                size="small"
                type="number"
                inputProps={{
                  style: { 'text-align': 'right' },
                }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
