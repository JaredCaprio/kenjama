'use client';
import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from 'firebase/auth';
import { db, firebaseAuth } from '../config/firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { AuthContextType, UserState } from '@/types/context/Auth';

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signInWithGoogle: () => {},
    signOutWithGoogle: () => {},
});

type props = {
    children: ReactNode;
};

export const AuthContextProvider = ({ children }: props) => {
    const [user, setUser] = useState<UserState | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
            if (!user || !user.uid) {
                setUser(null);
                setLoading(false);
            }
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    async function signInWithGoogle(router: AppRouterInstance) {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(firebaseAuth, provider);
            const user = result.user;

            const userDocRef = doc(db, 'users', result.user.uid);

            const userSnap = await getDoc(userDocRef);
            const idToken = await user.getIdToken();

            if (!userSnap.exists()) {
                await setDoc(userDocRef, {
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    photoURL: user.photoURL,
                });
            }
            await fetch(`/api/login`, {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });
            router.push('/dashboard');
        } catch (error) {
            console.error('Error signing in with Google', error);
        }
    }

    async function signOutWithGoogle() {
        try {
            await firebaseAuth.signOut();
        } catch (error) {
            console.error('Error signing out with Google', error);
        }
    }

    return (
        <AuthContext.Provider
            value={{ user, loading, signInWithGoogle, signOutWithGoogle }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
