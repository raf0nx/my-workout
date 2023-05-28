import { useTheme } from '@suid/material'

export const getChangeValueColor = (changeValue: string) => {
  const { palette } = useTheme()
  const numericChangeValue = parseFloat(changeValue)

  if (!numericChangeValue) return palette.grey[600]

  return numericChangeValue > 0 ? palette.success.main : palette.error.main
}
