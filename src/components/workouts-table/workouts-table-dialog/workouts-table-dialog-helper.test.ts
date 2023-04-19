import { describe, test } from 'vitest'
import MockDate from 'mockdate'

import { getWorkoutDetailsInitialState } from './workouts-table-dialog-helper'

describe('getWorkoutDetailsInitialState', () => {
  test('should return workout details object in initial state', () => {
    // Given
    MockDate.set('01.01.2023')
    const expected = {
      name: '',
      description: '',
      totalReps: '',
      week: '1',
      date: '01.01.2023',
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
