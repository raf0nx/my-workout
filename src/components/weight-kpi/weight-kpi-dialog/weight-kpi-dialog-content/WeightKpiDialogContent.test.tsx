import { describe, it, vi } from 'vitest'
import { render } from '@solidjs/testing-library'

import { assertElementToBeInTheDocument } from '~/utils/test-utils'
import { getDialogContentText } from '~/utils/test-utils/weight-kpi-dialog-content'

import WeightKpiDialogContent from './WeightKpiDialogContent'

vi.mock('./new-weight-input', () => ({
  NewWeightInput: () => <div />,
}))

vi.mock('./weights-table', () => ({
  WeightsTable: () => <div />,
}))

describe('WeightKpiDialogContent', () => {
  it('should render dialog content with the correct text', () => {
    // Given
    render(() => <WeightKpiDialogContent weightsInfo={[]} />)

    // Then
    assertElementToBeInTheDocument(getDialogContentText())
  })
})
