import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@suid/material'
import { For } from 'solid-js'

import Card from '~/components/card'
import TableHeaderCell from '~/components/table-header-cell'
import { workouts } from '~/mockedData'

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
            <For each={workouts}>
              {workout => (
                <TableRow
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {workout.name}
                  </TableCell>
                  <TableCell>{workout.description}</TableCell>
                  <TableCell align="right">{workout.totalReps}</TableCell>
                  <TableCell align="right">{workout.week}</TableCell>
                  <TableCell align="right">{workout.date}</TableCell>
                  <TableCell align="right">{workout.duration}</TableCell>
                </TableRow>
              )}
            </For>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
