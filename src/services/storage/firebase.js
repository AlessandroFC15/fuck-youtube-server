import admin from 'firebase-admin'
import { firebase as firebaseConfig } from '../../config'

let db

if (firebaseConfig.private_key) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig)
  })

  db = admin.firestore()
} else {
  console.log('Private key not configured for Firebase, attempts will not be saved.')
}

export default db
