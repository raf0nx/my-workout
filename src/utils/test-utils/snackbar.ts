import { screen, waitForElementToBeRemoved } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'

import { getCloseBtn } from './utils'

// Getters
export const getSnackbar = () => screen.getByRole('alert')

export const querySnackbar = () => screen.queryByRole('alert')

// Actions
export const closeSnackbar = async () => {
  await userEvent.click(getCloseBtn())
  await waitForElementToBeRemoved(getSnackbar())
}
