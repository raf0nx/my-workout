import { Slide } from '@suid/material'

import type { TransitionSlideUpProps } from './types'

export default function TransitionSlideUp(props: TransitionSlideUpProps) {
  return <Slide direction="up" {...props} />
}
