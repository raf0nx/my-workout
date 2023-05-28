import { MonitorWeight } from '@suid/icons-material'
import { useTheme } from '@suid/material'

import { Kpi } from '~/components/kpi'

export default function WeightKpi() {
  const theme = useTheme()

  return (
    <Kpi
      value={80.4}
      description="Your weight"
      color={theme.palette.info.main}
      icon={MonitorWeight}
    />
  )
}
