import {
  createContext,
  useContext,
  createSignal,
  Show,
  type JSXElement,
} from 'solid-js'
import { Portal } from 'solid-js/web'

import { Snackbar } from '~/components/snackbar'
import { TransitionSlideUp } from '~/utils/transition-slide-up'

const SnackbarContext = createContext<{
  showSnackbar: () => void
  dismissSnackbar: () => void
}>({
  showSnackbar: () => null,
  dismissSnackbar: () => null,
})

export function SnackbarProvider(props: { children: JSXElement }) {
  const [isOpen, setIsOpen] = createSignal(false)

  const showSnackbar = () => {
    setIsOpen(true)
  }

  const dismissSnackbar = () => {
    setIsOpen(false)
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar, dismissSnackbar }}>
      {props.children}
      <Show when={isOpen()}>
        <Portal>
          <TransitionSlideUp in={isOpen()}>
            <Snackbar
              description="Workout has been saved successfully."
              dissmissable
            />
          </TransitionSlideUp>
        </Portal>
      </Show>
    </SnackbarContext.Provider>
  )
}

export function useSnackbar() {
  return useContext<{ showSnackbar: () => void; dismissSnackbar: () => void }>(
    SnackbarContext
  )
}
