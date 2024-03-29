import { Dashboard, FitnessCenter } from '@suid/icons-material'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@suid/material'
import { Index, Show } from 'solid-js'
import { A, useLocation } from 'solid-start'

import { NAVBAR_ITEMS, NAV_WIDTH } from '~/constants'
import { useUi } from '~/contexts/ui'

import { getNavBarItemLink, isLinkActive } from './navbar-helpers'

export default function NavBar() {
  const NAV_ITEMS = Object.values(NAVBAR_ITEMS)

  const location = useLocation()
  const { isMobileDesign, isNavBarOpen, closeNavBar } = useUi()

  return (
    <Drawer
      variant={isMobileDesign() ? 'temporary' : 'permanent'}
      open={isNavBarOpen()}
      onClose={closeNavBar}
      ModalProps={{
        keepMounted: isMobileDesign(),
      }}
      sx={{
        width: NAV_WIDTH,
        [`& .MuiDrawer-paper`]: { width: NAV_WIDTH },
      }}
    >
      <Toolbar />
      <List>
        <Index each={NAV_ITEMS}>
          {(navbarItem, idx) => (
            <A href={getNavBarItemLink(navbarItem())} end onClick={closeNavBar}>
              <ListItem disablePadding>
                <ListItemButton
                  selected={isLinkActive(navbarItem(), location.pathname)}
                  tabIndex={-1}
                >
                  <ListItemIcon>
                    <Show when={idx === 0} fallback={<FitnessCenter />}>
                      <Dashboard />
                    </Show>
                  </ListItemIcon>
                  <ListItemText primary={navbarItem()} />
                </ListItemButton>
              </ListItem>
            </A>
          )}
        </Index>
      </List>
    </Drawer>
  )
}
