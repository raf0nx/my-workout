import { NAVBAR_ITEMS } from '~/constants'

import { getAppBarTitle } from './app-bar-helpers'

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
