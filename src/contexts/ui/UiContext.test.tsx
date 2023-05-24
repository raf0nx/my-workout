import { render, screen } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { UiProvider, useUi } from '.'

describe('UiContext', () => {
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
      expect(screen.getByText(/desktop design/i)).toBeInTheDocument()
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

    it('toggles isNavBarOpen with openNavBar and closeNavBar', async () => {
      // Given
      setup()
      const toggleNavBarButton = screen.getByText(/open/i)

      // Then
      expect(toggleNavBarButton).toBeInTheDocument()

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
