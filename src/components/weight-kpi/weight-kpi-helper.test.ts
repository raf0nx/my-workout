import { describe, expect, it } from 'vitest'

import { weightsInfo } from '~/mocked-data'
import { KPI_NO_VALUE_INDICATOR } from '~/constants'
import { SnackbarSeverity } from '~/components/snackbar/types'

import {
  getGetUserWeightErrorSnackbarProps,
  getWeightKpiChangeValue,
  getWeightKpiValue,
} from './weight-kpi-helper'
import type { WeightInfo } from './weight-kpi-dialog/weight-kpi-dialog-content/types'

describe('getWeightKpiValue', () => {
  it('should return the weight value of the latest entry if available', () => {
    // When
    const actual = getWeightKpiValue(weightsInfo)

    // Then
    expect(actual).toBe(weightsInfo[0].weight)
  })

  it('should return KPI_NO_VALUE_INDICATOR if weightsInfo is empty', () => {
    // Given
    const weightsInfo: WeightInfo[] = []

    // When
    const actual = getWeightKpiValue(weightsInfo)

    // Then
    expect(actual).toBe(KPI_NO_VALUE_INDICATOR)
  })

  it('should return KPI_NO_VALUE_INDICATOR if weightsInfo is undefined', () => {
    // When
    const actual = getWeightKpiValue(undefined)

    // Then
    expect(actual).toBe(KPI_NO_VALUE_INDICATOR)
  })
})

describe('getWeightKpiChangeValue', () => {
  it('should return undefined if current weight is undefined', () => {
    // Given
    const weightsInfo: WeightInfo[] = []

    // When
    const actual = getWeightKpiChangeValue(weightsInfo)

    // Then
    expect(actual).toBeUndefined()
  })

  it('should return "--" if previous weight is undefined', () => {
    // Given
    const weightsInfo: WeightInfo[] = [{ weight: 75, date: '12.05.2023' }]

    // When
    const actual = getWeightKpiChangeValue(weightsInfo)

    // Then
    expect(actual).toBe('--')
  })

  it('should return the calculated weight change percentage as a formatted string', () => {
    // Given
    const weightsInfo: WeightInfo[] = [
      { weight: 75, date: '14.05.2023' },
      { weight: 80, date: '12.05.2023' },
    ]
    const expected = '-6.25%'

    // When
    const actual = getWeightKpiChangeValue(weightsInfo)

    // Then
    expect(actual).toBe(expected)
  })

  it('should return the calculated weight change percentage with negative sign as a formatted string', () => {
    // Given
    const weightsInfo: WeightInfo[] = [
      { weight: 80, date: '14.05.2023' },
      { weight: 75, date: '12.05.2023' },
    ]
    const expected = '+6.67%'

    // When
    const actual = getWeightKpiChangeValue(weightsInfo)

    // Then
    expect(actual).toBe(expected)
  })
})

describe('getGetUserWeightErrorSnackbarProps', () => {
  it('should return the correct snackbar props when getting user weight info failed', () => {
    // Given
    const expected = {
      title: 'Error',
      description: 'Failed to fetch user weight info. Please try again.',
      dismissable: true,
      severity: SnackbarSeverity.ERROR,
    }

    // When
    const actual = getGetUserWeightErrorSnackbarProps()

    // Then
    expect(actual).toEqual(expected)
  })
})
