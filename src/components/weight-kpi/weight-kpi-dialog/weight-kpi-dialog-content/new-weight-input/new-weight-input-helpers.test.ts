import { SnackbarSeverity } from '~/components/snackbar/types'

import {
  getAddNewUserWeightSuccessSnackbarProps,
  getAddNewUserWeightErrorSnackbarProps,
} from './new-weight-input-helpers'

describe('getAddNewUserWeightSuccessSnackbarProps', () => {
  it('should return the correct snackbar props when adding new weight was successful', () => {
    // Given
    const expected = {
      title: 'Success',
      description: 'Your weight has been saved successfully',
      dissmissable: true,
    }

    // When
    const actual = getAddNewUserWeightSuccessSnackbarProps()

    // Then
    expect(actual).toEqual(expected)
  })
})

describe('getAddNewUserWeightErrorSnackbarProps', () => {
  it('should return the correct snackbar props when adding new weight failed', () => {
    // Given
    const expected = {
      title: 'Error',
      description:
        'Something went wrong while trying to save your weight. Please try again.',
      dissmissable: true,
      severity: SnackbarSeverity.ERROR,
    }

    // When
    const actual = getAddNewUserWeightErrorSnackbarProps()

    // Then
    expect(actual).toEqual(expected)
  })
})
