import { describe, it, vi } from 'vitest'
import { render } from '@solidjs/testing-library'

import { assertElementToBeInTheDocument } from '~/utils/test-utils'
import {
  getDialogContentText,
  getNewWeightInput,
  getWeightsTable,
} from '~/utils/test-utils/weight-kpi-dialog-content'

import WeightKpiDialogContent from './WeightKpiDialogContent'

vi.mock('./new-weight-input', () => ({
  NewWeightInput: () => <div data-testid="new-weight-input" />,
}))

vi.mock('./weights-table', () => ({
  WeightsTable: () => <div data-testid="weights-table" />,
}))

describe('WeightKpiDialogContent', () => {
  it('should render dialog content with the correct text, new weight input and weights table', () => {
    // Given
    render(() => <WeightKpiDialogContent weightsInfo={[]} />)

    // Then
    assertElementToBeInTheDocument(getDialogContentText())
    assertElementToBeInTheDocument(getNewWeightInput())
    assertElementToBeInTheDocument(getWeightsTable())
  })
})
