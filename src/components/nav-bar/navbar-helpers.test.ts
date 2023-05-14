import { describe, it } from 'vitest'

import { HOME_PATH, NAVBAR_ITEMS } from '~/constants'

import { getNavBarItemLink, isLinkActive } from './navbar-helpers'

describe('getNavBarItemLink', () => {
  it.each`
    navbarItem                | expected
    ${NAVBAR_ITEMS.DASHBOARD} | ${HOME_PATH}
    ${NAVBAR_ITEMS.WORKOUTS}  | ${'/workouts'}
    ${'Dummy'}                | ${HOME_PATH}
  `(
    'should return a $expected path for the $navbarItem NavBar item',
    ({
      navbarItem,
      expected,
    }: {
      navbarItem: NAVBAR_ITEMS
      expected: string
    }) => {
      // When
      const actual = getNavBarItemLink(navbarItem)

      // Then
      expect(actual).toBe(expected)
    }
  )
})

describe('isLinkActive', () => {
  it.each`
    navbarItem                | pathname       | expected
    ${NAVBAR_ITEMS.DASHBOARD} | ${HOME_PATH}   | ${true}
    ${NAVBAR_ITEMS.DASHBOARD} | ${'/workouts'} | ${false}
    ${NAVBAR_ITEMS.WORKOUTS}  | ${'/workouts'} | ${true}
    ${NAVBAR_ITEMS.WORKOUTS}  | ${HOME_PATH}   | ${false}
    ${'Dummy'}                | ${'/dummy'}    | ${false}
  `(
    'should return $expected when navbarItem is $navbarItem and pathname is $pathname',
    ({
      navbarItem,
      pathname,
      expected,
    }: {
      navbarItem: NAVBAR_ITEMS
      pathname: string
      expected: boolean
    }) => {
      // When
      const actual = isLinkActive(navbarItem, pathname)

      // Then
      expect(actual).toBe(expected)
    }
  )
})
