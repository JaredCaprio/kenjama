'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';

import Link from 'next/link';
import { JamDataType } from '@/types/Jams';

import { fetchJam } from '@/lib/fetchJam';
import { useAuth } from '@/contexts/authContext';
import { useParams } from 'next/navigation';

const attendees = [
    {
        imagURL: '/ezra.jpg',
        name: 'Jared',
        title: 'Organizer',
        id: '1',
    },
    {
        imagURL: '/ezra.jpg',
        name: 'Nick Gallagher',
        title: 'Sweets',
        id: '2',
    },
    {
        imagURL: '/ezra.jpg',
        name: 'John Kress',
        title: 'Sweet',
        id: '3',
    },
    {
        imagURL: '/ezra.jpg',
        name: 'Issac',
        title: 'Lotus',
        id: '4',
    },
];

export default function Jam() {
    const [jamData, setJamData] = useState<JamDataType | null>(null);
    const { user, loading } = useAuth();
    const { Id } = useParams<{ Id: string }>();

    useEffect(() => {
        if (!loading) {
            fetchJam(Id).then((data) => setJamData(data));
        }
    }, [user, loading, Id]);
    const jamDate = new Date(jamData?.dateTime!);

    const addMinutesToDate = (date: Date, minutesString: string) =>
        new Date(date.getTime() + parseInt(minutesString) * 60000);

    const jamEndTime = addMinutesToDate(jamDate, jamData?.duration!);

    const formattedHostName =
        jamData?.hostEmail && jamData?.hostName
            ? `${jamData?.hostName.split(' ')[0]} ${jamData?.hostName.split(' ')[1].slice(0, 1)}.`
            : 'User data not found';

    const photoURL: string = user?.photoURL || '/ezra.jpg';

    return (
        <main className="p-5 sm:p-10">
            <section className="flex flex-col gap-10" aria-label="jam header">
                <h1 className="text-3xl">{jamData?.title}</h1>

                <div className="mb-10 flex items-center gap-4">
                    <Image
                        src={photoURL}
                        alt="alternative text"
                        style={{ borderRadius: '50px' }}
                        height={50}
                        width={50}
                    />
                    <div>
                        <Link href="/profile/345">
                            <p>Hosted by</p>{' '}
                            <p className="font-semibold">{formattedHostName}</p>
                        </Link>
                    </div>
                </div>
            </section>
            <section
                aria-label="jam info"
                className="mb-16 flex flex-col items-center gap-10 md:flex-row md:items-start"
            >
                <div className="flex-grow basis-0">
                    <Image
                        src="/vinoy-park.jpg"
                        alt="alternative text"
                        height={40}
                        width={1500}
                    />
                    <div className="">
                        <h2 className="py-5 text-3xl">Details</h2>
                        <p>{jamData?.description}</p>
                    </div>
                </div>
                <div className="max-w-96 flex-grow basis-0">
                    <div className="flex flex-col items-start justify-center gap-8 rounded-md bg-accent p-5">
                        <div className="flex items-center gap-10">
                            <FaClock style={{ fontSize: '25px' }} />
                            <div>
                                <p>
                                    {jamDate.toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </p>
                                <p>
                                    {new Date(jamDate).toLocaleTimeString(
                                        'en-US',
                                        { hour: 'numeric', minute: '2-digit' }
                                    )}
                                    {' to '}
                                    {new Date(jamEndTime).toLocaleTimeString(
                                        'en-US',
                                        { hour: 'numeric', minute: '2-digit' }
                                    )}
                                </p>
                                <a href="">Add to calendar</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-10">
                            <FaMapMarkerAlt style={{ fontSize: '25px' }} />
                            <div>
                                <p>{jamData?.location}</p>
                                <p className="opacity-50">{jamData?.address}</p>
                            </div>
                        </div>
                        <Image
                            alt="Sample map"
                            height={150}
                            width={500}
                            src="/sample-map.png"
                        />
                        <a href="">Report this Event</a>
                    </div>
                </div>
            </section>
            <section aria-label="attendees" className="flex">
                <div className="flex  max-w-[50%] flex-grow basis-0 flex-col">
                    <div className="flex gap-x-28">
                        <h2 className="">Attendees (12)</h2>
                        <a href="">See All</a>
                    </div>
                    <div>
                        <ul className="flex gap-10 bg-accent">
                            {attendees.map((attendant) => (
                                <li key={attendant.id}>
                                    <Image
                                        src={attendant.imagURL}
                                        alt="me"
                                        height={50}
                                        width={50}
                                        style={{ borderRadius: '100px' }}
                                    />
                                    <p>{attendant.name}</p>
                                    <p>{attendant.title}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="max-w-96 flex-grow basis-0"></div>
            </section>
            <section aria-label="photos"></section>
            <section aria-label="comments"></section>
        </main>
    );
}
