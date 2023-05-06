import { render } from '@solidjs/testing-library'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import type { JSXElement } from 'solid-js'

import { LoadingScreenProvider } from '~/contexts/loading-screen'
import { SnackbarProvider } from '~/contexts/snackbar'

const queryClient = new QueryClient()

export function customRender(component: JSXElement) {
  return render(() => (
    <QueryClientProvider client={queryClient}>
      <LoadingScreenProvider>
        <SnackbarProvider>{component}</SnackbarProvider>
      </LoadingScreenProvider>
    </QueryClientProvider>
  ))
}
