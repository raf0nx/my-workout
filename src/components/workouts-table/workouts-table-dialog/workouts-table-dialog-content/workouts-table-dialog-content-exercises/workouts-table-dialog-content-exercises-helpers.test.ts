import { describe, it, expect } from 'vitest'

import { exercises } from '~/mockedData'

import {
  getMaxColumnNumber,
  getConsecutiveNumberOfColumns,
  getSetIdxFromTargetSet,
} from './workouts-table-dialog-content-exercises-helpers'

describe('getConsecutiveNumberOfColumns', () => {
  it('should return an array of consecutive column numbers', () => {
    // Given
    const expected = [1, 2, 3, 4, 5]

    // When
    const actual = getConsecutiveNumberOfColumns(5)

    // Then
    expect(actual).toEqual(expected)
  })
})

describe('getMaxColumnNumber', () => {
  it('should return a maximum column number based on the largest set among exercises', () => {
    // Given
    const expected = 5

    // When
    const actual = getMaxColumnNumber(Object.values(exercises))

    // Then
    expect(actual).toBe(expected)
  })
})

describe('getSetIdxFromTargetSet', () => {
  it('should return a set idx from the target set input name', () => {
    // Given
    const expected = 1
    const exerciseSetInputName = 'set2'

    // When
    const actual = getSetIdxFromTargetSet(exerciseSetInputName)

    // Then
    expect(actual).toBe(expected)
  })
})
