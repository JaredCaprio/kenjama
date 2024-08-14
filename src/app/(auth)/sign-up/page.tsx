'use client';
import { FormEvent, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import {
    firebaseAuth,
    db,
    collection,
    getDocs,
    addDoc,
} from '../../../../libs/firebase/firebase-config';
import { signInWithGoogle } from '../../../../libs/firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { UserCredential, sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const SignUpPage = () => {
    // State for email, password, first Name, and Last Name inputs
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });

    const router = useRouter();
    const [createUserWithEmailAndPassword] =
        useCreateUserWithEmailAndPassword(firebaseAuth);

    const colRef = collection(db, 'users');

    // Handler for form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await createUserWithEmailAndPassword(
                formData.email,
                formData.password
            );
            addDoc(colRef, {
                email: formData['email'],
                firstName: formData['firstName'],
                lastName: formData['lastName'],
            });
            if (firebaseAuth.currentUser) {
                sendEmailVerification(firebaseAuth.currentUser).then(() => {
                    console.log('email sent!');
                });
            } else {
                console.error('Current user is null');
            }
            console.log({ res });
            setFormData({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
            });
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    // handler for google log in
    const handleGoogleLogIn = () => {
        signInWithGoogle();
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-content/100">
            <section className="rounded-3xl bg-gray-900 p-10 sm:p-20">
                <h1 className="mb-8 text-3xl font-bold">Sign Up</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <div className="mb-6">
                        <label htmlFor="firstName" className="mb-2 block">
                            First Name
                        </label>
                        <input
                            type="input"
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    firstName: e.target.value,
                                }))
                            }
                            className="w-full rounded-md bg-gray-800 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                            placeholder="Enter your First Name"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="lastName" className="mb-2 block">
                            Last Name
                        </label>
                        <input
                            type="input"
                            id="lastNam"
                            value={formData.lastName}
                            onChange={(e) =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    lastName: e.target.value,
                                }))
                            }
                            className="w-full rounded-md bg-gray-800 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                            placeholder="Enter your Last Name"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="mb-2 block">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    email: e.target.value,
                                }))
                            }
                            className="w-full rounded-md bg-gray-800 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="mb-2 block">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData((prevData) => ({
                                    ...prevData,
                                    password: e.target.value,
                                }))
                            }
                            className="w-full rounded-md bg-gray-800 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-primary/100 px-4 py-2 font-bold text-white hover:bg-tertiary/100 focus:outline-none focus:ring focus:ring-blue-400"
                    >
                        Sign Up
                    </button>
                </form>
                <hr className="mt-11 w-full text-gray-700/50" />
                <button
                    className="mt-10 flex w-full items-center justify-center rounded-lg bg-primary/100 px-4 py-2 font-bold text-white hover:bg-tertiary/100 focus:outline-none focus:ring focus:ring-red-400"
                    onClick={handleGoogleLogIn}
                >
                    <FcGoogle className="mr-2" /> Log in with Google
                </button>
                <div className="mt-7 text-center text-blue-800 hover:text-blue-600">
                    <Link href="/sign-in">Sign In</Link>
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

export default SignUpPage;
