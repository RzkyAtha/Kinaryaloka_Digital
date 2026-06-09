import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore'

// ─── Firebase Config ─────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// ─── Generic Firestore helpers ───────────────────────────────────────────────

export async function firestoreGetAll<T>(collectionName: string): Promise<T[]> {
  const snap = await getDocs(collection(db, collectionName))
  return snap.docs.map(d => ({ ...d.data(), id: d.id } as T))
}

export async function firestorePut<T extends { id: string }>(
  collectionName: string,
  item: T,
): Promise<void> {
  await setDoc(doc(db, collectionName, item.id), item)
}

export async function firestoreDelete(
  collectionName: string,
  id: string,
): Promise<void> {
  await deleteDoc(doc(db, collectionName, id))
}

export async function firestoreSeedAll<T extends { id: string }>(
  collectionName: string,
  items: T[],
): Promise<void> {
  const batch = writeBatch(db)
  for (const item of items) {
    batch.set(doc(db, collectionName, item.id), item)
  }
  await batch.commit()
}

export function isFirebaseConfigured(): boolean {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey !== 'undefined'
  )
}

export { db }
