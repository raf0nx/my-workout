import { arrayUnion } from 'firebase/firestore'
import type { QueryClient } from '@tanstack/solid-query'

import { USER_DATA_WEIGHT_QUERY_KEY } from '~/constants'
import { getCurrentDateInDDMMYYYYFormat } from '~/utils/utils'
import type { WeightInfo } from '~/components/weight-kpi/weight-kpi-dialog/weight-kpi-dialog-content/types'

export const createUserWeightData = (weight: string) => ({
  weightsInfo: arrayUnion({ weight, date: getCurrentDateInDDMMYYYYFormat() }),
})

export const sortWeightsInfoByNewestFirst = (weightsInfo: WeightInfo[]) =>
  weightsInfo.reverse()

export const invalidateUserWeightQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries([USER_DATA_WEIGHT_QUERY_KEY])
}
