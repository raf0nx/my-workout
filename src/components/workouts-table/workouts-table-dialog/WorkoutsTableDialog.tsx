import { Dialog } from '@suid/material'
import type { ChangeEvent } from '@suid/types'
import { createStore, produce } from 'solid-js/store'
import { createSignal } from 'solid-js'
import { createMutation } from '@tanstack/solid-query'

import { TransitionSlideUp } from '~/utils/transition-slide-up'
import type {
  NoIDWorkout,
  Workout,
  WorkoutProps,
} from '~/components/workouts-table/types'
import { postWorkout, updateWorkout } from '~/api/workouts'

import {
  workoutDetailsInitialState,
  type WorkoutsTableDialogProps,
} from './types'
import { WorkoutsTableDialogBar, WorkoutsTableDialogContent } from '.'

// TODO: Implement Dialog's accessibility
export default function WorkoutsTableDialog(props: WorkoutsTableDialogProps) {
  const workoutPostMutation = createMutation((workoutData: NoIDWorkout) =>
    postWorkout(workoutData)
  )

  const workoutUpdateMutation = createMutation((workoutData: Workout) =>
    updateWorkout(workoutData)
  )

  const [workoutDetails, setWorkoutDetails] = createStore(
    props.workout || structuredClone(workoutDetailsInitialState)
  )

  const [dialogState, setDialogState] = createSignal(props.state)

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
    workoutPostMutation.mutate({ ...workoutDetails })

    props.onClose()
    clearStore()
  }

  const handleEdit = () => {
    workoutUpdateMutation.mutate(workoutDetails)

    props.onClose()
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
        state={dialogState()}
        onStateChange={setDialogState}
        onEdit={handleEdit}
      />
      <WorkoutsTableDialogContent
        onInputChange={handleInputChange}
        workoutDetails={workoutDetails}
        state={dialogState()}
        setWorkoutDetails={setWorkoutDetails}
      />
    </Dialog>
  )
}
