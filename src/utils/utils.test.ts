import { describe, expect, it, vi } from 'vitest'

import {
  convertTextToPath,
  getCurrentDateInDDMMYYYYFormat,
  removeTrailingNonDigits,
} from './utils'

import { HOME_PATH } from '~/constants'

describe('removeTrailingNonDigits', () => {
  it.each`
    string          | expected
    ${'123'}        | ${'123'}
    ${'test123'}    | ${'123'}
    ${'123test'}    | ${'123test'}
    ${'123test123'} | ${'123test123'}
  `('should remove trailing non-digits', ({ string, expected }) => {
    // When
    const actual = removeTrailingNonDigits(string)

    // Then
    expect(actual).toBe(expected)
  })
})

describe('convertTextToPath', () => {
  it('should return the expected path when given a text', () => {
    // Given
    const text = 'Dummy'
    const expected = HOME_PATH + 'dummy'

    // When
    const actual = convertTextToPath(text)

    // Then
    expect(actual).toBe(expected)
  })
})

describe('getCurrentDateInDDMMYYYYFormat', () => {
  it('should return the current date in DD.MM.YYYY format', () => {
    // Given
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2023-05-14T12:34:56'))
    const expected = '14.05.2023'

    // When
    const result = getCurrentDateInDDMMYYYYFormat()

    // Then
    expect(result).toBe(expected)
    vi.useRealTimers()
  })
})
