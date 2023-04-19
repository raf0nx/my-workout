import { describe, test } from 'vitest'
import MockDate from 'mockdate'

import { getWorkoutDetailsInitialState } from './workouts-table-dialog-helper'

describe('getWorkoutDetailsInitialState', () => {
  test('should return workout details object in initial state', () => {
    // Given
    const mockedDate = '01.01.2023'
    MockDate.set(mockedDate)

    const expected = {
      name: '',
      description: '',
      totalReps: '',
      week: '1',
      date: mockedDate,
      duration: '',
      exercises: { exercise1: { name: '', sets: [0] } },
    }

    // When
    const actual = getWorkoutDetailsInitialState()

    // Then
    expect(actual).toStrictEqual(expected)
    MockDate.reset()
  })
})
