import { render, screen } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'

import { mockMatchMedia } from '~/mock-match-media'
import { assertElementToBeInTheDocument } from '~/utils/test-utils'

import { UiProvider, useUi } from '.'

describe('UiContext', () => {
  beforeAll(() => {
    mockMatchMedia()
  })

  describe('isMobileDesign', () => {
    const setup = () => {
      const TestComponent = () => {
        const ui = useUi()

        return (
          <div>{ui.isMobileDesign() ? 'Mobile Design' : 'Desktop Design'}</div>
        )
      }

      render(() => (
        <UiProvider>
          <TestComponent />
        </UiProvider>
      ))
    }

    it('should render with Desktop design on viewports >= 900px', () => {
      // Given
      setup()

      // Then
      assertElementToBeInTheDocument(screen.getByText(/desktop design/i))
    })

    it('should render with Mobile design on viewports < 900px', () => {
      // Given
      mockMatchMedia(true)
      setup()

      // Then
      assertElementToBeInTheDocument(screen.getByText(/mobile design/i))
    })
  })

  describe('isNavBarOpen', () => {
    const setup = () => {
      const TestComponent = () => {
        const ui = useUi()

        const handleClick = () => {
          if (ui.isNavBarOpen()) {
            ui.closeNavBar()
          } else {
            ui.openNavBar()
          }
        }

        return (
          <div>
            <button onClick={handleClick}>
              {ui.isNavBarOpen() ? 'Close' : 'Open'}
            </button>
          </div>
        )
      }

      render(() => (
        <UiProvider>
          <TestComponent />
        </UiProvider>
      ))
    }

    it('should toggle isNavBarOpen when calling either openNavBar or closeNavBar', async () => {
      // Given
      setup()
      const toggleNavBarButton = screen.getByText(/open/i)

      // When
      await userEvent.click(toggleNavBarButton)

      // Then
      expect(toggleNavBarButton).toHaveTextContent(/close/i)

      // When
      await userEvent.click(toggleNavBarButton)

      // Then
      expect(toggleNavBarButton).toHaveTextContent(/open/i)
    })
  })
})
