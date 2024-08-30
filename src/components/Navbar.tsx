'use client';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import Button from './Buttons/Button';

import { IoMdClose } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useAuth } from '@/contexts/authContext';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../config/firebase-config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Navbar() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileMenuPopup, setProfileMenuPopup] = useState(false);
    const dropDownRef: MutableRefObject<HTMLDivElement | null> =
        useRef<HTMLDivElement | null>(null);
    const mobileDropDownRef: MutableRefObject<HTMLElement | null> =
        useRef<HTMLElement | null>(null);

    const handleSetMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    const handleProfilePopup = () => {
        setProfileMenuPopup(!profileMenuPopup);
    };

    const closeOpenMenus = (e: MouseEvent) => {
        if (
            profileMenuPopup &&
            !dropDownRef.current?.contains(e.target as Node | null)
        ) {
            setProfileMenuPopup(false);
        }
        if (
            mobileMenuOpen &&
            !mobileDropDownRef.current?.contains(e.target as Node | null)
        ) {
            setMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeOpenMenus);
    });

    const handleSignOut = async () => {
        await signOut(firebaseAuth);
        await fetch(`/api/logout`);
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
                        style={{ minWidth: '150px' }}
                    />
                </Link>
                <RxHamburgerMenu
                    onClick={handleSetMobileMenu}
                    className={`${
                        !mobileMenuOpen ? 'z-20 sm:hidden' : 'hidden'
                    } min-w-10 cursor-pointer text-white`}
                    size={30}
                />
                <IoMdClose
                    onClick={handleSetMobileMenu}
                    className={`${
                        mobileMenuOpen ? 'z-20 sm:hidden' : 'hidden'
                    } min-w-10 cursor-pointer`}
                    size={30}
                />
                <ul className="relative hidden items-center justify-between text-center sm:flex">
                    {!loading && user ? (
                        <>
                            <li onClick={handleProfilePopup} className="p-5">
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

                            <div
                                ref={dropDownRef}
                                className={`${!profileMenuPopup ? 'invisible -translate-y-6 opacity-0' : 'visible -translate-y-0 opacity-100'} absolute right-1/2 top-[85%] rounded-md border-2 border-slate-700 bg-accent px-6 py-5 text-left transition-all `}
                            >
                                <span className="inline-flex items-center">
                                    <FaUser className="mr-2" />
                                    <Link href={`/profile/${user?.uid}`}>
                                        {user.displayName}
                                    </Link>
                                </span>
                                <div className="inline-flex items-center">
                                    <MdEmail className="mr-2 opacity-100" />
                                    <span className="opacity-40">
                                        {user.email}
                                    </span>
                                </div>
                                <li className="py-3">
                                    <p onClick={() => handleSignOut()}>
                                        {' '}
                                        <Button willHover={true}>
                                            Sign Out
                                        </Button>{' '}
                                    </p>
                                </li>
                            </div>
                        </>
                    ) : loading ? (
                        <Skeleton
                            baseColor="#151515"
                            highlightColor="#1a1a1a"
                            count={1}
                            style={{ borderRadius: '9999px', padding: '20px' }}
                            height={50}
                            width={50}
                        />
                    ) : (
                        <>
                            <li className="p-5">
                                <Link href="/sign-in">
                                    <Button
                                        willHover={true}
                                        buttonType="secondary"
                                    >
                                        Log in
                                    </Button>
                                </Link>
                            </li>
                            <li className="p-5">
                                <Link href="/sign-up">
                                    <Button willHover={true}>Sign Up</Button>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <nav
                ref={mobileDropDownRef}
                className={
                    mobileMenuOpen
                        ? 'fixed right-0 top-0 z-10 h-screen w-[60%] min-w-48 bg-black/95 p-10 text-center duration-200 ease-in sm:hidden'
                        : 'fixed left-[-99999999px] text-center'
                }
            >
                <ul className="flex flex-col items-center justify-between space-y-10">
                    {!loading && user ? (
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

                            <li className="text-white">
                                <Link href={`/profile/${user?.uid}`}>
                                    {user.displayName}
                                </Link>
                                <br />
                                <span className="opacity-50">{user.email}</span>
                            </li>

                            <li>
                                <p onClick={() => handleSignOut()}>
                                    {' '}
                                    <Button willHover={true}>
                                        Sign Out
                                    </Button>{' '}
                                </p>
                            </li>
                        </>
                    ) : loading ? (
                        <Skeleton
                            baseColor="#151515"
                            highlightColor="#1a1a1a"
                            count={1}
                            style={{ borderRadius: '9999px', padding: '20px' }}
                            height={50}
                            width={50}
                        />
                    ) : (
                        <>
                            <li>
                                <Link href="/sign-in">
                                    <Button willHover={false}>Log in</Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/sign-up">
                                    <Button willHover={false}>Sign Up</Button>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}
