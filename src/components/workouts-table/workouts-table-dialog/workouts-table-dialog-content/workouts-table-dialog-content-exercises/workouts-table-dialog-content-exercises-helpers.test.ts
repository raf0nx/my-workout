import { describe, it } from 'vitest'

import { exercises } from '~/mockedData'

import {
  getMaxSetsColumnsNumber,
  getNumberOfSetsColumns,
} from './workouts-table-dialog-content-exercises-helpers'

describe('getNumberOfSetsColumns', () => {
  it('should return an array of consecutive column numbers', () => {
    // Given
    const expected = [1, 2, 3, 4, 5]

    // When
    const actual = getNumberOfSetsColumns(Object.values(exercises))

    // Then
    expect(actual).toEqual(expected)
  })
})

describe('getMaxSetsColumnsNumber', () => {
  it('should return a maximum number of sets among given exercises', () => {
    // Given
    const expected = 5

    // When
    const actual = getMaxSetsColumnsNumber(Object.values(exercises))

    // Then
    expect(actual).toBe(expected)
  })
})
