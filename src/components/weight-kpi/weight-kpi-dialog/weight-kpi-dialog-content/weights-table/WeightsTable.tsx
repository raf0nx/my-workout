import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@suid/material'
import { For, Show, Suspense } from 'solid-js'

import { TableHeaderCell } from '~/components/table-header-cell'

import type { WeightsTableProps } from './types'
import { WeightsTableNoData, WeightsTableSpinner } from '.'

export default function WeightsTable(props: WeightsTableProps) {
  const isWeightInfoPresent = () => props.weightsInfo?.length

  return (
    <TableContainer
      sx={{ mt: 4, borderRadius: 1, maxHeight: 'calc(100vh - 326.5px)' }}
    >
      <Suspense fallback={<WeightsTableSpinner />}>
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
                    data-testid="weights-table-row"
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
        <Show when={!isWeightInfoPresent()}>
          <WeightsTableNoData />
        </Show>
      </Suspense>
    </TableContainer>
  )
}
