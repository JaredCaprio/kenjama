import { getAuth, sendEmailVerification } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const firebaseApp = !getApps().length
    ? initializeApp(firebaseConfig)
    : getApp();

const firebaseAuth = getAuth(firebaseApp);

const db = getFirestore();

const jamsCollection = collection(db, 'jams');

export { firebaseApp, firebaseAuth, db, jamsCollection, sendEmailVerification };
