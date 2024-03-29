import { Alert, AlertTitle } from '@suid/material'
import { Show, createSignal, mergeProps, onMount } from 'solid-js'
import { Portal } from 'solid-js/web'

import { TransitionSlideUp } from '~/utils/transition-slide-up'

import { type SnackbarProps, SnackbarSeverity } from './types'

export default function Snackbar(props: SnackbarProps) {
  const merged = mergeProps(
    {
      severity: SnackbarSeverity.SUCCESS,
      title: '',
      dismissable: false,
      timeout: 5000,
      onClose: () => null,
    },
    props
  )

  const [isOpen, setIsOpen] = createSignal(true)
  const [isInTheDOM, setIsInTheDOM] = createSignal(true)

  onMount(() => {
    setTimeout(() => {
      setIsOpen(false)
    }, merged.timeout)
  })

  return (
    <Show when={isInTheDOM()}>
      <Portal>
        <TransitionSlideUp
          in={isOpen()}
          onExited={() => {
            setIsInTheDOM(false)
            merged.onClose()
          }}
        >
          <Alert
            severity={merged.severity}
            onClose={merged.dismissable ? () => setIsOpen(false) : undefined}
            sx={{ position: 'fixed', zIndex: 9999, bottom: 20, left: 20 }}
          >
            <Show when={merged.title}>
              <AlertTitle>{merged.title}</AlertTitle>
            </Show>
            {merged.description}
          </Alert>
        </TransitionSlideUp>
      </Portal>
    </Show>
  )
}
