import { arrayUnion } from 'firebase/firestore'
import type { QueryClient } from '@tanstack/solid-query'

import { USER_DATA_WEIGHT_QUERY_KEY } from '~/constants'
import {
  getCurrentDateInDDMMYYYYFormat,
  parseDateInDDMMYYYYFormat,
} from '~/utils/utils'
import type { WeightInfo } from '~/components/weight-kpi/weight-kpi-dialog/weight-kpi-dialog-content/types'

export const createUserWeightData = (weight: string) => ({
  weightsInfo: arrayUnion({ weight, date: getCurrentDateInDDMMYYYYFormat() }),
})

export const sortWeightsInfoByNewestFirst = (
  weightsInfo: WeightInfo[]
): WeightInfo[] =>
  [...weightsInfo].sort((currWeightInfo, nextWeightInfo) => {
    const currWeightInfoDate = parseDateInDDMMYYYYFormat(currWeightInfo.date)
    const nextWeightInfoDate = parseDateInDDMMYYYYFormat(nextWeightInfo.date)

    return nextWeightInfoDate.getTime() - currWeightInfoDate.getTime()
  })

export const invalidateUserWeightQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries([USER_DATA_WEIGHT_QUERY_KEY])
}
