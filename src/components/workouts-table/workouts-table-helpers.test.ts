import { describe, it } from 'vitest'

import { SnackbarSeverity } from '~/components/snackbar/types'

import { getGetWorkoutsErrorSnackbarProps } from './workouts-table-helpers'

describe('getGetWorkoutsErrorSnackbarProps', () => {
  it('should return proper snackbar props when getting workouts data failed', () => {
    // Given
    const expected = {
      title: 'Error',
      description: 'Failed to fetch workouts. Please try again.',
      dismissable: true,
      severity: SnackbarSeverity.ERROR,
    }

    // When
    const actual = getGetWorkoutsErrorSnackbarProps()

    // Then
    expect(actual).toEqual(expected)
  })
})
