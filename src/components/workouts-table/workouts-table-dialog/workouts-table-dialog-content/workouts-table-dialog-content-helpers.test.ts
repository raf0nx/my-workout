import { describe, it } from 'vitest'

import {
  getInputProps,
  getInputStyle,
} from './workouts-table-dialog-content-helpers'

describe('getInputProps', () => {
  it('should return proper input properties for readonly input', () => {
    // Given
    const expected = { readOnly: true, disabled: true }

    // When
    const actual = getInputProps(true)

    // Then
    expect(actual).toEqual(expected)
  })

  it('should NOT return any input properties for non-readonly input', () => {
    // Given
    const expected = { readOnly: false, disabled: false }

    // When
    const actual = getInputProps(false)

    // Then
    expect(actual).toEqual(expected)
  })
})

describe('getInputStyle', () => {
  it('should return input styles for readonly input', () => {
    // When
    const actual = getInputStyle(true)

    // Then
    expect(actual).toBeTruthy()
  })

  it('should NOT return any additional input styles for non-readonly input', () => {
    // When
    const actual = getInputStyle(false)

    // Then
    expect(actual).toBeUndefined()
  })
})
