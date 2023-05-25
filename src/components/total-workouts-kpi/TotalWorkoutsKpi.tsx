import { SportsGymnastics } from '@suid/icons-material'
import { Box, Typography, useTheme } from '@suid/material'

import { Card } from '~/components/card'

import type { TotalWorkoutsKpiProps } from './types'

export default function TotalWorkoutsKpi(props: TotalWorkoutsKpiProps) {
  const theme = useTheme()

  return (
    <Card>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `${theme.palette.secondary.main}1A`,
            borderRadius: '50%',
            height: '4rem',
            width: '4rem',
          }}
        >
          <SportsGymnastics
            sx={{
              fontSize: '2rem',
              color: theme.palette.secondary.main,
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
            {props.totalWorkoutsAmount}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            Total Workouts
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}
