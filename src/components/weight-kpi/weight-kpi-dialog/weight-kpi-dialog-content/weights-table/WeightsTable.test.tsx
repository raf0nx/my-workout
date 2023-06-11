import { render } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import type { JSXElement } from 'solid-js'

import { weightsInfo } from '~/mocked-data'
import { assertElementToBeInTheDocument } from '~/utils/test-utils'
import {
  getAllWeightsTableRows,
  getLoadingMessage,
  getNoDataMessage,
  getTableHeaderDate,
  getTableHeaderWeight,
} from '~/utils/test-utils/weights-table'

import { WeightsTable } from '.'

let isWeightsInfoFetched = false

vi.mock('solid-js', async () => {
  const actual = (await vi.importActual('solid-js')) as object

  return {
    ...actual,
    Suspense: (props: { children: JSXElement; fallback: JSXElement }) => {
      if (isWeightsInfoFetched) return props.fallback

      return props.children
    },
  }
})

describe('WeightsTable', () => {
  it('should render weights table with weight and date headers', async () => {
    // Given
    render(() => <WeightsTable weightsInfo={weightsInfo} />)

    // Then
    assertElementToBeInTheDocument(getTableHeaderWeight())
    assertElementToBeInTheDocument(getTableHeaderDate())
  })

  it('should render the correct amount of weights table rows', () => {
    // Given
    render(() => <WeightsTable weightsInfo={weightsInfo} />)

    // Then
    expect(getAllWeightsTableRows()).toHaveLength(weightsInfo.length)
  })

  it('should show no data message when weightsInfo is empty', () => {
    // Given
    render(() => <WeightsTable weightsInfo={[]} />)

    // Then
    assertElementToBeInTheDocument(getNoDataMessage())
  })

  it('should show a loading spinner when weightsInfo is still being fetched', () => {
    // Given
    isWeightsInfoFetched = true
    render(() => <WeightsTable weightsInfo={undefined} />)

    // Then
    assertElementToBeInTheDocument(getLoadingMessage())
  })
})
