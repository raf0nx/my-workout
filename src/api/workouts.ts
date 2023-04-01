import { get, push, ref, set, update } from 'firebase/database'

import { db } from '~/config/firebase-config'
import type { Workout } from '~/components/workouts-table/types'

const workoutsDataRef = ref(db, 'workouts')

export const getWorkouts = async (): Promise<Workout[]> => {
  const data = await get(workoutsDataRef)

  return transformWorkoutsData(data.val())
}

export const postWorkout = async (workoutData: Workout): Promise<void> => {
  const newWorkoutId = push(workoutsDataRef).key

  set(ref(db, `workouts/${newWorkoutId}`), workoutData)
}

export const updateWorkout = async (workoutData: Workout): Promise<void> => {
  const { id, ...rest } = workoutData
  const workoutToUpdateRef = ref(db, `workouts/${id}`)

  update(workoutToUpdateRef, rest)
}

const transformWorkoutsData = (data: Workout[]): Workout[] => {
  return Object.entries(data).map(([id, workoutData]) => ({
    ...workoutData,
    id,
  }))
}
