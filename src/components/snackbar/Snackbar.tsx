import { Alert, AlertTitle } from '@suid/material'
import { Show, mergeProps, onMount } from 'solid-js'

import { useSnackbar } from '~/contexts/SnackbarContext'

import type { SnackbarProps, SnackbarSeverity } from './types'

export default function Snackbar(props: SnackbarProps) {
  const { dismissSnackbar } = useSnackbar()

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
      dismissSnackbar()
    }, merged.timeout)
  })

  return (
    <Alert
      severity={merged.severity}
      onClose={merged.dissmissable ? () => dismissSnackbar() : undefined}
      sx={{ position: 'fixed', zIndex: 9999, bottom: 20, left: 20 }}
    >
      <Show when={merged.title}>
        <AlertTitle>{merged.title}</AlertTitle>
      </Show>
      {merged.description}
    </Alert>
  )
}
