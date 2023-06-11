/* c8 ignore start */
import { screen } from '@solidjs/testing-library'

// Getters
export const getTableHeaderWeight = () => screen.getByText(/weight/i)

export const getTableHeaderDate = () => screen.getByText(/date/i)

export const getAllWeightsTableRows = () =>
  screen.getAllByTestId('weights-table-row')

export const getNoDataMessage = () => screen.getByText(/no data returned/i)

export const getLoadingMessage = () =>
  screen.getByText(/loading weights history/i)
