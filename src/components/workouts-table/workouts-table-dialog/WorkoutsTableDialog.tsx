import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from '@suid/material'
import { Setter } from 'solid-js'
import { Close } from '@suid/icons-material'

import TransitionSlideUp from '~/utils/transition-slide-up'

interface WorkoutsTableDialogProps {
  isOpen: boolean
  onClose: [Setter<boolean>, boolean]
}

export default function WorkoutsTableDialog(props: WorkoutsTableDialogProps) {
  return (
    <Dialog
      fullScreen
      open={props.isOpen}
      TransitionComponent={TransitionSlideUp}
    >
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
            component="div"
          >
            New Workout
          </Typography>
          <Button autofocus color="inherit" onClick={props.onClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
    </Dialog>
  )
}
