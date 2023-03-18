import { FormControl, MenuItem, Select } from '@suid/material'
import { Index, Show } from 'solid-js'

import { type ExercisesSelectProps, AVAILABLE_EXERCISES } from './types'

export default function ExercisesSelect(props: ExercisesSelectProps) {
  return (
    <FormControl variant="standard" size="small" sx={{ width: '100%' }}>
      <Select value={props.selectedExercise} displayEmpty>
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
