import type { OverridableComponent } from '@suid/material/OverridableComponent'
import type { SvgIconTypeMap } from '@suid/material/SvgIcon'

export interface KpiProps {
  value: number
  description: string
  color: string
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}
