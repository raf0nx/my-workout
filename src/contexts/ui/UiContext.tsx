import {
  createContext,
  useContext,
  createEffect,
  onCleanup,
  createSignal,
  type JSXElement,
} from 'solid-js'

import { getInitialUiContextProps } from './ui-context-helpers'

import type { UiContextProps } from './types'

const UiContext = createContext<UiContextProps>(getInitialUiContextProps())

const mobileDesignQuery = window.matchMedia('(max-width: 899px)')

export function UiProvider(props: { children: JSXElement }) {
  const [isMobileDesign, setIsMobileDesign] = createSignal(
    mobileDesignQuery.matches
  )

  createEffect(() => {
    const updateIsMobileDesign = () => {
      setIsMobileDesign(mobileDesignQuery.matches)
    }

    mobileDesignQuery.addEventListener('change', updateIsMobileDesign)

    onCleanup(() => {
      mobileDesignQuery.removeEventListener('change', updateIsMobileDesign)
    })
  })

  return (
    <UiContext.Provider value={{ isMobileDesign }}>
      {props.children}
    </UiContext.Provider>
  )
}

export const useUi = () => useContext(UiContext)
