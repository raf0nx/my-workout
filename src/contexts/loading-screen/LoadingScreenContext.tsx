import {
  createContext,
  useContext,
  createSignal,
  type JSXElement,
} from 'solid-js'

import { LoadingScreen } from '~/components/loading-screen'

import { getInitialLoadingScreenContextProps } from './loading-screen-context-helpers'
import type { LoadingScreenContextProps } from './types'

const LoadingScreenContext = createContext<LoadingScreenContextProps>(
  getInitialLoadingScreenContextProps()
)

export function LoadingScreenProvider(props: { children: JSXElement }) {
  const [showLoadingScreen, setShowLoadingScreen] = createSignal(false)

  const displayLoadingScreen = () => {
    setShowLoadingScreen(true)
  }

  const hideLoadingScreen = () => {
    setShowLoadingScreen(false)
  }

  return (
    <LoadingScreenContext.Provider
      value={{ displayLoadingScreen, hideLoadingScreen }}
    >
      {props.children}
      <LoadingScreen open={showLoadingScreen()} />
    </LoadingScreenContext.Provider>
  )
}

export const useLoadingScreen = () => useContext(LoadingScreenContext)
