/* c8 ignore start */
import { screen } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'

import { getHamburgerIconAriaLabel } from '~/components/app-bar/app-bar-helpers'

// Getters
export const getDashboardPageAppBarTitle = () => screen.getByText(/dashboard/i)

export const getWorkoutsPageAppBarTitle = () => screen.getByText(/workouts/i)

const getHamburgerIcon = () =>
  screen.getByLabelText(getHamburgerIconAriaLabel(false))

const getCloseNavBarIcon = () =>
  screen.getByLabelText(getHamburgerIconAriaLabel(true))

export const queryHamburgerIcon = () =>
  screen.queryByLabelText(getHamburgerIconAriaLabel(false))

export const queryCloseNavBarIcon = () =>
  screen.queryByLabelText(getHamburgerIconAriaLabel(true))

// Actions
export const clickHamburgerIcon = async () => {
  await userEvent.click(getHamburgerIcon())
}

export const clickCloseNavBarIcon = async () => {
  await userEvent.click(getCloseNavBarIcon())
}
