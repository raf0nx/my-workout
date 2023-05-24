import { afterEach, describe, it, vi, expect, type Mock } from 'vitest'
import { render } from '@solidjs/testing-library'
import { useLocation } from 'solid-start'
import { Router } from '@solidjs/router'

import { useUi } from '~/contexts/ui'
import { NAVBAR_ITEMS } from '~/constants'
import { assertFirstNodePrecedeNextOne } from '~/utils/test-utils'
import {
  clickNavBarItem,
  getDashboardIcon,
  getNavBarItems,
  getWorkoutsIcon,
} from '~/utils/test-utils/nav-bar'

import NavBar from './NavBar'

vi.mock('solid-start', async () => {
  const actual = (await vi.importActual('solid-start')) as object

  return {
    ...actual,
    useLocation: vi.fn(),
  }
})

vi.mock('~/contexts/ui', () => ({
  useUi: vi.fn(),
}))

describe('NavBar', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  const setup = (isMobileDesign = false, isNavBarOpen = true) => {
    ;(useUi as Mock).mockReturnValue({
      isNavBarOpen: vi.fn().mockReturnValue(isNavBarOpen),
      isMobileDesign: vi.fn().mockReturnValue(isMobileDesign),
      openNavBar: vi.fn(),
      closeNavBar: vi.fn(),
    })
    ;(useLocation as Mock).mockReturnValue({ pathname: '/' })

    render(() => (
      <Router>
        <NavBar />
      </Router>
    ))
  }

  it('should render the correct number of nav bar items', () => {
    // Given
    const navItems = Object.values(NAVBAR_ITEMS)
    setup()

    // Then
    expect(getNavBarItems()).toHaveLength(navItems.length)
  })

  it('should display the correct icons for nav bar items', () => {
    // Given
    setup()

    // Then
    assertFirstNodePrecedeNextOne(getDashboardIcon(), getWorkoutsIcon())
  })

  it('closes the NavBar when clicking a navigation item', async () => {
    // Given
    setup(true, false)

    // When
    await clickNavBarItem(0)

    // Then
    expect(useUi().closeNavBar).toHaveBeenCalled()
  })
})
