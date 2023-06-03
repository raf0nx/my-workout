import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore'

import { db } from '~/config/firebase-config'
import type { Workout } from '~/components/workouts-table/types'
import { OrderDirection, WORKOUTS_COLLECTION_ID } from '~/constants'
import type { DDMMYYYDateFormat } from '~/utils/types'

import {
  formatWorkoutDateToISO8601,
  transformDocsToWorkoutObjects,
} from './workouts-helpers'

const workoutsCollection = collection(db, WORKOUTS_COLLECTION_ID)

export const getWorkouts = async (): Promise<Workout[]> => {
  const data = await getDocs(
    query(workoutsCollection, orderBy('date', OrderDirection.DESCENDING))
  )

  return transformDocsToWorkoutObjects(data)
}

export const postWorkout = async (workoutData: Workout): Promise<void> => {
  await addDoc(workoutsCollection, {
    ...workoutData,
    // TODO: validation needed to ensure the type
    date: formatWorkoutDateToISO8601(workoutData.date as DDMMYYYDateFormat),
  })
}

export const updateWorkout = async (workoutData: Workout): Promise<void> => {
  const workoutDoc = doc(db, WORKOUTS_COLLECTION_ID, workoutData.id!)

  await updateDoc(workoutDoc, {
    ...workoutData,
    // TODO: validation needed to ensure the type
    date: formatWorkoutDateToISO8601(workoutData.date as DDMMYYYDateFormat),
  })
}
