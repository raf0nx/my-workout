import { FormControl, MenuItem, Select, TextField } from '@suid/material'
import type { SelectChangeEvent } from '@suid/material/Select'
import { Index, Show } from 'solid-js'

import {
  getInputProps,
  getInputStyle,
} from '~/components/workouts-table/workouts-table-dialog/workouts-table-dialog-content/workouts-table-dialog-content-helpers'

import {
  type ExercisesSelectProps,
  AVAILABLE_EXERCISES,
  type AvailableExercises,
} from './types'

export default function ExercisesSelect(props: ExercisesSelectProps) {
  const handleChange = (e: SelectChangeEvent) => {
    const selectedExercise = e.target.value as AvailableExercises
    const targetName = props.name

    props.onChange(selectedExercise, targetName)
  }

  return (
    <Show
      when={!props.isReadOnly}
      fallback={
        <TextField
          classes={{
            root: getInputStyle(true),
          }}
          sx={{ mb: 0.5 }}
          name={props.name}
          fullWidth
          inputProps={{
            'aria-label': props.ariaLabel,
            style: { 'text-overflow': 'ellipsis' },
            ...getInputProps(true),
          }}
          defaultValue={props.selectedExercise}
          variant="standard"
        />
      }
    >
      <FormControl variant="standard" size="small" sx={{ width: '100%' }}>
        <Select
          value={props.selectedExercise}
          name={props.name}
          displayEmpty
          onChange={handleChange}
          inputProps={{
            'aria-label': props.ariaLabel,
          }}
        >
          <Show when={!props.selectedExercise}>
            <MenuItem value="">
              <em>Select&nbsp;exercise</em>
            </MenuItem>
          </Show>
          <Index each={AVAILABLE_EXERCISES}>
            {exercise => <MenuItem value={exercise()}>{exercise()}</MenuItem>}
          </Index>
        </Select>
      </FormControl>
    </Show>
  )
}
