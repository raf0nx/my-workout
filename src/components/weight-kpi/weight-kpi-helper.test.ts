import { describe, expect, it } from 'vitest'

import { weightsInfo } from '~/mocked-data'
import { KPI_NO_VALUE_INDICATOR } from '~/constants'

import { getWeightKpiValue } from './weight-kpi-helper'

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
