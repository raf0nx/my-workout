import { afterAll, beforeAll, describe, test } from 'vitest'
import { collection, getDocs } from 'firebase/firestore'

import { workouts } from '~/mocked-data'
import {
  flushDatabase,
  populateDatabaseWithMockedWorkout,
} from '~/utils/test-utils'
import { db } from '~/config/firebase-config'
import { WORKOUTS_DOC_ID } from '~/constants'
import { keys } from '~/utils/utils'

import {
  formatISO8601ToWorkoutDate,
  formatWorkoutDateToISO8601,
  sortWorkoutExercises,
  transformDocsToWorkoutObjects,
} from './workouts-helper'

describe('transformDocsToWorkoutObjects', () => {
  beforeAll(async () => {
    await populateDatabaseWithMockedWorkout(workouts[0])
  })

  afterAll(async () => {
    await flushDatabase()
  })

  test('should transform workouts docs to javascript objects', async () => {
    // Given
    const data = await getDocs(collection(db, WORKOUTS_DOC_ID))
    const expected = workouts[0]

    // When
    const actual = transformDocsToWorkoutObjects(data)

    // Then
    expect(actual).toEqual([{ ...expected, id: expect.any(String) }])
  })
})

describe('sortWorkoutExercises', () => {
  test('should sort the workout exercises keys in ascending order', async () => {
    // Given
    const mockedWorkoutExercises = workouts[0].exercises
    const unsortedExercises = {
      exercise5: mockedWorkoutExercises['exercise5'],
      exercise2: mockedWorkoutExercises['exercise2'],
      exercise4: mockedWorkoutExercises['exercise4'],
      exercise1: mockedWorkoutExercises['exercise1'],
      exercise6: mockedWorkoutExercises['exercise6'],
      exercise3: mockedWorkoutExercises['exercise3'],
    }

    // When
    const actual = sortWorkoutExercises(unsortedExercises)

    // Then
    expect(keys(actual)).toStrictEqual(keys(mockedWorkoutExercises))
  })
})

describe('formatISO8601ToWorkoutDate', () => {
  test('should format date in ISO8601 to workout date format', () => {
    // Given
    const mockedISO8601Date = '2020-09-16T00:00:00+02:00'
    const expected = '16.09.2020'

    // When
    const actual = formatISO8601ToWorkoutDate(mockedISO8601Date)

    // Then
    expect(actual).toBe(expected)
  })
})

describe('formatWorkoutDateToISO8601', () => {
  test('should format workout date to date in ISO8601 format', () => {
    // Given
    const mockedWorkoutDate = '16.09.2020'
    const expected = '2020-09-16T00:00:00+02:00'

    // When
    const actual = formatWorkoutDateToISO8601(mockedWorkoutDate)

    // Then
    expect(actual).toBe(expected)
  })
})
