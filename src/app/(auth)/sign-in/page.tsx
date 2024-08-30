'use client';
import { FormEvent, useState } from 'react';
import { db, firebaseAuth } from '../../../config/firebase-config';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    UserCredential,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const schema = z.object({
    email: z.string().email().min(3).max(128),
    password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const SignInPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const user = await signInWithEmailAndPassword(
                firebaseAuth,
                data.email,
                data.password
            );

            router.push('/');
        } catch (error) {
            setError('email', { message: 'Email not found' });
        }
    };

    const handleGoogleLogIn = async () => {
        try {
            const googleProvider = new GoogleAuthProvider();
            const result: UserCredential = await signInWithPopup(
                firebaseAuth,
                googleProvider
            );
            const user = result.user;

            const userDocRef = doc(db, 'users', result.user.uid);

            const userSnap = await getDoc(userDocRef);

            if (!userSnap.exists()) {
                await setDoc(userDocRef, {
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    photoURL: user.photoURL,
                });
            }

            const idToken = await user.getIdToken();

            await fetch(`/api/login`, {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });
            router.push('/dashboard');
        } catch (error) {
            throw error;
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-content/100">
            <section className="self-center rounded-3xl bg-gray-900  p-10 sm:p-20">
                <h1 className="mb-8 text-3xl font-bold">Sign In</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-sm"
                >
                    <div className="mb-6">
                        <label htmlFor="email" className="mb-2 block">
                            Email
                        </label>
                        <input
                            {...register('email')}
                            type="email"
                            id="email"
                            className="w-full rounded-md bg-gray-800 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="mb-2 block">
                            Password
                        </label>
                        <input
                            {...register('password')}
                            type="password"
                            id="password"
                            className="w-full rounded-md bg-gray-800 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        hidden={isSubmitting}
                        type="submit"
                        className="w-full rounded-md bg-primary/100 px-4 py-2 font-bold text-white hover:bg-tertiary/100 focus:outline-none focus:ring focus:ring-blue-400"
                    >
                        {isSubmitting ? 'Loading...' : 'Sign In'}
                    </button>
                </form>
                <hr className="mt-11 w-full text-gray-700/50" />
                <button
                    onClick={() => handleGoogleLogIn()}
                    className="mt-10 flex w-full items-center justify-center rounded-lg bg-primary/100 px-4 py-2 font-bold text-white hover:bg-tertiary/100 focus:outline-none focus:ring focus:ring-red-400"
                >
                    <FcGoogle className="mr-2" /> Log in with Google
                </button>
                <div className="mt-7 ">
                    Don&#39;t have an account?{' '}
                    <Link
                        className="text-center text-blue-800 hover:text-blue-600"
                        href="/sign-up"
                    >
                        Sign Up
                    </Link>
                </div>
                <Image
                    priority
                    src="/kenjama-hero-1920.png"
                    fill
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        opacity: '0.55',
                        maxWidth: '2000px',
                        zIndex: '-100',
                    }}
                    alt="kenjama hero image"
                />
            </section>
        </div>
    );
};

export default SignInPage;
