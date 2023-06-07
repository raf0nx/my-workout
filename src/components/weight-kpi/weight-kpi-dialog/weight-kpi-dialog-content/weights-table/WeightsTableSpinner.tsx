import { Box, CircularProgress, Typography } from '@suid/material'

export default function WeightsTableSpinner() {
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
      <Typography textContent={'Loading weights history'} variant="caption" />
    </Box>
  )
}
