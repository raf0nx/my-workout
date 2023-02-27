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
import { ChangeEvent } from '@suid/types'
import { createStore, produce } from 'solid-js/store'

import TransitionSlideUp from '~/utils/transition-slide-up'

interface WorkoutsTableDialogProps {
  isOpen: boolean
  onClose: () => void
}

interface WorkoutDetailsInitialStateProps {
  name: string
  description: string
  totalReps: string
  week: string
  date: string
  duration: string
}

const workoutDetailsInitialState: WorkoutDetailsInitialStateProps = {
  name: '',
  description: '',
  totalReps: '',
  week: '',
  date: '',
  duration: '',
}

// TODO: Implement Dialog's accessibility
export default function WorkoutsTableDialog(props: WorkoutsTableDialogProps) {
  const [workoutDetails, setWorkoutDetails] = createStore(
    workoutDetailsInitialState
  )

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => {
    const fieldToUpdate = event.target
      .name as keyof WorkoutDetailsInitialStateProps

    setWorkoutDetails(
      produce(state => {
        state[fieldToUpdate] = value
      })
    )
  }

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
            component="h2"
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
              name="name"
              margin="normal"
              placeholder="Push Pull Monday"
              fullWidth
              onChange={handleInputChange}
            />
            <TextField
              label="Description"
              name="description"
              margin="normal"
              placeholder="e.g. Today the weather was beautiful so the quality of the training was excellent."
              fullWidth
              onChange={handleInputChange}
            />
            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField
                label="Total reps"
                name="totalReps"
                type="number"
                margin="normal"
                placeholder="90"
                sx={{ flex: 1 }}
                onChange={handleInputChange}
              />
              <TextField
                label="Week"
                name="week"
                type="number"
                margin="normal"
                placeholder="4"
                sx={{ flex: 1 }}
                onChange={handleInputChange}
              />
            </Box>
            <TextField
              label="Date"
              name="date"
              margin="normal"
              placeholder="DD.MM.YYYY"
              fullWidth
              onChange={handleInputChange}
            />
            <TextField
              label="Duration"
              name="duration"
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
              onChange={handleInputChange}
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
