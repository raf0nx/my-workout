import { AddCircle } from '@suid/icons-material'
import { IconButton, Toolbar, Typography } from '@suid/material'
import { createSignal } from 'solid-js'

import WorkoutsTableDialog from '~/components/workouts-table/workouts-table-dialog'

export default function WorkoutsTableToolbar() {
  const [isDialogOpen, setIsDialogOpen] = createSignal(false)

  return (
    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
      <Typography variant="h6" component="h1" sx={{ pl: 1 }}>
        Workouts
      </Typography>
      <IconButton
        onClick={[setIsDialogOpen, true]}
        color="secondary"
        aria-label="add new workout"
      >
        <AddCircle />
      </IconButton>
      <WorkoutsTableDialog
        isOpen={isDialogOpen()}
        onClose={[setIsDialogOpen, false]}
      />
    </Toolbar>
  )
}
