import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@solidjs/testing-library'
import { describe, test } from 'vitest'
import userEvent from '@testing-library/user-event'

import {
  assertElementNotToBeInTheDocument,
  assertElementToBeInTheDocument,
} from '~/utils/test-utils/utils'

import Snackbar from './Snackbar'

describe('Snackbar', () => {
  test('should render with a predefined title and description', () => {
    // Given
    render(() => (
      <Snackbar
        title="Success"
        description="Action was performed successfully"
        dissmissable
      />
    ))

    // Then
    assertElementToBeInTheDocument(screen.getByText('Success'))
    assertElementToBeInTheDocument(
      screen.getByText('Action was performed successfully')
    )
  })

  test('should be dismissed after clicking the close button', async () => {
    // When
    await userEvent.click(screen.getByLabelText('Close'))
    await waitForElementToBeRemoved(screen.getByRole('alert'))

    // Then
    assertElementNotToBeInTheDocument(screen.queryByRole('alert'))
  })

  test('should be dismissed automatically after specified timeout', async () => {
    // Given
    render(() => <Snackbar description="" timeout={1000} />)

    // When
    await waitForElementToBeRemoved(screen.getByRole('alert'), {
      timeout: 1500,
    })

    // Then
    assertElementNotToBeInTheDocument(screen.queryByRole('alert'))
  })

  test('should not render close button when not dismissable', () => {
    // Given
    render(() => <Snackbar description="" />)

    // Then
    assertElementNotToBeInTheDocument(screen.queryByRole('Close'))
  })
})
