import { NAVBAR_ITEMS } from '~/constants'

export const getAppBarTitle = (currentPath: string) => {
  if (currentPath.includes('workouts')) return NAVBAR_ITEMS.WORKOUTS

  return NAVBAR_ITEMS.DASHBOARD
}
