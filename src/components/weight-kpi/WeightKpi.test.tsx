import { render, screen } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'

import { weightsInfo } from '~/mocked-data'

import WeightKpi from './WeightKpi'

vi.mock('./weight-kpi-dialog', () => ({
  WeightKpiDialog: () => <div />,
}))

describe('WeightKpi', () => {
  it('should render the weight KPI with correct value and change value', () => {
    // Given
    render(() => <WeightKpi weightsInfo={weightsInfo} />)

    const valueElement = screen.getByText('68.2')
    const changeElement = screen.getByText('-5.01%')

    // Then
    expect(valueElement).toBeInTheDocument()
    expect(changeElement).toBeInTheDocument()
  })

  it('should render the weight KPI with placeholder for a value when weightsInfo is empty', () => {
    // Given
    render(() => <WeightKpi weightsInfo={[]} />)

    const valueElement = screen.getByText('--')

    // Then
    expect(valueElement).toBeInTheDocument()
  })

  it('should render the weight KPI with correct value and placeholder for a change value when weightsInfo has 1 item', () => {
    // Given
    render(() => <WeightKpi weightsInfo={[weightsInfo[0]]} />)

    const valueElement = screen.getByText('68.2')
    const changeElement = screen.getByText('--')

    // Then
    expect(valueElement).toBeInTheDocument()
    expect(changeElement).toBeInTheDocument()
  })
})
