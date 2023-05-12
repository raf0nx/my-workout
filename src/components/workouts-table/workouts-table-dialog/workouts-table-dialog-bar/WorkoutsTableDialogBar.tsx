import { Close, Edit } from '@suid/icons-material'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@suid/material'
import { Show } from 'solid-js'

import type { WorkoutsTableDialogBarProps } from './types'

export default function WorkoutsTableDialogBar(
  props: WorkoutsTableDialogBarProps
) {
  const dialogBarHeader = () =>
    props.state === 'create' ? 'New Workout' : 'Your Workout'

  const handleButtonClick = () => {
    switch (props.state) {
      case 'create':
        props.onSave()
        break
      case 'edit':
        props.onEdit()
        break
      case 'show':
        props.onStateChange('edit')
    }
  }

  return (
    <AppBar position="sticky">
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
          {dialogBarHeader()}
        </Typography>
        <Show
          when={props.state === 'show'}
          fallback={
            <Button autofocus color="inherit" onClick={handleButtonClick}>
              Save
            </Button>
          }
        >
          <Button
            autofocus
            color="inherit"
            startIcon={<Edit />}
            onClick={handleButtonClick}
          >
            Edit
          </Button>
        </Show>
      </Toolbar>
    </AppBar>
  )
}
