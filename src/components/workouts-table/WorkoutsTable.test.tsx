import {
  afterEach,
  describe,
  expect,
  test,
  beforeEach,
  beforeAll,
} from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@solidjs/testing-library'

import {
  assertInputValue,
  flushDatabase,
  populateDatabaseWithMockedWorkout,
  updateExercise,
  clearAndUpdateExerciseSet,
  updateExerciseSet,
  getExerciseSelect,
  getExerciseSetInput,
  updateWorkoutDetails,
  selectWorkoutToEdit,
  saveWorkout,
  selectWorkout,
  prepareCreateNewWorkout,
  getInputByLabel,
  getAddNewWorkoutBtn,
  closeWorkoutDialog,
  getCreateWorkoutDialogHeader,
  queryCreateWorkoutDialogHeader,
  getWorkoutDetailsDialogHeader,
  queryAddNextExerciseBtn,
  queryAddNextSetBtn,
} from '~/utils/test-utils/utils'
import { getWorkouts } from '~/api/workouts'
import { workouts } from '~/mocked-data'
import { customRender } from '~/utils/test-utils/CustomRender'

import { WorkoutsTable } from '.'
import type { Workout } from './types'

describe('WorkoutsTable', () => {
  let unmountComponent: () => void

  beforeAll(async () => {
    await flushDatabase()
  })

  beforeEach(() => {
    const { unmount } = customRender(() => <WorkoutsTable />)
    unmountComponent = unmount
  })

  afterEach(async () => {
    await flushDatabase()
    unmountComponent()
  })

  describe('table content', () => {
    beforeAll(async () => {
      await Promise.all([
        populateDatabaseWithMockedWorkout(workouts[0]),
        populateDatabaseWithMockedWorkout(workouts[1]),
        populateDatabaseWithMockedWorkout(workouts[2]),
      ])
    })

    test('should be sorted by date descending', async () => {
      // Given
      const [firstWorkout, secondWorkout, thirdWorkout] = await waitFor(() =>
        screen.getAllByTestId('workouts-table-row')
      )

      // Then
      expect(firstWorkout.compareDocumentPosition(secondWorkout)).toBe(4)
      expect(secondWorkout.compareDocumentPosition(thirdWorkout)).toBe(4)
    })
  })

  describe('a11y', () => {
    test("should open the workout creation dialog when clicking 'add new workout' button", async () => {
      // When
      await userEvent.click(getAddNewWorkoutBtn())

      // Then
      expect(getCreateWorkoutDialogHeader()).toBeInTheDocument()
    })

    test('should close the workout creation dialog when clicking the close button', async () => {
      // When
      await closeWorkoutDialog()

      // Then
      expect(queryCreateWorkoutDialogHeader()).not.toBeInTheDocument()
    })

    test("should open the workout creation dialog when pressing [Enter]/[Space] keydown on 'add new workout' button", async () => {
      // When
      await userEvent.tab()
      await userEvent.keyboard('[Enter]')

      // Then
      expect(getCreateWorkoutDialogHeader()).toBeInTheDocument()
    })

    test('should close the workout creation dialog when pressing [Enter]/[Space] keydown on the close button', async () => {
      // When
      await userEvent.tab()
      await userEvent.keyboard('[Enter]')

      // Then
      expect(queryCreateWorkoutDialogHeader()).not.toBeInTheDocument()
    })

    test('should close the workout creation dialog when pressing [Escape] keydown', async () => {
      // When
      await userEvent.click(getAddNewWorkoutBtn())
      await userEvent.tab()
      await userEvent.keyboard('[Escape]')

      // Then
      expect(queryCreateWorkoutDialogHeader()).not.toBeInTheDocument()
    })
  })

  describe('edit workout', () => {
    const mockedWorkout = workouts[0]

    beforeAll(async () => {
      await populateDatabaseWithMockedWorkout(mockedWorkout)
    })

    test('should edit the selected workout and its exercises', async () => {
      // Given
      const fieldsToUpdate: Omit<Workout, 'exercises'> = {
        name: 'Test edit name',
        description: 'Test edit description',
        totalReps: '1111',
        week: '2222',
        date: '01.01.2000',
        duration: '3333',
      }

      // When
      await selectWorkoutToEdit(mockedWorkout.name)
      await updateWorkoutDetails(fieldsToUpdate)
      await updateExercise(1, 'Handstand')
      await clearAndUpdateExerciseSet(1, 2, '20')
      await saveWorkout()

      // Then
      expect(queryCreateWorkoutDialogHeader()).not.toBeInTheDocument()
      expect(await getWorkouts()).toEqual([
        {
          id: expect.any(String),
          ...fieldsToUpdate,
          exercises: {
            ...mockedWorkout.exercises,
            exercise1: { name: 'Handstand', sets: [5, 20, 4, 3, 2] },
          },
        },
      ])
    })
  })

  describe('create workout', () => {
    test('should save the newly created workout', async () => {
      // Given
      const mockedWorkout: Omit<Workout, 'exercises'> = {
        name: 'Test workout',
        description: 'Test description',
        totalReps: '999',
        week: '888',
        date: '01.01.2020',
        duration: '777',
      }

      // When
      await prepareCreateNewWorkout()
      await updateWorkoutDetails(mockedWorkout)
      await updateExercise(1, 'Muscle Up')
      await updateExercise(2, 'Bar Dip')
      await updateExerciseSet(1, 1, '8')
      await updateExerciseSet(1, 2, '6')
      await updateExerciseSet(2, 1, '12')
      await saveWorkout()

      // Then
      expect(queryCreateWorkoutDialogHeader()).not.toBeInTheDocument()
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

    test('should open the selected workout details and read its data', async () => {
      // Given
      const { name, description, totalReps, week, date, duration } =
        mockedWorkout

      // When
      await selectWorkout(name)

      // Then
      expect(getWorkoutDetailsDialogHeader()).toBeInTheDocument()
      assertInputValue(getInputByLabel('Workout name'), name)
      assertInputValue(getInputByLabel('Description'), description)
      assertInputValue(getInputByLabel('Total reps'), +totalReps)
      assertInputValue(getInputByLabel('Week'), +week)
      assertInputValue(getInputByLabel('Date'), date)
      assertInputValue(getInputByLabel('Duration'), +duration)
      assertInputValue(getExerciseSelect(1), 'Muscle Up')
      assertInputValue(getExerciseSetInput(1, 1), 5)
      assertInputValue(getExerciseSetInput(1, 2), 4)
      assertInputValue(getExerciseSelect(2), 'Bulgarian Squat')
      assertInputValue(getExerciseSetInput(2, 1), 8)
    })

    test("should not show 'add next exercise/set' buttons in 'show' state", async () => {
      // Then
      expect(queryAddNextExerciseBtn()).not.toBeInTheDocument()
      expect(queryAddNextSetBtn()).not.toBeInTheDocument()
      await closeWorkoutDialog()
    })
  })
})
