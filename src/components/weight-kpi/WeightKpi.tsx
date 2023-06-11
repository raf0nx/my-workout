import { MonitorWeight, MoreHoriz } from '@suid/icons-material'
import { Box, IconButton, useTheme } from '@suid/material'
import { createSignal } from 'solid-js'

import { Kpi } from '~/components/kpi'

import { WeightKpiDialog } from './weight-kpi-dialog'
import { getWeightKpiChangeValue, getWeightKpiValue } from './weight-kpi-helper'
import type { WeightKpiProps } from './types'

export default function WeightKpi(props: WeightKpiProps) {
  const theme = useTheme()

  const [isDialogOpen, setIsDialogOpen] = createSignal(false)

  /* c8 ignore start */
  const closeDialog = () => {
    setIsDialogOpen(false)
  }
  /* c8 ignore end */

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Kpi
          value={getWeightKpiValue(props.weightsInfo)}
          changeValue={getWeightKpiChangeValue(props.weightsInfo)}
          description="Current weight"
          color={theme.palette.info.main}
          icon={MonitorWeight}
        />
        <IconButton
          onClick={[setIsDialogOpen, true]}
          size="small"
          aria-label="open weight information modal"
          sx={{ position: 'absolute', top: 4, right: 4 }}
        >
          <MoreHoriz />
        </IconButton>
      </Box>
      {/* c8 ignore start */}
      <WeightKpiDialog
        isOpen={isDialogOpen()}
        onClose={closeDialog}
        weightsInfo={props.weightsInfo}
      />
      {/* c8 ignore end */}
    </>
  )
}
