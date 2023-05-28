import { MonitorWeight, MoreHoriz } from '@suid/icons-material'
import { Box, IconButton, useTheme } from '@suid/material'

import { Kpi } from '~/components/kpi'

export default function WeightKpi() {
  const theme = useTheme()

  return (
    <Box sx={{ position: 'relative' }}>
      <Kpi
        value={80.4}
        changeValue={'-1.4%'}
        description="Current weight"
        color={theme.palette.info.main}
        icon={MonitorWeight}
      />
      <IconButton
        size="small"
        aria-label="open weight information modal"
        sx={{ position: 'absolute', top: 4, right: 4 }}
      >
        <MoreHoriz />
      </IconButton>
    </Box>
  )
}
