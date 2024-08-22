import {
    initializeApp,
    getApps,
    getApp,
    cert,
    ServiceAccount,
} from 'firebase-admin/app';
import { firestore } from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SECRET_KEY as string);

const firebaseAdminConfig = {
    credential: cert(serviceAccount as ServiceAccount),
};

export const admin =
    getApps().length <= 0 ? initializeApp(firebaseAdminConfig) : getApp();

export const db = firestore();
