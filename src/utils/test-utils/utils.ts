import { firebaseConfig } from '~/config/firebase-config'

export const flushDatabase = async () => {
  try {
    await fetch(
      `http://localhost:8080/emulator/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`,
      { method: 'DELETE' }
    )
  } catch (err) {
    console.error('Flushing the database went wrong!')
  }
}
