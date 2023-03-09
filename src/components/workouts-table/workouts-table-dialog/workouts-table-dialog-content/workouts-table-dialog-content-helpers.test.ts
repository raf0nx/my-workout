import { describe, it } from 'vitest'

import {
  getInputProps,
  getInputVariant,
} from './workouts-table-dialog-content-helpers'

describe('getInputProps', () => {
  it('should return proper input properties for readonly input', () => {
    // Given
    const expected = { readOnly: true, disableUnderline: true }

    // When
    const actual = getInputProps(true)

    // Then
    expect(actual).toEqual(expected)
  })

  it('should NOT return any input properties for non-readonly input', () => {
    // Given
    const expected = {}

    // When
    const actual = getInputProps(false)

    // Then
    expect(actual).toEqual(expected)
  })
})

describe('getInputVariant', () => {
  it("should return 'filled' input variant for readonly input", () => {
    // Given
    const expected = 'filled'

    // When
    const actual = getInputVariant(true)

    // Then
    expect(actual).toEqual(expected)
  })

  it("should return 'outlined' input variant for non-readonly input", () => {
    // Given
    const expected = 'outlined'

    // When
    const actual = getInputVariant(false)

    // Then
    expect(actual).toEqual(expected)
  })
})
