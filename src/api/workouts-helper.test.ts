import { afterAll, beforeAll, describe, test } from 'vitest'
import { collection, getDocs } from 'firebase/firestore'

import { workouts } from '~/mockedData'
import {
  flushDatabase,
  populateDatabaseWithMockedWorkout,
} from '~/utils/test-utils/utils'
import { db } from '~/config/firebase-config'
import { WORKOUTS_DOC_ID } from '~/constants'
import { keys } from '~/utils/utils'

import {
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
