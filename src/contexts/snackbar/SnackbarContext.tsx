import {
  createContext,
  useContext,
  createSignal,
  Show,
  type JSXElement,
} from 'solid-js'

import { Snackbar } from '~/components/snackbar'
import type { SnackbarProps } from '~/components/snackbar/types'

import type { SnackbarContextProps } from './types'
import {
  getInitialSnackbarContextProps,
  getInitialSnackbarProps,
} from './snackbar-context-helpers'

const SnackbarContext = createContext<SnackbarContextProps>(
  getInitialSnackbarContextProps()
)

export function SnackbarProvider(props: { children: JSXElement }) {
  const [isOpen, setIsOpen] = createSignal(false)
  const [snackbarProps, setSnackbarProps] = createSignal(
    getInitialSnackbarProps()
  )

  const showSnackbar = (options: SnackbarProps) => {
    setIsOpen(true)
    setSnackbarProps(options)
  }

  const dismissSnackbar = () => {
    setIsOpen(false)
    setSnackbarProps(getInitialSnackbarProps())
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {props.children}
      <Show when={isOpen()}>
        <Snackbar {...snackbarProps()} onClose={dismissSnackbar} />
      </Show>
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => useContext(SnackbarContext)
