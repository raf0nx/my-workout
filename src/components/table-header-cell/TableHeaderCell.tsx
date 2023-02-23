import { styled, TableCell } from '@suid/material'
import { tableCellClasses } from '@suid/material/TableCell'

export const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
  },
}))
