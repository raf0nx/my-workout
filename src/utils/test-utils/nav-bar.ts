/* c8 ignore start */
import { screen } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'

import { NAVBAR_ITEMS } from '~/constants'

const navItems = Object.values(NAVBAR_ITEMS)

// Getters
export const getNavBarItems = () => screen.getAllByRole(/listitem/)

const getSingleNavBarItem = (itemIdx: number) =>
  screen.getByText(navItems[itemIdx])

export const getDashboardIcon = () => screen.getByTestId(/DashboardIcon/i)

export const getWorkoutsIcon = () => screen.getByTestId(/FitnessCenterIcon/i)

// Actions
export const clickNavBarItem = async (itemIdx: number) => {
  await userEvent.click(getSingleNavBarItem(itemIdx))
}
