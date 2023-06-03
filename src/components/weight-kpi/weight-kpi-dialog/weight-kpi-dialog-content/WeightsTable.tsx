import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@suid/material'
import { For } from 'solid-js'

import { TableHeaderCell } from '~/components/table-header-cell'

import type { WeightsTableProps } from './types'

export function WeightsTable(props: WeightsTableProps) {
  return (
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
          <For each={props.weightsInfo}>
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
  )
}
