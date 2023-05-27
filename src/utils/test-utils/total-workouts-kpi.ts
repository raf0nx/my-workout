/* c8 ignore start */
import { screen } from '@solidjs/testing-library'

import { workouts } from '~/mocked-data'

// Getters
export const getTotalWorkoutsKpiDescription = () =>
  screen.getByText(/total workouts/i)

export const getTotalWorkoutsKpiValue = () => screen.getByText(workouts.length)

export const getTotalWorkoutsKpiIcon = () =>
  screen.getByTestId(/SportsGymnasticsIcon/i)
