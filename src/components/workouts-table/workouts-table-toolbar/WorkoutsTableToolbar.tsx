import { AddCircle } from '@suid/icons-material'
import { IconButton, Toolbar, Typography } from '@suid/material'
import { createSignal } from 'solid-js'

import { WorkoutsTableDialog } from '~/components/workouts-table'

import type { WorkoutsTableToolbarProps } from './types'

export default function WorkoutsTableToolbar(props: WorkoutsTableToolbarProps) {
  const [isDialogOpen, setIsDialogOpen] = createSignal(false)

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
      <Typography variant="h6" component="h1" sx={{ pl: 1 }}>
        Workouts
      </Typography>
      <IconButton
        onClick={[setIsDialogOpen, true]}
        color="secondary"
        aria-label="add new workout"
        aria-haspopup="true"
        aria-expanded={isDialogOpen()}
      >
        <AddCircle />
      </IconButton>
      <WorkoutsTableDialog
        isOpen={isDialogOpen()}
        onClose={handleCloseDialog}
        setWorkouts={props.setWorkouts}
        state="create"
      />
    </Toolbar>
  )
}
