import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@suid/material'
import { Show, createSignal } from 'solid-js'
import type { ChangeEvent } from '@suid/types'
import { createMutation, useQueryClient } from '@tanstack/solid-query'

import { addNewUserWeight } from '~/api/user-data'
import { invalidateUserWeightQuery } from '~/api/user-data/user-data-helpers'

export default function NewWeightInput() {
  const queryClient = useQueryClient()

  const addNewUserWeightMutation = createMutation(
    (weight: number) => addNewUserWeight(weight),
    {
      onSuccess: () => {
        invalidateUserWeightQuery(queryClient)
        clearInput()
      },
    }
  )

  const [newWeight, setNewWeight] = createSignal('')

  const isNewWeightBeingAdded = () => addNewUserWeightMutation.isLoading

  const handleInputChange = (
    _: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => {
    setNewWeight(value)
  }

  const handleAddButtonClick = () => {
    const currentNewWeight = newWeight()

    if (!currentNewWeight.trim()) return

    addNewUserWeightMutation.mutate(parseFloat(newWeight()))
  }

  const clearInput = () => {
    setNewWeight('')
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <TextField
        label="New weight"
        name="newWeight"
        type="number"
        size="small"
        variant="filled"
        placeholder="84"
        autoFocus
        inputProps={{ step: 0.1 }}
        InputProps={{
          endAdornment: (
            <Typography variant="body2" sx={{ ml: 1, mt: 2 }}>
              kg
            </Typography>
          ),
        }}
        onChange={handleInputChange}
        value={newWeight()}
      />
      <Button
        color="secondary"
        variant="contained"
        onClick={handleAddButtonClick}
        disabled={!newWeight() || isNewWeightBeingAdded()}
      >
        <Show when={isNewWeightBeingAdded()} fallback="Add">
          <CircularProgress size={24.5} />
        </Show>
      </Button>
    </Box>
  )
}
