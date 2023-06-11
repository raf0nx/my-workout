import { NotInterested } from '@suid/icons-material'
import { Box, Typography, useTheme } from '@suid/material'

export default function WeightsTableNoData() {
  const { palette } = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
        my: 2,
        color: palette.grey[600],
      }}
    >
      <NotInterested sx={{ fontSize: 32 }} />
      <Typography textContent="No data returned" variant="body2" />
    </Box>
  )
}
