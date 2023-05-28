import { afterEach, describe, it, vi, type Mock } from 'vitest'
import { render } from '@solidjs/testing-library'
import { useLocation } from 'solid-start'

import { useUi } from '~/contexts/ui'
import {
  clickCloseNavBarIcon,
  clickHamburgerIcon,
  getDashboardPageAppBarTitle,
  getWorkoutsPageAppBarTitle,
  queryCloseNavBarIcon,
  queryHamburgerIcon,
} from '~/utils/test-utils/app-bar'
import {
  assertElementToBeInTheDocument,
  assertElementNotToBeInTheDocument,
} from '~/utils/test-utils'

import AppBar from './AppBar'

vi.mock('solid-start', () => ({
  useLocation: vi.fn(),
}))

vi.mock('~/contexts/ui', () => ({
  useUi: vi.fn(),
}))

describe('AppBar', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  const setup = (
    isNavBarOpen = true,
    isMobileDesign = true,
    pathname = '/'
  ) => {
    ;(useUi as Mock).mockReturnValue({
      isMobileDesign: vi.fn().mockReturnValue(isMobileDesign),
      isNavBarOpen: vi.fn().mockReturnValue(isNavBarOpen),
      openNavBar: vi.fn(),
      closeNavBar: vi.fn(),
    })
    ;(useLocation as Mock).mockReturnValue({ pathname })

    render(() => <AppBar />)
  }

  it('should have Dashboard title when on home page', () => {
    // Given
    setup()

    // Then
    assertElementToBeInTheDocument(getDashboardPageAppBarTitle())
  })

  it('should have Workouts title when on workouts page', () => {
    // Given
    setup(false, false, '/workouts')

    // Then
    assertElementToBeInTheDocument(getWorkoutsPageAppBarTitle())
  })

  it('should call closeNavbar when clicking on the close navbar icon', async () => {
    // Given
    setup()

    // When
    await clickCloseNavBarIcon()

    // Then
    expect(useUi().closeNavBar).toHaveBeenCalled()
  })

  it('should call openNavbar when clicking on the hamburger icon', async () => {
    // Given
    setup(false)

    // When
    await clickHamburgerIcon()

    // Then
    expect(useUi().openNavBar).toHaveBeenCalled()
  })

  it('should not have either hamburger nor close NavBar icon when not in mobile view', () => {
    // Given
    setup(false, false)

    // Then
    assertElementNotToBeInTheDocument(queryCloseNavBarIcon())
    assertElementNotToBeInTheDocument(queryHamburgerIcon())
  })
})
