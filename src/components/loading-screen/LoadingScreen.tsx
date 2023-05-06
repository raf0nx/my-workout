import { Backdrop, CircularProgress, useTheme } from '@suid/material'

import type { LoadingScreenProps } from './types'

export default function LoadingScreen(props: LoadingScreenProps) {
  const theme = useTheme()

  return (
    <Backdrop open={props.open} sx={{ zIndex: theme.zIndex.modal + 1 }}>
      <CircularProgress color="secondary" />
    </Backdrop>
  )
}
