import dayjs from 'dayjs'
import { arrayUnion } from 'firebase/firestore'
import type { QueryClient } from '@tanstack/solid-query'

import { USER_DATA_WEIGHT_QUERY_KEY } from '~/constants'

export const createUserWeightData = (weight: string) => ({
  weightInfo: arrayUnion({ weight, date: dayjs().format('DD.MM.YYYY') }),
})

export const invalidateUserWeightQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries([USER_DATA_WEIGHT_QUERY_KEY])
}
