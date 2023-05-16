// @refresh reload
import { Routes } from '@solidjs/router'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { Suspense } from 'solid-js'
import { Body, FileRoutes, Head, Html, Meta, Scripts, Title } from 'solid-start'
import { ErrorBoundary } from 'solid-start/error-boundary'
import { Box } from '@suid/material'

import { AppBar } from '~/components/app-bar'
import { NavBar } from '~/components/nav-bar'
import { SnackbarProvider } from '~/contexts/snackbar'
import { LoadingScreenProvider } from '~/contexts/loading-screen'
import { UiProvider } from '~/contexts/ui'

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
              <UiProvider>
                <LoadingScreenProvider>
                  <SnackbarProvider>
                    <AppBar />
                    <Box sx={{ display: 'flex', height: 'calc(100% - 4rem)' }}>
                      <NavBar />
                      <Routes>
                        <FileRoutes />
                      </Routes>
                    </Box>
                  </SnackbarProvider>
                </LoadingScreenProvider>
              </UiProvider>
            </QueryClientProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
