import { describe, expect, it } from 'vitest'
import { removeTrailingNonDigits } from './utils'

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
