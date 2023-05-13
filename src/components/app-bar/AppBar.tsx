import {
  AppBar as SuidAppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@suid/material'
import MenuIcon from '@suid/icons-material/Menu'

export default function AppBar() {
  const theme = useTheme()

  return (
    <SuidAppBar position="sticky" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          size="large"
          color="inherit"
          edge="start"
          aria-label="open navigation drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
      </Toolbar>
    </SuidAppBar>
  )
}
