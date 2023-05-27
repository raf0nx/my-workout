import { Box, Typography } from '@suid/material'

import { Card } from '~/components/card'

import type { KpiProps } from './types'

export default function Kpi(props: KpiProps) {
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
          <Typography variant="h6" component="h2" fontWeight={700}>
            {props.value}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            {props.description}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}
