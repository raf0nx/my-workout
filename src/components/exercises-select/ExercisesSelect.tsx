import { FormControl, MenuItem, Select } from '@suid/material'
import { Index } from 'solid-js'

import { type ExercisesSelectProps, AVAILABLE_EXERCISES } from './types'

export default function ExercisesSelect(props: ExercisesSelectProps) {
  return (
    <FormControl variant="standard" size="small" sx={{ width: '100%' }}>
      <Select value={props.selectedExercise} displayEmpty>
        <MenuItem value="">
          <em>Select&nbsp;exercise</em>
        </MenuItem>
        <Index each={AVAILABLE_EXERCISES}>
          {exercise => <MenuItem value={exercise()}>{exercise()}</MenuItem>}
        </Index>
      </Select>
    </FormControl>
  )
}
