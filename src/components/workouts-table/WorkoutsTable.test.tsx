import {
  afterEach,
  describe,
  expect,
  test,
  beforeEach,
  afterAll,
  beforeAll,
} from 'vitest'
import { screen, waitFor } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'

import {
  assertInputValue,
  clearAndUpdateInput,
  flushDatabase,
  populateDatabaseWithMockedWorkout,
  updateExercise,
  clearAndUpdateExerciseSet,
  updateInput,
  updateExerciseSet,
  getExerciseSelect,
  getExerciseSetInput,
} from '~/utils/test-utils/utils'
import { getWorkouts } from '~/api/workouts'
import { workouts } from '~/mocked-data'

import { WorkoutsTable } from '.'
import { customRender } from '~/utils/test-utils/CustomRender'

describe('WorkoutsTable', () => {
  let unmountComponent: () => void

  beforeAll(async () => {
    await flushDatabase()
  })

  beforeEach(() => {
    const { unmount } = customRender(() => <WorkoutsTable />)
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

    beforeAll(async () => {
      await populateDatabaseWithMockedWorkout(mockedWorkout)
    })

    afterAll(async () => {
      await flushDatabase()
    })

    test('should edit the selected workout and its exercises', async () => {
      // Given
      const fieldsToEdit = {
        name: 'Test edit name',
        description: 'Test edit description',
        totalReps: '1111',
        week: '2222',
        date: '01.01.2000',
        duration: '3333',
      }
      const selectedWorkout = await waitFor(() =>
        screen.getByText(mockedWorkout.name)
      )

      // When
      await userEvent.click(selectedWorkout)
      await userEvent.click(screen.getByText(/edit/i))

      await clearAndUpdateInput(
        screen.getByLabelText(/workout name/i),
        fieldsToEdit.name
      )
      await clearAndUpdateInput(
        screen.getByLabelText(/description/i),
        fieldsToEdit.description
      )
      await clearAndUpdateInput(
        screen.getByLabelText(/total reps/i),
        fieldsToEdit.totalReps
      )
      await clearAndUpdateInput(
        screen.getByLabelText(/week/i),
        fieldsToEdit.week
      )
      await clearAndUpdateInput(
        screen.getByLabelText(/date/i),
        fieldsToEdit.date
      )
      await clearAndUpdateInput(
        screen.getByLabelText(/duration/i),
        fieldsToEdit.duration
      )

      await updateExercise(1, 'Handstand')
      await clearAndUpdateExerciseSet(1, 2, '20')

      await userEvent.click(screen.getByText(/save/i))

      // Then
      expect(screen.queryByText(/new workout/i)).not.toBeInTheDocument()
      expect(await getWorkouts()).toEqual([
        {
          id: expect.any(String),
          ...fieldsToEdit,
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
      const mockedWorkout = {
        name: 'Test workout',
        description: 'Test description',
        totalReps: '999',
        week: '888',
        date: '01.01.2020',
        duration: '777',
      }
      const addWorkoutBtn = screen.getByLabelText(/add new workout/i)

      // When
      await userEvent.click(addWorkoutBtn)
      await userEvent.click(screen.getByLabelText(/add next set/i))
      await userEvent.click(screen.getByLabelText(/add next exercise/i))

      await updateInput(
        screen.getByLabelText(/workout name/i),
        mockedWorkout.name
      )
      await updateInput(
        screen.getByLabelText(/description/i),
        mockedWorkout.description
      )
      await updateInput(
        screen.getByLabelText(/total reps/i),
        mockedWorkout.totalReps
      )
      await updateInput(screen.getByLabelText(/week/i), mockedWorkout.week)
      await updateInput(screen.getByLabelText(/date/i), mockedWorkout.date)
      await updateInput(
        screen.getByLabelText(/duration/i),
        mockedWorkout.duration
      )

      await updateExercise(1, 'Muscle Up')
      await updateExercise(2, 'Bar Dip')
      await updateExerciseSet(1, 1, '8')
      await updateExerciseSet(1, 2, '6')
      await updateExerciseSet(2, 1, '12')

      await userEvent.click(screen.getByText(/save/i))

      // Then
      expect(screen.queryByText(/new workout/i)).not.toBeInTheDocument()
      expect(await getWorkouts()).toEqual([
        {
          id: expect.any(String),
          ...mockedWorkout,
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
      await userEvent.click(screen.getByLabelText(/close/i))
      await flushDatabase()
    })

    test('should open the selected workout details and read its data', async () => {
      // Given
      const { name, description, totalReps, week, date, duration } =
        mockedWorkout
      const selectedWorkout = await waitFor(() => screen.getByText(name))

      // When
      await userEvent.click(selectedWorkout)

      // Then
      expect(screen.getByText(/Your Workout/i)).toBeInTheDocument()
      assertInputValue(screen.getByLabelText(/workout name/i), name)
      assertInputValue(screen.getByLabelText(/description/i), description)
      assertInputValue(screen.getByLabelText(/total reps/i), +totalReps)
      assertInputValue(screen.getByLabelText(/week/i), +week)
      assertInputValue(screen.getByLabelText(/date/i), date)
      assertInputValue(screen.getByLabelText(/duration/i), +duration)
      assertInputValue(getExerciseSelect(1), 'Muscle Up')
      assertInputValue(getExerciseSetInput(1, 1), 5)
      assertInputValue(getExerciseSetInput(1, 2), 4)
      assertInputValue(getExerciseSelect(2), 'Bulgarian Squat')
      assertInputValue(getExerciseSetInput(2, 1), 8)
    })

    test("should not show 'add next exercise/set' buttons in 'show' state", async () => {
      // Given
      const addNextExerciseBtn = screen.queryByLabelText(/add next exercise/i)
      const addNextSetButton = screen.queryByLabelText(/add next set/i)

      // Then
      expect(addNextExerciseBtn).not.toBeInTheDocument()
      expect(addNextSetButton).not.toBeInTheDocument()
    })
  })
})
