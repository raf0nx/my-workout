import {
  AppBar,
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@suid/material'
import { Close } from '@suid/icons-material'

import TransitionSlideUp from '~/utils/transition-slide-up'

interface WorkoutsTableDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function WorkoutsTableDialog(props: WorkoutsTableDialogProps) {
  return (
    <Dialog
      fullScreen
      open={props.isOpen}
      TransitionComponent={TransitionSlideUp}
      onClose={props.onClose}
      aria-labelledby="workouts-table-dialog-title"
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
            id="workouts-table-dialog-title"
          >
            New&nbsp;Workout
          </Typography>
          <Button autofocus color="inherit" onClick={props.onClose}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Box p={3} component="form" noValidate autocomplete="off">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Workout name"
              margin="normal"
              placeholder="Push Pull Monday"
              fullWidth
            />
            <TextField
              label="Description"
              margin="normal"
              placeholder="e.g. Today the weather was beautiful so the quality of the training was excellent."
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField
                label="Total reps"
                type="number"
                margin="normal"
                placeholder="90"
                sx={{ flex: 1 }}
              />
              <TextField
                label="Week"
                type="number"
                margin="normal"
                placeholder="4"
                sx={{ flex: 1 }}
              />
            </Box>
            <TextField
              label="Date"
              margin="normal"
              placeholder="DD.MM.YYYY"
              fullWidth
            />
            <TextField
              label="Duration"
              type="number"
              margin="normal"
              placeholder="60"
              fullWidth
              InputProps={{
                endAdornment: (
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    mins
                  </Typography>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            {/* TODO: Exercises table */}
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}
