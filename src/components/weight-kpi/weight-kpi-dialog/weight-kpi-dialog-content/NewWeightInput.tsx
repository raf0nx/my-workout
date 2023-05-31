import { Box, Button, TextField, Typography } from '@suid/material'
import { createSignal } from 'solid-js'
import type { ChangeEvent } from '@suid/types'

export function NewWeightInput() {
  const [newWeight, setNewWeight] = createSignal('')

  const handleInputChange = (
    _: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => {
    setNewWeight(value)
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
      <Button color="secondary" variant="contained">
        Add
      </Button>
    </Box>
  )
}
