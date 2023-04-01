export const removeTrailingNonDigits = (str: string): string =>
  str.replace(/^\D+/g, '')
