import {
  collection,
  doc,
  getDoc,
  type DocumentSnapshot,
} from 'firebase/firestore'

import { db } from '~/config/firebase-config'
import { USER_DATA_COLLECTION_ID, USER_WEIGHT_DOC_ID } from '~/constants'
import type { WeightInfo } from '~/components/weight-kpi/weight-kpi-dialog/weight-kpi-dialog-content/types'

import type { UserDataWeightDoc } from './types'

const userDataCollection = collection(db, USER_DATA_COLLECTION_ID)
const userDataWeightDoc = doc(userDataCollection, USER_WEIGHT_DOC_ID)

export const getUserWeight = async (): Promise<WeightInfo[] | undefined> => {
  const docData = (await getDoc(
    userDataWeightDoc
  )) as DocumentSnapshot<UserDataWeightDoc>

  return docData.data()?.weightInfo
}
