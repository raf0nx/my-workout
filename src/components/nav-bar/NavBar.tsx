import { Drawer, Toolbar } from '@suid/material'

export default function NavBar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        [`& .MuiDrawer-paper`]: { width: 240 },
      }}
    >
      <Toolbar />
      Test
    </Drawer>
  )
}
