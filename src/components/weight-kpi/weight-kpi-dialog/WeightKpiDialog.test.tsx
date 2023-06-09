import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { JSXElement } from 'solid-js'
import { render } from '@solidjs/testing-library'

import {
  clickCloseBtn,
  getCloseBtn,
  getWeightKpiDialogHeader,
} from '~/utils/test-utils/weight-kpi-dialog'
import { assertElementToBeInTheDocument } from '~/utils/test-utils'

import WeightKpiDialog from './WeightKpiDialog'

vi.mock('./weight-kpi-dialog-content', () => ({
  WeightKpiDialogContent: () => <div />,
}))

vi.mock('@suid/material', async () => {
  const actual = (await vi.importActual('@suid/material')) as object

  return {
    ...actual,
    Dialog: (props: { children: JSXElement }) => props.children,
  }
})

describe('WeightKpiDialog', () => {
  const onCloseMock = vi.fn()

  beforeEach(() => {
    render(() => (
      <WeightKpiDialog isOpen={true} onClose={onCloseMock} weightsInfo={[]} />
    ))
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should render dialog with correct title and close button', () => {
    // Then
    assertElementToBeInTheDocument(getWeightKpiDialogHeader())
    assertElementToBeInTheDocument(getCloseBtn())
  })

  it('should call onClose when close button is clicked', async () => {
    // When
    await clickCloseBtn()

    // Then
    expect(onCloseMock).toHaveBeenCalled()
  })
})
