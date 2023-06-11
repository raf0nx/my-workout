import { render, screen } from '@solidjs/testing-library'
import { describe, it, vi } from 'vitest'

import { assertElementToBeInTheDocument } from '~/utils/test-utils'
import { getWeightKpiDialog } from '~/utils/test-utils/weight-kpi'
import { weightsInfo } from '~/mocked-data'

import WeightKpi from './WeightKpi'

vi.mock('./weight-kpi-dialog', () => ({
  WeightKpiDialog: () => <div data-testid="weight-kpi-dialog" />,
}))

describe('WeightKpi', () => {
  it('should render with the weight kpi dialog', () => {
    // Given
    render(() => <WeightKpi weightsInfo={weightsInfo} />)

    // Then
    assertElementToBeInTheDocument(getWeightKpiDialog())
  })

  it('should render the weight KPI with correct value and change value', () => {
    // Given
    render(() => <WeightKpi weightsInfo={weightsInfo} />)

    const valueElement = screen.getByText('68.2')
    const changeElement = screen.getByText('-5.01%')

    // Then
    assertElementToBeInTheDocument(valueElement)
    assertElementToBeInTheDocument(changeElement)
  })

  it('should render the weight KPI with placeholder for a value when weightsInfo is empty', () => {
    // Given
    render(() => <WeightKpi weightsInfo={[]} />)

    const valueElement = screen.getByText('--')

    // Then
    assertElementToBeInTheDocument(valueElement)
  })

  it('should render the weight KPI with correct value and placeholder for a change value when weightsInfo has 1 item', () => {
    // Given
    render(() => <WeightKpi weightsInfo={[weightsInfo[0]]} />)

    const valueElement = screen.getByText('68.2')
    const changeElement = screen.getByText('--')

    // Then
    assertElementToBeInTheDocument(valueElement)
    assertElementToBeInTheDocument(changeElement)
  })
})
