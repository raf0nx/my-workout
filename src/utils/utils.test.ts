import { describe, expect, it, vi } from 'vitest'

import {
  convertTextToPath,
  getCurrentDateInDDMMYYYYFormat,
  parseDateInDDMMYYYYFormat,
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
    const actual = getCurrentDateInDDMMYYYYFormat()

    // Then
    expect(actual).toBe(expected)
    vi.useRealTimers()
  })
})

describe('parseDateInDDMMYYYYFormat', () => {
  it('should parse date string in DD.MM.YYYY format to a Date object', () => {
    // Given
    const dateString = '14.05.2023'
    const expected = new Date('2023-05-14')

    // When
    const actual = parseDateInDDMMYYYYFormat(dateString)

    // Then
    expect(actual).toEqual(expected)
  })

  it('should handle single-digit day and month values', () => {
    // Given
    const dateString = '05.01.2023'
    const expected = new Date('2023-01-05')

    // When
    const actual = parseDateInDDMMYYYYFormat(dateString)

    // Then
    expect(actual).toEqual(expected)
  })

  it('should handle leap year', () => {
    // Given
    const dateString = '29.02.2024'
    const expected = new Date('2024-02-29')

    // When
    const actual = parseDateInDDMMYYYYFormat(dateString)

    // Then
    expect(actual).toEqual(expected)
  })
})
