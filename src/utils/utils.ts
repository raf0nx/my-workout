import { DEVELOPMENT_MODE, TEST_MODE } from '~/constants'

export const removeTrailingNonDigits = (str: string): string =>
  str.replace(/^\D+/g, '')

export const keys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

export const isDevMode = () => import.meta.env.MODE === DEVELOPMENT_MODE

export const isTestMode = () => import.meta.env.MODE === TEST_MODE
