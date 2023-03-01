import { Box, Grid, TextField, Typography } from '@suid/material'

import type { WorkoutsTableDialogContentProps } from './types'

export default function WorkoutsTableDialogContent(
  props: WorkoutsTableDialogContentProps
) {
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
          />
          <TextField
            label="Description"
            name="description"
            margin="normal"
            placeholder="e.g. Today the weather was beautiful so the quality of the training was excellent."
            fullWidth
            onChange={props.onInputChange}
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
            />
            <TextField
              label="Week"
              name="week"
              type="number"
              margin="normal"
              placeholder="4"
              sx={{ flex: 1 }}
              onChange={props.onInputChange}
            />
          </Box>
          <TextField
            label="Date"
            name="date"
            margin="normal"
            placeholder="DD.MM.YYYY"
            fullWidth
            onChange={props.onInputChange}
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
            onChange={props.onInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          {/* TODO: Exercises table */}
        </Grid>
      </Grid>
    </Box>
  )
}
