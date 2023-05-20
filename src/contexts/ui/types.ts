import type { Accessor } from 'solid-js'

export interface UiContextProps {
  isMobileDesign: Accessor<boolean>
  isNavBarOpen: Accessor<boolean>
  openNavBar: () => void
  closeNavBar: () => void
}
