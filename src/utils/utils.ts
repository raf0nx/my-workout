import dayjs from 'dayjs'

import {
  DEVELOPMENT_MODE,
  HOME_PATH,
  QUARTER_HOUR,
  TEST_MODE,
} from '~/constants'

export const removeTrailingNonDigits = (str: string): string =>
  str.replace(/^\D+/g, '')

export const keys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

export const isDevMode = () => import.meta.env.MODE === DEVELOPMENT_MODE

export const isTestMode = () => import.meta.env.MODE === TEST_MODE

export const convertTextToPath = (text: string) =>
  HOME_PATH + text.toLowerCase()

export const getCurrentDateInDDMMYYYYFormat = () => dayjs().format('DD.MM.YYYY')

export const parseDateInDDMMYYYYFormat = (dateString: string) => {
  const [day, month, year] = dateString.split('.')
  const isoDateString = `${year}-${month}-${day}`

  return new Date(isoDateString)
}

export const calculatePercentageChange = (
  previousValue: number,
  currentValue: number
) => {
  const changeValue = currentValue - previousValue
  const changePercentage = (changeValue / previousValue) * 100

  return changePercentage
}

export const formatPercentageChange = (percentageChange: number) => {
  const formattedPercentageChange = percentageChange.toFixed(2)
  const prefix = percentageChange > 0 ? '+' : ''

  return `${prefix}${formattedPercentageChange}%`
}

/* c8 ignore next */
export const getQueryStaleTime = () => (isTestMode() ? 0 : QUARTER_HOUR)
