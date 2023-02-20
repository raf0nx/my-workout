// @refresh reload
import { Routes } from '@solidjs/router'
import { Suspense } from 'solid-js'
import { Body, FileRoutes, Head, Html, Meta, Scripts, Title } from 'solid-start'
import { ErrorBoundary } from 'solid-start/error-boundary'

import Navbar from '~/components/navbar/Navbar'

import './index.scss'

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
            <Navbar />
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
