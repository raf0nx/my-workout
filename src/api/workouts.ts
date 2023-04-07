import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  type DocumentData,
  type QuerySnapshot,
} from 'firebase/firestore'

import { db } from '~/config/firebase-config'
import { keys } from '~/utils/utils'
import type { Exercises, Workout } from '~/components/workouts-table/types'
import { WORKOUTS_DOC_ID } from '~/constants'

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

const transformDocsToWorkoutObjects = (
  data: QuerySnapshot<DocumentData>
): Workout[] => {
  return data.docs.map(doc => {
    const docData = doc.data() as Workout

    return {
      ...docData,
      id: doc.id,
      exercises: sortWorkoutExercises(docData.exercises),
    }
  })
}

const sortWorkoutExercises = (exercises: Exercises) =>
  keys(exercises)
    .sort()
    .reduce<Exercises>((acc, curr) => ({ ...acc, [curr]: exercises[curr] }), {})
