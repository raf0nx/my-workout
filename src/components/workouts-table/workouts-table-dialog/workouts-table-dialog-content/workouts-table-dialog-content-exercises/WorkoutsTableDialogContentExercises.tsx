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
              <FormControl variant="filled" size="small" sx={{ width: '100%' }}>
                <InputLabel id="exercise-label-1">Exercise</InputLabel>
                <Select labelId="exercise-label-1" id="exercise-1" value={20}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
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
