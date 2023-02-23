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
              <TableHeaderCell>Workout&nbsp;volume</TableHeaderCell>
              <TableHeaderCell>Time</TableHeaderCell>
              <TableHeaderCell>Week</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
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
              <TableCell>120</TableCell>
              <TableCell>01:00</TableCell>
              <TableCell>4</TableCell>
              <TableCell>01.01.2023</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
