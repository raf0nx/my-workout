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
import type {
  Workout,
  WorkoutDateFormat,
} from '~/components/workouts-table/types'
import { OrderDirection, WORKOUTS_DOC_ID } from '~/constants'

import {
  formatWorkoutDateToISO8601,
  transformDocsToWorkoutObjects,
} from './workouts-helper'

const workoutsCollection = collection(db, WORKOUTS_DOC_ID)

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
    date: formatWorkoutDateToISO8601(workoutData.date as WorkoutDateFormat),
  })
}

export const updateWorkout = async (workoutData: Workout): Promise<void> => {
  const workoutDoc = doc(db, WORKOUTS_DOC_ID, workoutData.id!)

  await updateDoc(workoutDoc, {
    ...workoutData,
    // TODO: validation needed to ensure the type
    date: formatWorkoutDateToISO8601(workoutData.date as WorkoutDateFormat),
  })
}
