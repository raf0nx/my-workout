import { describe, expect, it } from 'vitest'

import { convertTextToPath, removeTrailingNonDigits } from './utils'

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
