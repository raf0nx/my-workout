import { Box, Grid, TextField, Typography } from '@suid/material'

import type { WorkoutsTableDialogContentProps } from './types'

export default function WorkoutsTableDialogContent(
  props: WorkoutsTableDialogContentProps
) {
  const hasReadonlyInputs = props.state === 'show'

  return (
    <Box p={3} component="form" noValidate autocomplete="off">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Workout name"
            name="name"
            margin="normal"
            placeholder="Push Pull Monday"
            fullWidth
            onChange={props.onInputChange}
            value={props.workoutDetails.name}
            InputProps={{ readOnly: hasReadonlyInputs }}
          />
          <TextField
            label="Description"
            name="description"
            margin="normal"
            placeholder="e.g. Today the weather was beautiful so the quality of the training was excellent."
            fullWidth
            onChange={props.onInputChange}
            value={props.workoutDetails.description}
            InputProps={{ readOnly: hasReadonlyInputs }}
          />
          <Box sx={{ display: 'flex', gap: 3 }}>
            <TextField
              label="Total reps"
              name="totalReps"
              type="number"
              margin="normal"
              placeholder="90"
              sx={{ flex: 1 }}
              onChange={props.onInputChange}
              value={props.workoutDetails.totalReps}
              InputProps={{ readOnly: hasReadonlyInputs }}
            />
            <TextField
              label="Week"
              name="week"
              type="number"
              margin="normal"
              placeholder="4"
              sx={{ flex: 1 }}
              onChange={props.onInputChange}
              value={props.workoutDetails.week}
              InputProps={{ readOnly: hasReadonlyInputs }}
            />
          </Box>
          <TextField
            label="Date"
            name="date"
            margin="normal"
            placeholder="DD.MM.YYYY"
            fullWidth
            onChange={props.onInputChange}
            value={props.workoutDetails.date}
            InputProps={{ readOnly: hasReadonlyInputs }}
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
              readOnly: hasReadonlyInputs,
            }}
            onChange={props.onInputChange}
            value={props.workoutDetails.duration}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          {/* TODO: Exercises table */}
        </Grid>
      </Grid>
    </Box>
  )
}
