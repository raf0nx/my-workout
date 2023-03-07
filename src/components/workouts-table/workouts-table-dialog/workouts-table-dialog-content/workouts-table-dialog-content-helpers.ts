export function getInputProps(isReadOnly: boolean) {
  return isReadOnly ? { readOnly: true, disableUnderline: true } : {}
}

export function getInputVariant(isReadOnly: boolean) {
  return isReadOnly ? 'filled' : 'outlined'
}
