import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@suid/material'

import Card from '~/components/card'

export default function WorkoutsTable() {
  return (
    <Card>
      <TableContainer sx={{ borderRadius: 1 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Workout&nbsp;name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Workout&nbsp;volume</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Week</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Card>
  )
}
