/* c8 ignore start */
import { screen } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'

// Getters
export const getWeightKpiDialogHeader = () =>
  screen.getByText(/your weight history/i)

export const getCloseBtn = () => screen.getByText(/close/i)

export const getWeightKpiDialogContent = () =>
  screen.getByTestId('weight-kpi-dialog-content')

// Actions
export const clickCloseBtn = async () => {
  await userEvent.click(getCloseBtn())
}
