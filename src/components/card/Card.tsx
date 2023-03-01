import { Paper } from '@suid/material'

import type { CardProps } from './types'

export default function Card(props: CardProps) {
  return (
    <Paper elevation={4} sx={{ p: 2, borderRadius: 2 }}>
      {props.children}
    </Paper>
  )
}
