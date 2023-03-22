import { FormControl, MenuItem, Select } from '@suid/material'
import type { SelectChangeEvent } from '@suid/material/Select'
import { Index, Show } from 'solid-js'

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
    <FormControl variant="standard" size="small" sx={{ width: '100%' }}>
      <Select
        value={props.selectedExercise}
        name={props.name}
        displayEmpty
        onChange={handleChange}
        inputProps={{ 'aria-label': props.ariaLabel }}
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
  )
}
