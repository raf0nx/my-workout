import { Box, CircularProgress, TableCell, TableRow } from '@suid/material'

export default function WorkoutsTableSpinner() {
  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
      }}
    >
      <TableCell colSpan={6}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // TODO: height will be the same as fixed table size
            height: 100,
          }}
        >
          <CircularProgress />
        </Box>
      </TableCell>
    </TableRow>
  )
}
