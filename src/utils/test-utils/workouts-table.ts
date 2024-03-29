/* c8 ignore start */
import { screen, waitFor } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'

import type { Workout } from '~/components/workouts-table/types'

import {
  assertElementToBeInTheDocument,
  clearAndUpdateInput,
  getCloseBtn,
  getEditBtn,
  getInputByLabel,
  getSaveBtn,
  updateInput,
} from './utils'

// Getters
export const getExerciseSelect = (exerciseNumber: number) => {
  return screen.getByLabelText(`exercise${exerciseNumber}`)
}

export const getExerciseSetInput = (exerciseNumber: number, set: number) => {
  return screen.getByLabelText(`exercise${exerciseNumber}-set${set}`)
}

export const getAddNewWorkoutBtn = () => {
  return screen.getByLabelText(/add new workout/i)
}

export const getCreateWorkoutDialogHeader = () => {
  return screen.getByText(/new workout/i)
}

export const getWorkoutsTableRows = () => {
  return waitFor(() => screen.getAllByTestId('workouts-table-row'))
}

export const queryCreateWorkoutDialogHeader = () => {
  return screen.queryByText(/new workout/i)
}

export const getWorkoutDetailsDialogHeader = () => {
  return screen.getByText(/Your Workout/i)
}

export const getAddNextExerciseBtn = () => {
  return screen.getByLabelText(/add next exercise/i)
}

export const getAddNextSetBtn = () => {
  return screen.getByLabelText(/add next set/i)
}

export const queryAddNextExerciseBtn = () => {
  return screen.queryByLabelText(/add next exercise/i)
}

export const queryAddNextSetBtn = () => {
  return screen.queryByLabelText(/add next set/i)
}

export const getExerciseName = (exerciseName: string) => {
  return screen.getByText(exerciseName)
}

export const getWorkoutByName = (name: string) => {
  return screen.getByText(name)
}

export const getWorkoutSaveSnackbar = () => {
  return waitFor(() => screen.getByText(/workout saved successfully/i))
}

// Actions
export const updateExercise = async (
  exerciseNumber: number,
  newExercise: string
) => {
  await userEvent.click(getExerciseSelect(exerciseNumber))
  await userEvent.click(getExerciseName(newExercise))
}

export const updateExerciseSet = async (
  exerciseNumber: number,
  set: number,
  value: string
) => {
  await updateInput(getExerciseSetInput(exerciseNumber, set), value)
}

export const clearAndUpdateExerciseSet = async (
  exerciseNumber: number,
  set: number,
  value: string
) => {
  await clearAndUpdateInput(getExerciseSetInput(exerciseNumber, set), value)
}

export const updateWorkoutDetails = async (
  fieldsToUpdate: Omit<Workout, 'exercises'>
) => {
  await clearAndUpdateInput(
    getInputByLabel('Workout name'),
    fieldsToUpdate.name
  )
  await clearAndUpdateInput(
    getInputByLabel('Description'),
    fieldsToUpdate.description
  )
  await clearAndUpdateInput(
    getInputByLabel('Total reps'),
    fieldsToUpdate.totalReps
  )
  await clearAndUpdateInput(getInputByLabel('Week'), fieldsToUpdate.week)
  await clearAndUpdateInput(getInputByLabel('Date'), fieldsToUpdate.date)
  await clearAndUpdateInput(
    getInputByLabel('Duration'),
    fieldsToUpdate.duration
  )
}

export const selectWorkout = async (workoutNameToSelect: string) => {
  const selectedWorkout = await waitFor(() =>
    getWorkoutByName(workoutNameToSelect)
  )

  await userEvent.click(selectedWorkout)
}

export const selectWorkoutToEdit = async (workoutNameToSelect: string) => {
  await selectWorkout(workoutNameToSelect)
  await userEvent.click(getEditBtn())
}

export const saveWorkout = async () => {
  await userEvent.click(getSaveBtn())
}

export const closeWorkoutDialog = async () => {
  await userEvent.click(getCloseBtn())
}

export const prepareCreateNewWorkout = async () => {
  await userEvent.click(getAddNewWorkoutBtn())

  await userEvent.click(getAddNextSetBtn())
  await userEvent.click(getAddNextExerciseBtn())
}

// Assertions
export const assertWorkoutInWorkoutsTable = (workout: Workout) => {
  assertElementToBeInTheDocument(screen.getByText(workout.name))
  assertElementToBeInTheDocument(screen.getByText(workout.description))
  assertElementToBeInTheDocument(screen.getByText(workout.totalReps))
  assertElementToBeInTheDocument(screen.getByText(workout.week))
  assertElementToBeInTheDocument(screen.getByText(workout.date))
  assertElementToBeInTheDocument(screen.getByText(workout.duration))
}
