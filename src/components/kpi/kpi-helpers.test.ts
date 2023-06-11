import { useTheme } from '@suid/material'
import { describe, expect, it, vi, type Mock } from 'vitest'

import { getChangeValueColor } from './kpi-helpers'

vi.mock('@suid/material', () => ({
  useTheme: vi.fn(),
}))

describe('getChangeValueColor', () => {
  const mockPalette = {
    success: {
      main: '#00ff00',
    },
    error: {
      main: '#ff0000',
    },
    grey: {
      600: '#666666',
    },
  }

  ;(useTheme as Mock).mockReturnValue({ palette: mockPalette })

  it.each`
    changeValue | expected
    ${'+1.5%'}  | ${mockPalette.success.main}
    ${'-2.0%'}  | ${mockPalette.error.main}
    ${'0%'}     | ${mockPalette.grey[600]}
  `(
    'should return the correct color for $changeValue change value',
    ({ changeValue, expected }) => {
      // When
      const actual = getChangeValueColor(changeValue)

      // Then
      expect(actual).toBe(expected)
    }
  )
})
