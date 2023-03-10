import { afterEach, describe, expect, it, beforeEach } from 'vitest'
import { render, screen } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'

import { workouts } from '~/mockedData'

import { WorkoutsTable } from '.'

describe('WorkoutsTable', () => {
  let unmountComponent: () => void

  beforeEach(() => {
    const { unmount } = render(() => <WorkoutsTable />)
    unmountComponent = unmount
  })

  afterEach(() => {
    unmountComponent()
  })

  it("should open the workout creation dialog when clicking 'add new workout' button", async () => {
    // Given
    const addWorkoutBtn = screen.getByLabelText(/add new workout/i)

    // When
    await userEvent.click(addWorkoutBtn)

    // Then
    expect(screen.getByText(/new workout/i)).toBeInTheDocument()
  })

  it('should close the workout creation dialog when clicking the close button', async () => {
    // Given
    const closeBtn = screen.getByLabelText(/close/i)

    // When
    await userEvent.click(closeBtn)

    // Then
    expect(screen.queryByText(/new workout/i)).not.toBeInTheDocument()
  })

  it("should open the workout creation dialog when pressing [Enter]/[Space] keydown on 'add new workout' button", async () => {
    // When
    await userEvent.tab()
    await userEvent.keyboard('[Enter]')

    // Then
    expect(screen.getByText(/new workout/i)).toBeInTheDocument()
  })

  it('should close the workout creation dialog when pressing [Enter]/[Space] keydown on the close button', async () => {
    // When
    await userEvent.tab()
    await userEvent.keyboard('[Enter]')

    // Then
    expect(screen.queryByText(/new workout/i)).not.toBeInTheDocument()
  })

  it('should close the workout creation dialog when pressing [Escape] keydown', async () => {
    // Given
    const addWorkoutBtn = screen.getByLabelText(/add new workout/i)

    // When
    await userEvent.click(addWorkoutBtn)
    await userEvent.tab()
    await userEvent.keyboard('[Escape]')

    // Then
    expect(screen.queryByText(/new workout/i)).not.toBeInTheDocument()
  })

  it('should save the newly created workout', async () => {
    // Given
    const mockedWorkoutName = 'Test workout'
    const mockedDescription = 'Test description'
    const mockedTotalReps = '999'
    const mockedWeek = '888'
    const mockedDate = '01.01.2020'
    const mockedDuration = '777'
    const addWorkoutBtn = screen.getByLabelText(/add new workout/i)
    const workoutsNumber = screen.getAllByTestId('workouts-table-row').length

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
    expect(screen.getAllByTestId('workouts-table-row').length).toBe(
      workoutsNumber + 1
    )
    expect(screen.getByText(mockedWorkoutName)).toBeInTheDocument()
    expect(screen.getByText(mockedDescription)).toBeInTheDocument()
    expect(screen.getByText(mockedTotalReps)).toBeInTheDocument()
    expect(screen.getByText(mockedWeek)).toBeInTheDocument()
    expect(screen.getByText(mockedDate)).toBeInTheDocument()
    expect(screen.getByText(mockedDuration)).toBeInTheDocument()
  })

  it('should open the selected workout details and close it by clicking the close button', async () => {
    // Given
    const { name, description, totalReps, week, date, duration } = workouts[0]
    const workoutToSelect = screen.getAllByText(name)[0]

    // When
    await userEvent.click(workoutToSelect)

    // Then
    const workoutNameInput = screen.getByLabelText(/workout name/i)
    const descriptionInput = screen.getByLabelText(/description/i)
    const totalRepsInput = screen.getByLabelText(/total reps/i)
    const weekInput = screen.getByLabelText(/week/i)
    const dateInput = screen.getByLabelText(/date/i)
    const durationInput = screen.getByLabelText(/duration/i)

    expect(screen.getByText(/Your Workout/i)).toBeInTheDocument()
    expect(workoutNameInput).toHaveValue(name)
    expect(descriptionInput).toHaveValue(description)
    expect(totalRepsInput).toHaveValue(+totalReps)
    expect(weekInput).toHaveValue(+week)
    expect(dateInput).toHaveValue(date)
    expect(durationInput).toHaveValue(+duration)

    // When
    await userEvent.click(screen.getByLabelText(/close/i))

    // Then
    expect(screen.queryByText(/Your Workout/i)).not.toBeInTheDocument()
  })

  it('should edit the selected workout', async () => {
    // Given
    const workoutToSelect = screen.getAllByText(workouts[0].name)[0]
    const workoutsNumber = screen.getAllByTestId('workouts-table-row').length
    const mockedWorkoutName = 'Test edit name'
    const mockedDescription = 'Test edit description'
    const mockedTotalReps = '1111'
    const mockedWeek = '2222'
    const mockedDate = '01.01.2000'
    const mockedDuration = '3333'

    // When
    await userEvent.click(workoutToSelect)
    await userEvent.click(screen.getByText(/edit/i))

    // Then
    const workoutNameInput = screen.getByLabelText(/workout name/i)
    const descriptionInput = screen.getByLabelText(/description/i)
    const totalRepsInput = screen.getByLabelText(/total reps/i)
    const weekInput = screen.getByLabelText(/week/i)
    const dateInput = screen.getByLabelText(/date/i)
    const durationInput = screen.getByLabelText(/duration/i)

    // When
    await userEvent.clear(workoutNameInput)
    await userEvent.type(workoutNameInput, mockedWorkoutName)

    await userEvent.clear(descriptionInput)
    await userEvent.type(descriptionInput, mockedDescription)

    await userEvent.clear(totalRepsInput)
    await userEvent.type(totalRepsInput, mockedTotalReps)

    await userEvent.clear(weekInput)
    await userEvent.type(weekInput, mockedWeek)

    await userEvent.clear(dateInput)
    await userEvent.type(dateInput, mockedDate)

    await userEvent.clear(durationInput)
    await userEvent.type(durationInput, mockedDuration)

    await userEvent.click(screen.getByText(/save/i))

    // Then
    expect(screen.queryByText(/Your Workout/i)).not.toBeInTheDocument()
    expect(screen.getAllByTestId('workouts-table-row').length).toBe(
      workoutsNumber
    )
    expect(screen.getByText(mockedWorkoutName)).toBeInTheDocument()
    expect(screen.getByText(mockedDescription)).toBeInTheDocument()
    expect(screen.getByText(mockedTotalReps)).toBeInTheDocument()
    expect(screen.getByText(mockedWeek)).toBeInTheDocument()
    expect(screen.getByText(mockedDate)).toBeInTheDocument()
    expect(screen.getByText(mockedDuration)).toBeInTheDocument()
  })
})
