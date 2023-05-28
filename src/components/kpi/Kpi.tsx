import { Box, Typography, useTheme } from '@suid/material'
import { Show } from 'solid-js'

import { Card } from '~/components/card'

import type { KpiProps } from './types'
import { getChangeValueColor } from './kpi-helpers'

export default function Kpi(props: KpiProps) {
  const { palette } = useTheme()

  const Icon = props.icon

  return (
    <Card>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `${props.color}1A`,
            borderRadius: '50%',
            height: '4rem',
            width: '4rem',
          }}
        >
          <Icon
            sx={{
              fontSize: '2rem',
              color: props.color,
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="h6" component="h2" fontWeight={700}>
              {props.value}
            </Typography>
            <Show when={props.changeValue}>
              <Typography
                variant="subtitle2"
                component="p"
                marginTop={0.5}
                color={getChangeValueColor(props.changeValue as string)}
              >
                {props.changeValue}
              </Typography>
            </Show>
          </Box>
          <Typography variant="body2" color={palette.grey[600]}>
            {props.description}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}
