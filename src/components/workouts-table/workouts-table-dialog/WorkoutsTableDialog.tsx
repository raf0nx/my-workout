import { Dialog } from '@suid/material'
import type { ChangeEvent } from '@suid/types'
import { createStore, produce } from 'solid-js/store'

import { TransitionSlideUp } from '~/utils/transition-slide-up'
import type { WorkoutProps } from '~/components/workouts-table/types'

import {
  workoutDetailsInitialState,
  type WorkoutsTableDialogProps,
} from './workouts-table-dialog-types'
import { WorkoutsTableDialogBar, WorkoutsTableDialogContent } from '.'

// TODO: Implement Dialog's accessibility
export default function WorkoutsTableDialog(props: WorkoutsTableDialogProps) {
  const [workoutDetails, setWorkoutDetails] = createStore({
    ...workoutDetailsInitialState,
  })

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => {
    const fieldToUpdate = event.target.name as WorkoutProps

    setWorkoutDetails(
      produce(state => {
        state[fieldToUpdate] = value
      })
    )
  }

  const handleSave = () => {
    props.setWorkouts(
      produce(workouts => {
        workouts.push({ ...workoutDetails })
      })
    )
    props.onClose()
  }

  return (
    <Dialog
      fullScreen
      open={props.isOpen}
      TransitionComponent={TransitionSlideUp}
      onClose={props.onClose}
      aria-labelledby="workouts-table-dialog-title"
    >
      <WorkoutsTableDialogBar onClose={props.onClose} onSave={handleSave} />
      <WorkoutsTableDialogContent onInputChange={handleInputChange} />
    </Dialog>
  )
}
