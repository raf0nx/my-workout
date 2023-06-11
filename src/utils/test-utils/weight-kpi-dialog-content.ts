/* c8 ignore start */
import { screen } from '@solidjs/testing-library'

// Getters
export const getDialogContentText = () =>
  screen.getByText(/Put your current weight below:/i)

export const getNewWeightInput = () => screen.getByTestId('new-weight-input')

export const getWeightsTable = () => screen.getByTestId('weights-table')
