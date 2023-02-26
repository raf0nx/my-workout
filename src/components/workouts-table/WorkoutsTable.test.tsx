import { render, screen } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'

import WorkoutsTable from './WorkoutsTable'

describe('WorkoutsTable', () => {
  let unmountComponent: () => void

  beforeEach(() => {
    const { unmount } = render(() => <WorkoutsTable />)
    unmountComponent = unmount
  })

  afterEach(() => {
    unmountComponent()
  })

  test("should open the workout creation dialog when clicking 'add new workout' button", async () => {
    // Given
    const addWorkoutBtn = screen.getByLabelText(/add new workout/i)

    // When
    await userEvent.click(addWorkoutBtn)

    // Then
    expect(screen.getByText(/new workout/i)).toBeInTheDocument()
  })

  test('should close the workout creation dialog when clicking the close button', async () => {
    // Given
    const closeBtn = screen.getByLabelText(/close/i)

    // When
    await userEvent.click(closeBtn)

    // Then
    expect(screen.queryByText(/new workout/i)).not.toBeInTheDocument()
  })

  test("should open the workout creation dialog when pressing [Enter]/[Space] keydown on 'add new workout' button", async () => {
    // When
    await userEvent.tab()
    await userEvent.keyboard('[Enter]')

    // Then
    expect(screen.getByText(/new workout/i)).toBeInTheDocument()
  })

  test('should close the workout creation dialog when pressing [Enter]/[Space] keydown on the close button', async () => {
    // When
    await userEvent.tab()
    await userEvent.keyboard('[Enter]')

    // Then
    expect(screen.queryByText(/new workout/i)).not.toBeInTheDocument()
  })

  test('should close the workout creation dialog when pressing [Escape] keydown', async () => {
    // Given
    const addWorkoutBtn = screen.getByLabelText(/add new workout/i)

    // When
    await userEvent.click(addWorkoutBtn)
    await userEvent.tab()
    await userEvent.keyboard('[Escape]')

    // Then
    expect(screen.queryByText(/new workout/i)).not.toBeInTheDocument()
  })
})
