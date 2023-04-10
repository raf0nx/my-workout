/* c8 ignore start */
import userEvent from '@testing-library/user-event'

import { postWorkout } from '~/api/workouts'
import { firebaseConfig } from '~/config/firebase-config'
import type { Workout } from '~/components/workouts-table/types'

export const flushDatabase = async () => {
  try {
    await fetch(
      `http://127.0.0.1:8080/emulator/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`,
      { method: 'DELETE' }
    )
  } catch (err) {
    console.error('Flushing the database went wrong!')
  }
}

export const populateDatabaseWithMockedWorkout = async (workout: Workout) => {
  await postWorkout(workout)
}

export const updateInput = async (input: HTMLElement, value: string) => {
  await userEvent.type(input, value)
}

export const clearAndUpdateInput = async (
  input: HTMLElement,
  value: string
) => {
  await userEvent.clear(input)
  await updateInput(input, value)
}

export const assertInputValue = (input: HTMLElement, value: string | number) => {
  expect(input).toHaveValue(value)
}
