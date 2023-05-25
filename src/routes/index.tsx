import { SportsGymnastics } from '@suid/icons-material'
import { Box, Grid, Typography, useTheme } from '@suid/material'

import { Card } from '~/components/card'

export default function Dashboard() {
  const theme = useTheme()

  return (
    <main>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
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
                  123
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                  Total Workouts
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </main>
  )
}
