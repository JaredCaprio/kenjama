'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaClock, FaUserAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import Link from 'next/link';
import Button from '@/components/Button';
import {
    collection,
    DocumentData,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import { db, jamsCollection } from '@/config/firebase-config';
import { useAuth } from '@/contexts/authContext';

type Props = {};

type JamDataType = {
    id: string;
    title: string;
    dateTime: Date;
    duration: string;
    description: string;
    howToFindUs: string;
    photo: string | undefined;
    location: string;
};

export default function Dashboard(props: Props) {
    const [jamsData, setJamsData] = useState<JamDataType[] | []>([]);

    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            const fetchJams = async () => {
                const q = query(
                    jamsCollection,
                    where('hostEmail', '==', user?.email)
                );
                const querySnapshot = await getDocs(q);
                const jamsData = querySnapshot.docs.map(
                    (doc) =>
                        ({
                            ...doc.data(),
                            id: doc.id,
                        }) as JamDataType
                );
                console.log(jamsData);
                setJamsData(jamsData);
            };
            fetchJams();
        }
    });

    return (
        <main
            aria-label="events feed wrapper "
            className=" bg-accent text-white "
        >
            <section
                aria-label="events feed section "
                className="border-2 border-gray-200/25 p-10 "
            >
                <div className="flex justify-between">
                    <h1 className="text-3xl">Events Feed</h1>
                    <Button
                        href="/jam/add"
                        willHover={true}
                        bgColor={'bg-primary'}
                    >
                        Create Jam
                    </Button>
                </div>
                <div aria-label="events list" className="">
                    <ul className="my-10 flex flex-col gap-10 ">
                        {jamsData.map((event, i) => (
                            <Link key={i} href="/jam">
                                {' '}
                                <div className="flex cursor-pointer flex-col items-center gap-10 border-2 border-borderDefault bg-accentSecondary p-5 sm:flex-row sm:justify-between ">
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-lg font-semibold">
                                            {event.title}
                                        </h2>
                                        <p>
                                            <FaClock className="mr-2 inline" />
                                            {new Date(
                                                event.dateTime
                                            ).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}{' '}
                                            {/* {event.date} */}
                                        </p>
                                        <p>
                                            <FaLocationDot className="mr-2 inline" />
                                            {event.location}
                                        </p>
                                        {/*   <p>
                                            <FaUserAlt className="mr-2 inline" />
                                            {event.attendees} Attendees
                                        </p> */}
                                    </div>
                                    {/* <Image
                                        src={event?.photo}
                                        width={250}
                                        height={256}
                                        alt="event image"
                                    /> */}
                                </div>
                            </Link>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
