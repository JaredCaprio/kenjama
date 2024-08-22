import React from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import {
    FaUser,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaClock,
    FaUsers,
} from 'react-icons/fa';

type Props = {};

export default function Profile({}: Props) {
    return (
        <main className="flex flex-col gap-6 md:flex-row">
            <section
                aria-label="Profile-info"
                className="border-borderDefault border-2 bg-accent p-5"
            >
                <div className="relative">
                    <div className="absolute h-full w-full bg-gradient-to-t from-black/75 to-black/0"></div>
                    <Image
                        width={500}
                        height={100}
                        className="rounded-lg border-2 border-accent"
                        src="/ezra.jpg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt="Profile Picture"
                    />
                    <div className="absolute bottom-2 left-5">
                        <div className="flex items-center">
                            <FaUser className="mr-1" />
                            <p>Jared</p>
                        </div>
                        <div className="flex items-center">
                            <FaMapMarkerAlt className="mr-1" />
                            <p>St. Pete, FL</p>
                        </div>
                        <div className="flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            <p>Joined Kenjama in April 2024</p>
                        </div>
                    </div>
                </div>
                <div className="m-10 flex justify-between">
                    <div className="text-center">
                        <p>0</p>
                        <p className=" font-semibold"> Friends</p>
                    </div>
                    <div className="text-center">
                        <p>34</p>
                        <p className=" font-semibold">RSVPs</p>
                    </div>
                </div>
                <div className="mb-10 flex items-center justify-center">
                    <Button willHover={true} bgColor="bg-primary ">
                        Chat with Jared
                    </Button>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p>Team</p>
                    <div>
                        <Image
                            height={150}
                            width={200}
                            src="/sweets.svg"
                            alt="Team Logo"
                        />
                    </div>
                    <span>Sweets</span>
                </div>
            </section>
            <section
                className="border-borderDefault grow border-2 bg-accent p-4"
                aria-label="recent-activity"
            >
                <h2 className="mb-4 text-3xl">Recent Activity</h2>
                <article className="border-borderDefault bg-accentSecondary mb-4 border-2 p-4">
                    <p>
                        Jared <span className="opacity-50">added an event</span>
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-y-2">
                            <h3>Games of Ken at park</h3>

                            <div className="flex items-center">
                                <FaCalendarAlt className="mr-1" />
                                <p>Friday May 23rd, 2024 3:00PM</p>
                            </div>
                            <div className="flex items-center">
                                <FaClock className="mr-1" />
                                <p>1320 5th St N, St. Petersburg, FL 33701</p>
                            </div>
                        </div>
                        <Image
                            height={150}
                            width={200}
                            src="/vinoy-park.jpg"
                            alt="Event Image"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </article>
                <article className="mb-4 ">
                    <div className="flex items-center">
                        <p>Jared and Johnny Kress became Friends</p>
                        <FaUsers className="ml-2 opacity-50" />
                    </div>
                </article>
                <article className="border-borderDefault bg-accentSecondary mb-4 border-2 p-4 ">
                    <p>
                        Jared <span className="opacity-50">added an event</span>
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-y-2">
                            <h3>Games of Ken at park</h3>

                            <div className="flex items-center">
                                <FaCalendarAlt className="mr-1" />
                                <p>Friday May 23rd, 2024 3:00PM</p>
                            </div>
                            <div className="flex items-center">
                                <FaClock className="mr-1" />
                                <p>1320 5th St N, St. Petersburg, FL 33701</p>
                            </div>
                        </div>
                        <Image
                            height={150}
                            width={200}
                            src="/vinoy-park.jpg"
                            alt="Event Image"
                        />
                    </div>
                </article>
            </section>
        </main>
    );
}
