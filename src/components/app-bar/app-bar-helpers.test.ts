import { NAVBAR_ITEMS } from '~/constants'

import { getAppBarTitle, getHamburgerIconAriaLabel } from './app-bar-helpers'

describe('getAppBarTitle', () => {
  test.each`
    currentPath                  | expected
    ${'my-workout.com'}          | ${NAVBAR_ITEMS.DASHBOARD}
    ${'my-workout.com/profile'}  | ${NAVBAR_ITEMS.DASHBOARD}
    ${'my-workout.com/workouts'} | ${NAVBAR_ITEMS.WORKOUTS}
  `(
    'should return $expected when currentPath is $currentPath',
    ({ currentPath, expected }) => {
      // When
      const actual = getAppBarTitle(currentPath)

      // Then
      expect(actual).toBe(expected)
    }
  )
})

describe('getHamburgerIconAriaLabel', () => {
  test('should return correct aria label when NavBar is open', () => {
    // Given
    const expected = 'close navigation drawer'

    // When
    const actual = getHamburgerIconAriaLabel(true)

    // Then
    expect(actual).toBe(expected)
  })

  test('should return correct aria label when NavBar is closed', () => {
    // Given
    const expected = 'open navigation drawer'

    // When
    const actual = getHamburgerIconAriaLabel(false)

    // Then
    expect(actual).toBe(expected)
  })
})
