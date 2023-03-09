import { Dialog } from '@suid/material'
import type { ChangeEvent } from '@suid/types'
import { createStore, produce } from 'solid-js/store'

import { TransitionSlideUp } from '~/utils/transition-slide-up'
import type { WorkoutProps } from '~/components/workouts-table/types'

import {
  workoutDetailsInitialState,
  type WorkoutsTableDialogProps,
} from './types'
import { WorkoutsTableDialogBar, WorkoutsTableDialogContent } from '.'

// TODO: Implement Dialog's accessibility
export default function WorkoutsTableDialog(props: WorkoutsTableDialogProps) {
  const [workoutDetails, setWorkoutDetails] = createStore(
    props.workout || {
      ...workoutDetailsInitialState,
    }
  )

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
        workouts.push({ ...workoutDetails, id: Date.now().toString() })
      })
    )
    props.onClose()
    clearStore()
  }

  const clearStore = () => {
    setWorkoutDetails(workoutDetailsInitialState)
  }

  return (
    <Dialog
      fullScreen
      open={props.isOpen}
      TransitionComponent={TransitionSlideUp}
      onClose={props.onClose}
      aria-labelledby="workouts-table-dialog-title"
    >
      <WorkoutsTableDialogBar
        onClose={props.onClose}
        onSave={handleSave}
        state={props.state}
      />
      <WorkoutsTableDialogContent
        onInputChange={handleInputChange}
        workoutDetails={workoutDetails}
        state={props.state}
      />
    </Dialog>
  )
}
