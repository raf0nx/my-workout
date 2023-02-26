import { Slide } from '@suid/material'
import { TransitionProps } from '@suid/material/transitions/transition'
import { JSXElement } from 'solid-js'

interface TransitionSlideUpProps extends TransitionProps {
  children: JSXElement
}

export default function TransitionSlideUp(props: TransitionSlideUpProps) {
  return <Slide direction="up" {...props} />
}
