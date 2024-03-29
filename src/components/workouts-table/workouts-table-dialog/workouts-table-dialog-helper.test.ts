import { describe, it } from 'vitest'
import MockDate from 'mockdate'

import { SnackbarSeverity } from '~/components/snackbar/types'

import {
  getSaveWorkoutErrorSnackbarProps,
  getSaveWorkoutSuccessSnackbarProps,
  getWorkoutDetailsInitialState,
} from './workouts-table-dialog-helper'

describe('getWorkoutDetailsInitialState', () => {
  it('should return workout details object in initial state', () => {
    // Given
    const mockedDate = '01.01.2023'
    MockDate.set(mockedDate)

    const expected = {
      name: '',
      description: '',
      totalReps: '',
      week: '1',
      date: mockedDate,
      duration: '',
      exercises: { exercise1: { name: '', sets: [0] } },
    }

    // When
    const actual = getWorkoutDetailsInitialState()

    // Then
    expect(actual).toStrictEqual(expected)
    MockDate.reset()
  })
})

describe('getSaveWorkoutSuccessSnackbarProps', () => {
  it('should return proper snackbar props when saving workout is successful', () => {
    // Given
    const expected = {
      title: 'Success',
      description: 'Workout saved successfully.',
      dismissable: true,
    }

    // When
    const actual = getSaveWorkoutSuccessSnackbarProps()

    // Then
    expect(actual).toEqual(expected)
  })
})

describe('getSaveWorkoutErrorSnackbarProps', () => {
  it('should return proper snackbar props when saving workout failed', () => {
    // Given
    const expected = {
      title: 'Error',
      description: 'Something went wrong. Please try again later.',
      dismissable: true,
      severity: SnackbarSeverity.ERROR,
    }

    // When
    const actual = getSaveWorkoutErrorSnackbarProps()

    // Then
    expect(actual).toEqual(expected)
  })
})
