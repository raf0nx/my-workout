import { Box, CircularProgress, Typography, useTheme } from '@suid/material'

export default function WeightsTableSpinner() {
  const { palette } = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <CircularProgress size={32} />
      <Typography
        textContent={'Loading weights history'}
        variant="caption"
        color={palette.grey[600]}
      />
    </Box>
  )
}
