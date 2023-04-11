import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'

import { db } from '~/config/firebase-config'
import type { Workout } from '~/components/workouts-table/types'
import { WORKOUTS_DOC_ID } from '~/constants'

import { transformDocsToWorkoutObjects } from './workouts-helper'

const workoutsCollection = collection(db, WORKOUTS_DOC_ID)

export const getWorkouts = async (): Promise<Workout[]> => {
  const data = await getDocs(workoutsCollection)

  return transformDocsToWorkoutObjects(data)
}

export const postWorkout = async (workoutData: Workout): Promise<void> => {
  await addDoc(workoutsCollection, workoutData)
}

export const updateWorkout = async (workoutData: Workout): Promise<void> => {
  const workoutDoc = doc(db, WORKOUTS_DOC_ID, workoutData.id!)
  await updateDoc(workoutDoc, { ...workoutData })
}
