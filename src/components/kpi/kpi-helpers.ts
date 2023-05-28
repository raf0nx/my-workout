import { useTheme } from '@suid/material'

export const getChangeValueColor = (changeValue: string) => {
  const { palette } = useTheme()
  const numericChangeValue = parseFloat(changeValue)

  if (!numericChangeValue) return palette.grey[700]

  return numericChangeValue > 0 ? palette.success.main : palette.error.main
}
