import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  type DocumentSnapshot,
} from 'firebase/firestore'

import { db } from '~/config/firebase-config'
import { USER_DATA_COLLECTION_ID, USER_WEIGHT_DOC_ID } from '~/constants'

import type { UserDataWeightDoc } from './types'
import {
  createUserWeightData,
  sortWeightsInfoByNewestFirst,
} from './user-data-helpers'

const userDataCollection = collection(db, USER_DATA_COLLECTION_ID)
const userDataWeightDoc = doc(userDataCollection, USER_WEIGHT_DOC_ID)

export const getUserWeight = async () => {
  const docData = (await getDoc(
    userDataWeightDoc
  )) as DocumentSnapshot<UserDataWeightDoc>
  const weightsInfo = docData.data()?.weightsInfo ?? []

  return sortWeightsInfoByNewestFirst(weightsInfo)
}

export const addNewUserWeight = async (weight: string) => {
  const userWeightData = createUserWeightData(weight)
  const doesUserDataWeightDocExist = (await getDoc(userDataWeightDoc)).exists()

  if (doesUserDataWeightDocExist) {
    await updateDoc(userDataWeightDoc, userWeightData)
  } else {
    await setDoc(userDataWeightDoc, userWeightData)
  }
}
