import { describe, it } from 'vitest'

import { SnackbarSeverity } from '~/components/snackbar/types'

import { getInitialSnackbarProps } from './snackbar-context-helpers'

describe('getInitialSnackbarProps', () => {
  it('should correctly return initial snackbar props ', () => {
    // Given
    const expected = {
      title: '',
      description: '',
      severity: SnackbarSeverity.SUCCESS,
      dismissable: false,
      timeout: 5000,
    }

    // When
    const actual = getInitialSnackbarProps()

    // Then
    expect(actual).toEqual(expected)
  })
})
