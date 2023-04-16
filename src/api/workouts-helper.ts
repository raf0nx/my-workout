import type { QueryClient } from '@tanstack/solid-query'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import type { DocumentData, QuerySnapshot } from 'firebase/firestore'

import type { Exercises, Workout } from '~/components/workouts-table/types'
import { WORKOUTS_DOC_ID } from '~/constants'
import { keys } from '~/utils/utils'

dayjs.extend(customParseFormat)

export const transformDocsToWorkoutObjects = (
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

export const sortWorkoutExercises = (exercises: Exercises) =>
  keys(exercises)
    .sort()
    .reduce<Exercises>((acc, curr) => ({ ...acc, [curr]: exercises[curr] }), {})

export const invalidateGetWorkoutsQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries([WORKOUTS_DOC_ID])
}

export const formatWorkoutDateToISO8601 = (workoutDate: string) =>
  dayjs(workoutDate, 'DD.MM.YYYY').format()
