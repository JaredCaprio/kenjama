import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export type UserState = {
    displayName: string | null | undefined;
    email: string | null | undefined;
    photoURL: string | null | undefined;
    uid: string;
};

export type AuthContextType = {
    user: UserState | null;
    loading: boolean;
    signInWithGoogle: (router: AppRouterInstance) => void;
    signOutWithGoogle: () => void;
};
