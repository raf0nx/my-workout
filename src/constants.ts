/* c8 ignore start */
export const DEVELOPMENT_MODE = 'development'
export const TEST_MODE = 'test'

export const WORKOUTS_COLLECTION_ID = 'workouts'
export const USER_DATA_COLLECTION_ID = 'user-data'
export const USER_WEIGHT_DOC_ID = 'weight'

export const USER_DATA_WEIGHT_QUERY_KEY = `${USER_DATA_COLLECTION_ID}-${USER_WEIGHT_DOC_ID}`

export const DOCUMENT_POSITION_FOLLOWING = 4

export const QUARTER_HOUR = 900_000

export const NAV_WIDTH = 240

export const KPI_NO_VALUE_INDICATOR = '--'

export const HOME_PATH = '/'

export enum OrderDirection {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export enum NAVBAR_ITEMS {
  DASHBOARD = 'Dashboard',
  WORKOUTS = 'Workouts',
}
