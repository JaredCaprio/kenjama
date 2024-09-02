import {
    initializeApp,
    getApps,
    getApp,
    cert,
    ServiceAccount,
    App,
} from 'firebase-admin/app';
import { firestore } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = JSON.parse(process.env.FIREBASE_SECRET_KEY as string);

const firebaseAdminConfig = {
    credential: cert(serviceAccount as ServiceAccount),
};

export const admin: App =
    getApps().length <= 0 ? initializeApp(firebaseAdminConfig) : getApp();

export const auth = getAuth(admin);
export const db = firestore();
