'use client';
import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../config/firebase-config';
import { useRouter } from 'next/navigation';

export type UserState = {
    displayName: string | null | undefined;
    email: string | null | undefined;
    photoURL: string | null | undefined;
};

interface AuthContextType {
    user: UserState | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
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

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
