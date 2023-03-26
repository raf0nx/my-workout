export const removeTrailingNonDigits = (str: string): string =>
  str.replace(/^\D+/g, '')

export const keys = Object.keys as <T extends object>(obj: T) => Array<keyof T>
