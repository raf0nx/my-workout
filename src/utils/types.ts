export type digits = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0
export type nonZeroDigits = Exclude<digits, 0>

export type Day = `${0}${nonZeroDigits}` | `${1 | 2}${digits}` | `3${0 | 1}`
export type Month = `0${nonZeroDigits}` | `1${0 | 1 | 2}`
export type Year = `20${digits}${digits}`

export type DDMMYYYDateFormat = `${Day}.${Month}.${Year}`
