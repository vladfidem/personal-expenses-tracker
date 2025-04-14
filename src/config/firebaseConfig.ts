import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCi5if8QEKOic1T5ZdmMeTy8EXKzl4C-iI',
  authDomain: 'personal-expenses-track-er.firebaseapp.com',
  projectId: 'personal-expenses-track-er',
  storageBucket: 'personal-expenses-track-er.firebasestorage.app',
  messagingSenderId: '666745798070',
  appId: '1:666745798070:web:d811def9d8aacb1f015517',
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export { firebaseApp, auth, db }
