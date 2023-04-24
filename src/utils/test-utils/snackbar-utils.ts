import { screen, waitForElementToBeRemoved } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'

// Getters
export const getSnackbar = () => screen.getByRole('alert')

export const querySnackbar = () => screen.queryByRole('alert')

const getCloseButton = () => screen.getByLabelText('Close')

export const queryCloseButton = () => screen.queryByLabelText('Close')

// Actions
export const closeSnackbar = async () => {
  await userEvent.click(getCloseButton())
  await waitForElementToBeRemoved(getSnackbar())
}
