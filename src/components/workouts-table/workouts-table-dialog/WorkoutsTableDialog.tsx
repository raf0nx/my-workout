import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@suid/material'
import { JSXElement, Setter } from 'solid-js'
import { Close } from '@suid/icons-material'
import { TransitionProps } from '@suid/material/transitions/transition'

// TODO: Extract this to a separate file
const Transition = function Transition(
  props: TransitionProps & {
    children: JSXElement
  }
) {
  return <Slide direction="up" {...props} />
}

interface WorkoutsTableDialogProps {
  isOpen: boolean
  onClose: [Setter<boolean>, boolean]
}

export default function WorkoutsTableDialog(props: WorkoutsTableDialogProps) {
  return (
    <Dialog fullScreen open={props.isOpen} TransitionComponent={Transition}>
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
