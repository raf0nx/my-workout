import { Close } from '@suid/icons-material'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@suid/material'

import type { WorkoutsTableDialogBarProps } from './workouts-table-dialog-bar-types'

export default function WorkoutsTableDialogBar(
  props: WorkoutsTableDialogBarProps
) {
  return (
    <AppBar sx={{ position: 'relative' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={props.onClose}
          aria-label="close"
        >
          <Close />
        </IconButton>
        <Typography
          sx={{
            ml: 2,
            flex: 1,
          }}
          variant="h6"
          component="h2"
          id="workouts-table-dialog-title"
        >
          New&nbsp;Workout
        </Typography>
        <Button autofocus color="inherit" onClick={props.onSave}>
          Save
        </Button>
      </Toolbar>
    </AppBar>
  )
}
