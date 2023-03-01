import type { SetStoreFunction } from 'solid-js/store'

import type { Workout } from '../types'

export interface WorkoutsTableToolbarProps {
  setWorkouts: SetStoreFunction<Workout[]>
}
