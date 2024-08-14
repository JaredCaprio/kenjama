'use client';
import React, { useState } from 'react';
import Button from './Button';

import { IoMdClose } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useAuth } from '@/contexts/authContext';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../../libs/firebase/firebase-config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    console.log(user);

    const handleSetMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleSignOut = async () => {
        await signOut(firebaseAuth);
        router.push('/sign-in');
    };

    return (
        <div>
            <nav className="flex h-[130px] items-center justify-between px-12 py-3">
                <Link href={`${user ? '/dashboard' : '/'}`}>
                    <Image
                        src={'/dark-mode-logo.png'}
                        alt="logo"
                        width={200}
                        height={150}
                    />
                </Link>
                <RxHamburgerMenu
                    onClick={handleSetMenu}
                    className={`${
                        !menuOpen ? 'z-20 sm:hidden' : 'hidden'
                    } min-w-10 cursor-pointer text-white`}
                    size={30}
                />
                <IoMdClose
                    onClick={handleSetMenu}
                    className={`${
                        menuOpen ? 'z-20 sm:hidden' : 'hidden'
                    } min-w-10 cursor-pointer`}
                    size={30}
                />
                <ul className="hidden items-center justify-between text-center sm:flex">
                    {user ? (
                        <>
                            <li className="p-5">
                                <Image
                                    width={50}
                                    height={50}
                                    alt="user profile photo"
                                    src={
                                        user.photoURL
                                            ? `${user.photoURL}`
                                            : `https://images.dog.ceo/breeds/mountain-bernese/n02107683_4727.jpg`
                                    }
                                    className="rounded-full"
                                />
                            </li>
                            <li className="p-5">
                                <p onClick={() => handleSignOut()}>
                                    {' '}
                                    <Button
                                        bgColor="bg-primary"
                                        textColor="text-white"
                                        willHover={true}
                                    >
                                        Sign Out
                                    </Button>{' '}
                                </p>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="p-5">
                                <Button href="/sign-in" willHover={false}>
                                    Log in
                                </Button>
                            </li>
                            <li className="p-5">
                                <Button
                                    willHover={true}
                                    textColor="text-white"
                                    bgColor="bg-primary/100"
                                    href="/sign-up"
                                >
                                    Sign Up
                                </Button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <nav
                className={
                    menuOpen
                        ? 'fixed right-0 top-0 z-10 h-screen w-[60%] bg-black/95 p-10 text-center  duration-200 ease-in sm:hidden'
                        : 'fixed left-[-100%] text-center'
                }
            >
                <ul className="flex flex-col items-center justify-between space-y-10">
                    {user ? (
                        <>
                            <li>
                                <Image
                                    width={50}
                                    height={50}
                                    alt="user profile photo"
                                    src={
                                        user.photoURL
                                            ? `${user.photoURL}`
                                            : `https://images.dog.ceo/breeds/mountain-bernese/n02107683_4727.jpg`
                                    }
                                    className="rounded-full"
                                />
                            </li>
                            <li className="text-white">{user.displayName}</li>
                            <li>
                                <p onClick={() => handleSignOut()}>
                                    {' '}
                                    <Button
                                        bgColor="bg-primary/100 text-white"
                                        willHover={true}
                                    >
                                        Sign Out
                                    </Button>{' '}
                                </p>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Button href="/sign-in" willHover={false}>
                                    Log in
                                </Button>
                            </li>
                            <li>
                                <Button
                                    href="/sign-up"
                                    willHover={false}
                                    textColor="text-content"
                                >
                                    Sign Up
                                </Button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}
