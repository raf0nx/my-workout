import {
  afterEach,
  describe,
  expect,
  test,
  beforeEach,
  afterAll,
  beforeAll,
} from 'vitest'
import { render, screen, waitFor } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'

import {
  flushDatabase,
  populateDatabaseWithMockedWorkout,
} from '~/utils/test-utils/utils'
import { getWorkouts } from '~/api/workouts'
import { workouts } from '~/mockedData'

import { WorkoutsTable } from '.'

const queryClient = new QueryClient()

describe('WorkoutsTable', () => {
  let unmountComponent: () => void

  beforeAll(async () => {
    await flushDatabase()
  })

  beforeEach(() => {
    const { unmount } = render(() => (
      <QueryClientProvider client={queryClient}>
        <WorkoutsTable />
      </QueryClientProvider>
    ))
    unmountComponent = unmount
  })

  afterEach(() => {
    unmountComponent()
  })

  afterAll(async () => {
    await flushDatabase()
  })

  describe('a11y', () => {
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

  describe('edit workout', () => {
    const mockedWorkout = workouts[0]
    const newName = 'Test edit name'
    const newDescription = 'Test edit description'
    const newTotalReps = '1111'
    const newWeek = '2222'
    const newDate = '01.01.2000'
    const newDuration = '3333'

    beforeAll(async () => {
      await populateDatabaseWithMockedWorkout(mockedWorkout)
    })

    afterAll(async () => {
      await flushDatabase()
    })

    test('should edit the selected workout and its exercises', async () => {
      // Given
      const workoutToSelect = await waitFor(() =>
        screen.getByText(mockedWorkout.name)
      )

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
      const firstExerciseSelect = screen.getByLabelText(/^exercise1$/i)
      const firstExerciseSecondSet = screen.getByLabelText(/exercise1-set2/i)

      // When
      await userEvent.clear(workoutNameInput)
      await userEvent.type(workoutNameInput, newName)
      await userEvent.clear(descriptionInput)
      await userEvent.type(descriptionInput, newDescription)
      await userEvent.clear(totalRepsInput)
      await userEvent.type(totalRepsInput, newTotalReps)
      await userEvent.clear(weekInput)
      await userEvent.type(weekInput, newWeek)
      await userEvent.clear(dateInput)
      await userEvent.type(dateInput, newDate)
      await userEvent.clear(durationInput)
      await userEvent.type(durationInput, newDuration)
      await userEvent.click(firstExerciseSelect)
      await userEvent.click(screen.getByText(/handstand/i))
      await userEvent.clear(firstExerciseSecondSet)
      await userEvent.type(firstExerciseSecondSet, '20')

      await userEvent.click(screen.getByText(/save/i))

      // Then
      expect(await getWorkouts()).toEqual([
        {
          id: expect.any(String),
          name: newName,
          description: newDescription,
          totalReps: newTotalReps,
          week: newWeek,
          date: newDate,
          duration: newDuration,
          exercises: {
            ...mockedWorkout.exercises,
            exercise1: { name: 'Handstand', sets: [5, 20, 4, 3, 2] },
          },
        },
      ])
    })
  })

  describe('create workout', () => {
    afterAll(async () => {
      await flushDatabase()
    })

    test('should save the newly created workout', async () => {
      // Given
      const mockedWorkoutName = 'Test workout'
      const mockedDescription = 'Test description'
      const mockedTotalReps = '999'
      const mockedWeek = '888'
      const mockedDate = '01.01.2020'
      const mockedDuration = '777'
      const addWorkoutBtn = screen.getByLabelText(/add new workout/i)

      // When
      await userEvent.click(addWorkoutBtn)
      await userEvent.click(screen.getByLabelText(/add next set/i))
      await userEvent.click(screen.getByLabelText(/add next exercise/i))

      // Then
      const workoutNameInput = screen.getByLabelText(/workout name/i)
      const descriptionInput = screen.getByLabelText(/description/i)
      const totalRepsInput = screen.getByLabelText(/total reps/i)
      const weekInput = screen.getByLabelText(/week/i)
      const dateInput = screen.getByLabelText(/date/i)
      const durationInput = screen.getByLabelText(/duration/i)
      const firstExerciseSelect = screen.getByLabelText(/^exercise1$/i)
      const firstExerciseFirstSet = screen.getByLabelText(/exercise1-set1/i)
      const firstExerciseSecondSet = screen.getByLabelText(/exercise1-set2/i)
      const secondExerciseSelect = screen.getByLabelText(/^exercise2$/i)
      const secondExerciseFirstSet = screen.getByLabelText(/exercise2-set1/i)

      // Then
      await userEvent.type(workoutNameInput, mockedWorkoutName)
      await userEvent.type(descriptionInput, mockedDescription)
      await userEvent.type(totalRepsInput, mockedTotalReps)
      await userEvent.type(weekInput, mockedWeek)
      await userEvent.type(dateInput, mockedDate)
      await userEvent.type(durationInput, mockedDuration)
      await userEvent.click(firstExerciseSelect)
      await userEvent.click(screen.getByText(/^muscle up$/i))
      await userEvent.type(firstExerciseFirstSet, '8')
      await userEvent.type(firstExerciseSecondSet, '6')
      await userEvent.click(secondExerciseSelect)
      await userEvent.click(screen.getByText(/bar dip/i))
      await userEvent.type(secondExerciseFirstSet, '12')

      await userEvent.click(screen.getByText(/save/i))

      // Then
      expect(screen.queryByText(/new workout/i)).not.toBeInTheDocument()
      expect(await getWorkouts()).toEqual([
        {
          id: expect.any(String),
          name: mockedWorkoutName,
          description: mockedDescription,
          totalReps: mockedTotalReps,
          week: mockedWeek,
          date: mockedDate,
          duration: mockedDuration,
          exercises: {
            exercise1: { name: 'Muscle Up', sets: [8, 6] },
            exercise2: { name: 'Bar Dip', sets: [12] },
          },
        },
      ])
    })
  })

  describe('show workout details', () => {
    const mockedWorkout = workouts[0]

    beforeAll(async () => {
      await populateDatabaseWithMockedWorkout(mockedWorkout)
    })

    afterAll(async () => {
      await flushDatabase()
    })

    test('should open the selected workout details and read its data', async () => {
      // Given
      const { name, description, totalReps, week, date, duration } =
        mockedWorkout
      const workoutToSelect = await waitFor(() => screen.getByText(name))

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
    })

    test('should correctly display workout exercises and their sets', async () => {
      // Given
      const firstExerciseSelect = screen.getByLabelText(/^exercise1$/i)
      const firstExerciseFirstSet = screen.getByLabelText(/exercise1-set1/i)
      const firstExerciseSecondSet = screen.getByLabelText(/exercise1-set2/i)
      const secondExerciseSelect = screen.getByLabelText(/^exercise2$/i)
      const secondExerciseFirstSet = screen.getByLabelText(/exercise2-set1/i)

      // Then
      expect(firstExerciseSelect).toHaveValue('Muscle Up')
      expect(firstExerciseFirstSet).toHaveValue(5)
      expect(firstExerciseSecondSet).toHaveValue(4)
      expect(secondExerciseSelect).toHaveValue('Bulgarian Squat')
      expect(secondExerciseFirstSet).toHaveValue(8)
    })

    test("should not show 'add next exercise/set' buttons in 'show' state", async () => {
      // Given
      const addNextExerciseBtn = screen.queryByLabelText(/add next exercise/i)
      const addNextSetButton = screen.queryByLabelText(/add next set/i)

      // Then
      expect(addNextExerciseBtn).not.toBeInTheDocument()
      expect(addNextSetButton).not.toBeInTheDocument()
      await userEvent.click(screen.getByLabelText(/close/i))
    })
  })
})
