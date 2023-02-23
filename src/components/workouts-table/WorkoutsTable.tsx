import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@suid/material'

import Card from '~/components/card'
import TableHeaderCell from '~/components/table-header-cell'

export default function WorkoutsTable() {
  return (
    <Card>
      <TableContainer sx={{ borderRadius: 1 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Workout&nbsp;name</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell align="right">Total reps</TableHeaderCell>
              <TableHeaderCell align="right">Week</TableHeaderCell>
              <TableHeaderCell align="right">Date</TableHeaderCell>
              <TableHeaderCell align="right">Duration</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              hover
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Push Up Monday
              </TableCell>
              <TableCell>low on energy</TableCell>
              <TableCell align="right">120</TableCell>
              <TableCell align="right">4</TableCell>
              <TableCell align="right">01.01.2023</TableCell>
              <TableCell align="right">01:00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
