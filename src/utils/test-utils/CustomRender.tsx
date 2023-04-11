import { render } from '@solidjs/testing-library'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import type { JSXElement } from 'solid-js'

const queryClient = new QueryClient()

export function customRender(component: JSXElement) {
  return render(() => (
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  ))
}
