import dayjs from 'dayjs'

import { DEVELOPMENT_MODE, HOME_PATH, TEST_MODE } from '~/constants'

export const removeTrailingNonDigits = (str: string): string =>
  str.replace(/^\D+/g, '')

export const keys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

export const isDevMode = () => import.meta.env.MODE === DEVELOPMENT_MODE

export const isTestMode = () => import.meta.env.MODE === TEST_MODE

export const convertTextToPath = (text: string) => {
  return HOME_PATH + text.toLowerCase()
}

export const getCurrentDateInDDMMYYYYFormat = () => {
  return dayjs().format('DD.MM.YYYY')
}
