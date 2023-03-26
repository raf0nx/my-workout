import {
  collection,
  getDocs,
  addDoc,
  type DocumentData,
  type QuerySnapshot,
} from 'firebase/firestore'

import { db } from '~/config/firebase-config'
import { keys } from '~/utils/utils'
import type { Exercises, Workout } from '~/components/workouts-table/types'

const workoutsCollection = collection(db, 'workouts')

export const getWorkouts = async (): Promise<Workout[]> => {
  const data = await getDocs(workoutsCollection)

  return transformDocsToWorkoutObjects(data)
}

export const postWorkout = async (workoutData: Workout): Promise<void> => {
  await addDoc(workoutsCollection, workoutData)
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
