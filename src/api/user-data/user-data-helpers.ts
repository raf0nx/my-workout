import { arrayUnion } from 'firebase/firestore'
import type { QueryClient } from '@tanstack/solid-query'

import { USER_DATA_WEIGHT_QUERY_KEY } from '~/constants'
import { getCurrentDateInDDMMYYYYFormat } from '~/utils/utils'

export const createUserWeightData = (weight: string) => ({
  weightInfo: arrayUnion({ weight, date: getCurrentDateInDDMMYYYYFormat() }),
})

export const invalidateUserWeightQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries([USER_DATA_WEIGHT_QUERY_KEY])
}
