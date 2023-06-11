import { render } from '@solidjs/testing-library'
import { describe, it, vi, type Mock } from 'vitest'

import { workouts } from '~/mocked-data'
import {
  getTotalWorkoutsKpiDescription,
  getTotalWorkoutsKpiIcon,
  getTotalWorkoutsKpiValue,
} from '~/utils/test-utils/total-workouts-kpi'
import { assertElementToBeInTheDocument } from '~/utils/test-utils'

import { TotalWorkoutsKpi } from '.'
import { getTotalWorkoutsAmount } from './total-workouts-kpi-helpers'

vi.mock('@suid/material', async () => {
  const actual = (await vi.importActual('@suid/material')) as object

  return {
    ...actual,
    useTheme: vi.fn().mockReturnValue({
      palette: {
        secondary: {
          main: '#ff0000',
        },
        grey: {
          600: '#666666',
        },
      },
    }),
  }
})

vi.mock('./total-workouts-kpi-helpers', () => ({
  getTotalWorkoutsAmount: vi.fn(),
}))

describe('TotalWorkoutsKpi', () => {
  it('should render the Kpi component with the correct props', () => {
    // Given
    ;(getTotalWorkoutsAmount as Mock).mockReturnValue(workouts.length)
    render(() => <TotalWorkoutsKpi workoutsQueryData={workouts} />)

    // Then
    assertElementToBeInTheDocument(getTotalWorkoutsKpiValue())
    assertElementToBeInTheDocument(getTotalWorkoutsKpiDescription())
    assertElementToBeInTheDocument(getTotalWorkoutsKpiIcon())
  })
})
