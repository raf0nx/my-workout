// @refresh reload
import { Routes } from '@solidjs/router'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { Suspense } from 'solid-js'
import { Body, FileRoutes, Head, Html, Meta, Scripts, Title } from 'solid-start'
import { ErrorBoundary } from 'solid-start/error-boundary'

import { Navbar } from '~/components/navbar'

import { SnackbarProvider } from './contexts/SnackbarContext'

import './index.scss'

const queryClient = new QueryClient()

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>My Workout</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <SnackbarProvider>
                <Navbar />
                <Routes>
                  <FileRoutes />
                </Routes>
              </SnackbarProvider>
            </QueryClientProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
