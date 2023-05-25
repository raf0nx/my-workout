import { describe, it, expect } from 'vitest'

import { workouts } from '~/mocked-data'

import { getTotalWorkoutsAmount } from './total-workouts-kpi-helpers'

describe('getTotalWorkoutsAmount', () => {
  it.each`
    workouts     | expected           | description
    ${workouts}  | ${workouts.length} | ${'a valid workout array'}
    ${[]}        | ${0}               | ${'an empty workout array'}
    ${undefined} | ${0}               | ${'an undefined'}
  `(
    'should return the correct total workouts amount for $description',
    ({ workouts, expected }) => {
      // Then
      expect(getTotalWorkoutsAmount(workouts)).toBe(expected)
    }
  )
})
