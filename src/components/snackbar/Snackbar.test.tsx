import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@solidjs/testing-library'
import { describe, test } from 'vitest'

import {
  assertElementNotToBeInTheDocument,
  assertElementToBeInTheDocument,
  queryCloseBtn,
} from '~/utils/test-utils'
import {
  closeSnackbar,
  getSnackbar,
  querySnackbar,
} from '~/utils/test-utils/snackbar'

import Snackbar from './Snackbar'

describe('Snackbar', () => {
  test('should render with a predefined title and description', () => {
    // Given
    const mockedTitle = 'Success'
    const mockedDescription = 'Action was performed successfully'

    render(() => (
      <Snackbar
        title={mockedTitle}
        description={mockedDescription}
        dissmissable
      />
    ))

    // Then
    assertElementToBeInTheDocument(screen.getByText(mockedTitle))
    assertElementToBeInTheDocument(screen.getByText(mockedDescription))
  })

  test('should be dismissed after clicking the close button', async () => {
    // When
    await closeSnackbar()

    // Then
    assertElementNotToBeInTheDocument(querySnackbar())
  })

  test('should be dismissed automatically after specified timeout', async () => {
    // Given
    const mockedTimeout = 1000

    render(() => <Snackbar description="" timeout={mockedTimeout} />)

    // When
    await waitForElementToBeRemoved(getSnackbar(), {
      timeout: mockedTimeout + 500,
    })

    // Then
    assertElementNotToBeInTheDocument(querySnackbar())
  })

  test('should not render close button when not dismissable', () => {
    // Given
    render(() => <Snackbar description="" />)

    // Then
    assertElementNotToBeInTheDocument(queryCloseBtn())
  })
})
