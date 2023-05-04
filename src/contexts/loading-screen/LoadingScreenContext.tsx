import { Backdrop, CircularProgress, useTheme } from '@suid/material'
import {
  createContext,
  useContext,
  createSignal,
  type JSXElement,
} from 'solid-js'

import { getInitialLoadingScreenContextProps } from './loading-screen-context-helpers'
import type { LoadingScreenContextProps } from './types'

const LoadingScreenContext = createContext<LoadingScreenContextProps>(
  getInitialLoadingScreenContextProps()
)

export function LoadingScreenProvider(props: { children: JSXElement }) {
  const theme = useTheme()

  const [showBackdrop, setShowBackdrop] = createSignal(false)

  const displayLoadingScreen = () => {
    setShowBackdrop(true)
  }

  const hideLoadingScreen = () => {
    setShowBackdrop(false)
  }

  return (
    <LoadingScreenContext.Provider
      value={{ displayLoadingScreen, hideLoadingScreen }}
    >
      {props.children}
      <Backdrop open={showBackdrop()} sx={{ zIndex: theme.zIndex.modal + 1 }}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </LoadingScreenContext.Provider>
  )
}

export const useLoadingScreen = () => useContext(LoadingScreenContext)
