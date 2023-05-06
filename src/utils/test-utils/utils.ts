/* c8 ignore start */
import userEvent from '@testing-library/user-event'
import { screen } from '@solidjs/testing-library'

import { postWorkout } from '~/api/workouts'
import { firebaseConfig } from '~/config/firebase-config'
import type { Workout } from '~/components/workouts-table/types'
import { DOCUMENT_POSITION_FOLLOWING } from '~/constants'

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

// Domain-specific utils

// Getters
export const getInputByLabel = (label: string) => {
  return screen.getByLabelText(label)
}

export const getEditBtn = () => {
  return screen.getByText(/^edit$/i)
}

export const getSaveBtn = () => {
  return screen.getByText(/^save$/i)
}

export const getCloseBtn = () => {
  return screen.getByLabelText(/^close$/i)
}

export const queryCloseBtn = () => {
  return screen.queryByLabelText(/^close$/i)
}

// Actions
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

// Assertions
export const assertInputValue = (
  input: HTMLElement,
  value: string | number
) => {
  expect(input).toHaveValue(value)
}

export const assertElementToBeInTheDocument = (element: HTMLElement) => {
  expect(element).toBeInTheDocument()
}

export const assertElementNotToBeInTheDocument = (
  element: HTMLElement | null
) => {
  expect(element).not.toBeInTheDocument()
}

export const assertFirstNodePrecedeNextOne = (
  firstNode: HTMLElement,
  secondNode: HTMLElement
) => {
  expect(firstNode.compareDocumentPosition(secondNode)).toBe(
    DOCUMENT_POSITION_FOLLOWING
  )
}
