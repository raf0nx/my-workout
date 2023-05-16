import {
  AppBar as SuidAppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@suid/material'
import MenuIcon from '@suid/icons-material/Menu'
import { Close } from '@suid/icons-material'
import { Show } from 'solid-js'

import { useUi } from '~/contexts/ui'

export default function AppBar() {
  const theme = useTheme()
  const { isMobileDesign, isNavBarOpen, openNavBar, closeNavBar } = useUi()

  const hamburgerIconAriaLabel = () =>
    `${isNavBarOpen() ? 'close' : 'open'} navigation drawer`

  return (
    <SuidAppBar position="sticky" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Show when={isMobileDesign()}>
          <IconButton
            size="large"
            color="inherit"
            edge="start"
            aria-label={hamburgerIconAriaLabel()}
            sx={{ mr: 2 }}
            onClick={isNavBarOpen() ? closeNavBar : openNavBar}
          >
            <Show when={isNavBarOpen()} fallback={<MenuIcon />}>
              <Close />
            </Show>
          </IconButton>
        </Show>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
      </Toolbar>
    </SuidAppBar>
  )
}
