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

import { NAV_WIDTH } from '~/constants'

export default function NavBar() {
  const NAV_ITEMS = ['Dashboard', 'Workouts']

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: NAV_WIDTH,
        [`& .MuiDrawer-paper`]: { width: NAV_WIDTH },
      }}
    >
      <Toolbar />
      <List>
        <Index each={NAV_ITEMS}>
          {(text, idx) => (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Show when={idx === 0} fallback={<FitnessCenter />}>
                    <Dashboard />
                  </Show>
                </ListItemIcon>
                <ListItemText primary={text()} />
              </ListItemButton>
            </ListItem>
          )}
        </Index>
      </List>
    </Drawer>
  )
}
