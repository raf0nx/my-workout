export function getInputProps(isReadOnly: boolean) {
  return isReadOnly ? { readOnly: true, disableUnderline: true } : {}
}
