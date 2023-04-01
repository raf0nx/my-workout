import { get, ref } from 'firebase/database'

import { db } from '~/config/firebase-config'
import type { Workout } from '~/components/workouts-table/types'

const workoutsRef = ref(db, 'workouts')

export const getWorkouts = async (): Promise<Workout[]> => {
  const data = await get(workoutsRef)

  return transformWorkoutsData(data.val())
}

export const postWorkout = async (workoutData: Workout): Promise<void> => {
  // await addDoc(workoutsCollection, workoutData)
}

export const updateWorkout = async (workoutData: Workout): Promise<void> => {
  // const workoutDoc = doc(db, workoutsDocName, workoutData.id!)
  // await updateDoc(workoutDoc, { ...workoutData })
}

const transformWorkoutsData = (data: Workout[]): Workout[] => {
  return Object.entries(data).map(([id, workoutData]) => ({
    ...workoutData,
    id,
  }))
}
