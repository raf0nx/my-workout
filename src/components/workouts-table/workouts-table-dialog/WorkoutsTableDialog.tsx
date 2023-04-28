import { Dialog } from '@suid/material'
import type { ChangeEvent } from '@suid/types'
import { createStore, produce } from 'solid-js/store'
import { createEffect, createSignal } from 'solid-js'
import { createMutation, useQueryClient } from '@tanstack/solid-query'

import { TransitionSlideUp } from '~/utils/transition-slide-up'
import type {
  Workout,
  WorkoutDetailsProps,
} from '~/components/workouts-table/types'
import { postWorkout, updateWorkout } from '~/api/workouts'
import { invalidateGetWorkoutsQuery } from '~/api/workouts-helper'
import { useSnackbar } from '~/contexts/SnackbarContext'

import type { WorkoutsTableDialogProps } from './types'
import { WorkoutsTableDialogBar, WorkoutsTableDialogContent } from '.'
import { getWorkoutDetailsInitialState } from './workouts-table-dialog-helper'

// TODO: Implement Dialog's accessibility
export default function WorkoutsTableDialog(props: WorkoutsTableDialogProps) {
  const queryClient = useQueryClient()
  const { showSnackbar } = useSnackbar()

  const workoutPostMutation = createMutation(
    (workoutData: Workout) => postWorkout(workoutData),
    {
      onSuccess: () => invalidateGetWorkoutsQuery(queryClient),
    }
  )

  const workoutUpdateMutation = createMutation(
    (workoutData: Workout) => updateWorkout(workoutData),
    {
      onSuccess: () => invalidateGetWorkoutsQuery(queryClient),
    }
  )

  const [workoutDetails, setWorkoutDetails] = createStore(
    props.workout || getWorkoutDetailsInitialState()
  )

  const [dialogState, setDialogState] = createSignal(props.state)

  createEffect(() => {
    workoutPostMutation.isSuccess && showSnackbar()
    workoutUpdateMutation.isSuccess && showSnackbar()
  })

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => {
    const fieldToUpdate = event.target.name as WorkoutDetailsProps

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
    setWorkoutDetails(getWorkoutDetailsInitialState())
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
