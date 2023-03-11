import styles from './workouts-table-dialog-content.module.scss'

export function getInputProps(isReadOnly: boolean) {
  return { readOnly: isReadOnly, disabled: isReadOnly }
}

export function getInputStyle(isReadOnly: boolean) {
  if (!isReadOnly) return

  return styles['text-field']
}
