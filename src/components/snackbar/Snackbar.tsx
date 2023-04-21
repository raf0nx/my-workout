import { Alert, AlertTitle } from '@suid/material'
import { Portal } from 'solid-js/web'
import { Show, createSignal, mergeProps, onMount } from 'solid-js'

import { TransitionSlideUp } from '~/utils/transition-slide-up'

import type { SnackbarProps, SnackbarSeverity } from './types'

export default function Snackbar(props: SnackbarProps) {
  const [isOpen, setIsOpen] = createSignal(true)

  const merged = mergeProps(
    {
      severity: 'success' as SnackbarSeverity,
      title: '',
      dissmissable: false,
      timeout: 5000,
    },
    props
  )

  onMount(() => {
    setTimeout(() => {
      setIsOpen(false)
    }, merged.timeout)
  })

  return (
    <Portal>
      <TransitionSlideUp in={isOpen()}>
        <Alert
          severity={merged.severity}
          onClose={merged.dissmissable ? () => setIsOpen(false) : undefined}
          sx={{ position: 'fixed', zIndex: 9999, bottom: 20, left: 20 }}
        >
          <Show when={merged.title}>
            <AlertTitle>{merged.title}</AlertTitle>
          </Show>
          {merged.description}
        </Alert>
      </TransitionSlideUp>
    </Portal>
  )
}
