import { Close } from '@suid/icons-material'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@suid/material'
import { Show } from 'solid-js'

import type { WorkoutsTableDialogBarProps } from './types'

export default function WorkoutsTableDialogBar(
  props: WorkoutsTableDialogBarProps
) {
  const dialogBarHeader =
    props.state === 'create' ? 'New Workout' : 'Your Workout'

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
          {dialogBarHeader}
        </Typography>
        <Show when={props.state === 'create'}>
          <Button autofocus color="inherit" onClick={props.onSave}>
            Save
          </Button>
        </Show>
      </Toolbar>
    </AppBar>
  )
}
