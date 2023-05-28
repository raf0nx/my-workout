import { MonitorWeight } from '@suid/icons-material'
import { useTheme } from '@suid/material'

import { Kpi } from '~/components/kpi'

export default function WeightKpi() {
  const theme = useTheme()

  return (
    <Kpi
      value={80.4}
      changeValue={'-1.4%'}
      description="Current weight"
      color={theme.palette.info.main}
      icon={MonitorWeight}
    />
  )
}
