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

export function UiProvider(props: { children: JSXElement }) {
  const mobileDesignQuery = window.matchMedia('(max-width: 899px)')

  const [isMobileDesign, setIsMobileDesign] = createSignal(
    mobileDesignQuery.matches
  )
  const [isNavBarOpen, setIsNavBarOpen] = createSignal(false)

  const openNavBar = () => {
    setIsNavBarOpen(true)
  }

  const closeNavBar = () => {
    setIsNavBarOpen(false)
  }

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
    <UiContext.Provider
      value={{ isMobileDesign, isNavBarOpen, openNavBar, closeNavBar }}
    >
      {props.children}
    </UiContext.Provider>
  )
}

export const useUi = () => useContext(UiContext)
