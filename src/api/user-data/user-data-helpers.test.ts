import { arrayUnion } from 'firebase/firestore'
import { describe, expect, it, vi } from 'vitest'

import { getCurrentDateInDDMMYYYYFormat } from '~/utils/utils'
import type { WeightInfo } from '~/components/weight-kpi/weight-kpi-dialog/weight-kpi-dialog-content/types'

import {
  createUserWeightData,
  sortWeightsInfoByNewestFirst,
} from './user-data-helpers'

vi.mock('~/utils/utils', async () => {
  const actual = (await vi.importActual('~/utils/utils')) as object

  return {
    ...actual,
    getCurrentDateInDDMMYYYYFormat: vi.fn(),
  }
})

describe('createUserWeightData', () => {
  it('should create user weight data object with the current date', () => {
    // Given
    const weight = 80
    const currentDate = '14.05.2023'
    ;(getCurrentDateInDDMMYYYYFormat as jest.Mock).mockReturnValueOnce(
      currentDate
    )

    // When
    const actual = createUserWeightData(weight)

    // Then
    expect(actual).toEqual({
      weightsInfo: arrayUnion({ weight, date: currentDate }),
    })
  })
})

describe('sortWeightsInfoByNewestFirst', () => {
  it('should sort weights info array by newest first', () => {
    // Given
    const weightsInfo: WeightInfo[] = [
      { weight: 75, date: '12.05.2023' },
      { weight: 80, date: '14.05.2023' },
      { weight: 78, date: '13.05.2023' },
    ]
    const expectedSortedWeightsInfo = [
      { weight: 80, date: '14.05.2023' },
      { weight: 78, date: '13.05.2023' },
      { weight: 75, date: '12.05.2023' },
    ]

    // When
    const result = sortWeightsInfoByNewestFirst(weightsInfo)

    // Then
    expect(result).toEqual(expectedSortedWeightsInfo)
  })

  it('should return an empty array if weights info array is empty', () => {
    // Given
    const weightsInfo: WeightInfo[] = []

    // When
    const result = sortWeightsInfoByNewestFirst(weightsInfo)

    // Then
    expect(result).toEqual([])
  })

  it('should return the same array if weights info array has only one item', () => {
    // Given
    const weightsInfo: WeightInfo[] = [{ weight: 80, date: '14.05.2023' }]

    // When
    const result = sortWeightsInfoByNewestFirst(weightsInfo)

    // Then
    expect(result).toEqual(weightsInfo)
  })
})
