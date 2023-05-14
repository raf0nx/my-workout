import { HOME_PATH, NAVBAR_ITEMS } from '~/constants'
import { convertTextToPath } from '~/utils/utils'

export const getNavBarItemLink = (navbarItem: NAVBAR_ITEMS) => {
  if (navbarItem === NAVBAR_ITEMS.WORKOUTS) return convertTextToPath(navbarItem)

  return HOME_PATH
}

export const isLinkActive = (navbarItem: NAVBAR_ITEMS, pathname: string) => {
  switch (navbarItem) {
    case NAVBAR_ITEMS.DASHBOARD:
      return pathname === HOME_PATH
    case NAVBAR_ITEMS.WORKOUTS:
      return pathname === convertTextToPath(navbarItem)
    default:
      return false
  }
}
