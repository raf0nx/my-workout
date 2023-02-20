import { Paper } from '@suid/material'
import { JSXElement } from 'solid-js'

export default function Card(props: { children: JSXElement }) {
  return (
    <Paper elevation={4} sx={{ p: 2, borderRadius: 2 }}>
      {props.children}
    </Paper>
  )
}
