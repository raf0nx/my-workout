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

  test('should save the newly created workout', async () => {
    // Given
    const mockedWorkoutName = 'Test workout'
    const mockedDescription = 'Test description'
    const mockedTotalReps = '100'
    const mockedWeek = '4'
    const mockedDate = '01.01.2020'
    const mockedDuration = '60'
    const addWorkoutBtn = screen.getByLabelText(/add new workout/i)

    // When
    await userEvent.click(addWorkoutBtn)

    // Given
    const workoutNameInput = screen.getByLabelText(/workout name/i)
    const descriptionInput = screen.getByLabelText(/description/i)
    const totalRepsInput = screen.getByLabelText(/total reps/i)
    const weekInput = screen.getByLabelText(/week/i)
    const dateInput = screen.getByLabelText(/date/i)
    const durationInput = screen.getByLabelText(/duration/i)

    // When
    await userEvent.type(workoutNameInput, mockedWorkoutName)
    await userEvent.type(descriptionInput, mockedDescription)
    await userEvent.type(totalRepsInput, mockedTotalReps)
    await userEvent.type(weekInput, mockedWeek)
    await userEvent.type(dateInput, mockedDate)
    await userEvent.type(durationInput, mockedDuration)
    await userEvent.click(screen.getByText(/save/i))

    // Then
    expect(screen.queryByText(/new workout/i)).not.toBeInTheDocument()
    expect(screen.getByText(mockedWorkoutName)).toBeInTheDocument()
    expect(screen.getByText(mockedDescription)).toBeInTheDocument()
    expect(screen.getByText(mockedTotalReps)).toBeInTheDocument()
    expect(screen.getByText(mockedWeek)).toBeInTheDocument()
    expect(screen.getByText(mockedDate)).toBeInTheDocument()
    expect(screen.getByText(mockedDuration)).toBeInTheDocument()
  })
})
