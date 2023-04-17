import type { QueryClient } from '@tanstack/solid-query'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import type { DocumentData, QuerySnapshot } from 'firebase/firestore'

import type {
  Exercises,
  Workout,
  WorkoutDateFormat,
} from '~/components/workouts-table/types'
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
      date: formatISO8601ToWorkoutDate(docData.date),
      exercises: sortWorkoutExercises(docData.exercises),
    }
  })
}

export const formatISO8601ToWorkoutDate = (date: string): WorkoutDateFormat =>
  dayjs(date).format('DD.MM.YYYY') as WorkoutDateFormat

export const sortWorkoutExercises = (exercises: Exercises) =>
  keys(exercises)
    .sort()
    .reduce<Exercises>((acc, curr) => ({ ...acc, [curr]: exercises[curr] }), {})

export const invalidateGetWorkoutsQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries([WORKOUTS_DOC_ID])
}

export const formatWorkoutDateToISO8601 = (workoutDate: WorkoutDateFormat) =>
  dayjs(workoutDate, 'DD.MM.YYYY').format()
