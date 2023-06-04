import { describe, expect, it } from 'vitest'

import { weightsInfo } from '~/mocked-data'
import { KPI_NO_VALUE_INDICATOR } from '~/constants'

import { getLatestWeightValue, getWeightKpiValue } from './weight-kpi-helper'

describe('getLatestWeightValue', () => {
  it('should return the weight value of the latest entry', () => {
    // When
    const actual = getLatestWeightValue(weightsInfo)

    // Then
    expect(actual).toBe(weightsInfo[0].weight)
  })

  it('should return undefined if weightsInfo is empty', () => {
    // When
    const actual = getLatestWeightValue([])

    // Then
    expect(actual).toBeUndefined()
  })

  it('should return undefined if weightsInfo is undefined', () => {
    // When
    const actual = getLatestWeightValue(undefined)

    // Then
    expect(actual).toBeUndefined()
  })
})

describe('getWeightKpiValue', () => {
  it('should return the weight value of the latest entry if available', () => {
    // When
    const result = getWeightKpiValue(weightsInfo)

    // Then
    expect(result).toBe(weightsInfo[0].weight)
  })

  it('should return KPI_NO_VALUE_INDICATOR if weightsInfo is empty', () => {
    // When
    const result = getWeightKpiValue([])

    // Then
    expect(result).toBe(KPI_NO_VALUE_INDICATOR)
  })

  it('should return KPI_NO_VALUE_INDICATOR if weightsInfo is undefined', () => {
    // When
    const result = getWeightKpiValue(undefined)

    // Then
    expect(result).toBe(KPI_NO_VALUE_INDICATOR)
  })
})
