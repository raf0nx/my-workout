import { MonitorWeight, MoreHoriz } from '@suid/icons-material'
import { Box, IconButton, useTheme } from '@suid/material'
import { createSignal } from 'solid-js'

import { Kpi } from '~/components/kpi'

import { WeightKpiDialog } from './weight-kpi-dialog'

export default function WeightKpi() {
  const theme = useTheme()

  const [isDialogOpen, setIsDialogOpen] = createSignal(false)

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Kpi
          value={80.4}
          changeValue={'-1.4%'}
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
      <WeightKpiDialog isOpen={isDialogOpen()} onClose={closeDialog} />
    </>
  )
}
