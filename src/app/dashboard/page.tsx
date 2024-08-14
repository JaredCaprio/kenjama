import React from 'react';
import Image from 'next/image';
import { FaClock, FaUserAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

type Props = {};

type EventsDataType = {
    title: string;
    date: Date;
    time: string;
    attendees: number;
    location: string;
    key: number;
    imageURL: string;
};

const dateTimeOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

function RNG() {
    return Math.floor(Math.random() * 10000) + 1;
}

const eventsData: EventsDataType[] = [
    {
        title: 'Jam in Stray Park next to the Jam I live in',
        date: new Date(2024, 3, 23),
        time: '6:30PM',
        location: '701 Bay shore Dr NE, St. Petersburg, FL',
        attendees: 23,
        key: RNG(),
        imageURL: '/vinoy-park.jpg',
    },
    {
        title: 'Jam with a Hobo in Williams park',
        date: new Date(2024, 3, 23),
        time: '6:30PM',
        location: '666 4th Ave N, St. Petersburg, FL',
        attendees: 0,
        key: RNG(),
        imageURL: '/vinoy-park.jpg',
    },
    {
        title: 'Jam in Stray Park next to the Jam I live in',
        date: new Date(2024, 3, 23),
        time: '6:30PM',
        location: '701 Bay shore Dr NE, St. Petersburg, FL',
        attendees: 23,
        key: RNG(),
        imageURL: '/vinoy-park.jpg',
    },
    {
        title: 'Jam with a Hobo in Williams park',
        date: new Date(2024, 3, 23),
        time: '6:30PM',
        location: '666 4th Ave N, St. Petersburg, FL',
        attendees: 0,
        key: RNG(),
        imageURL: '/vinoy-park.jpg',
    },
    {
        title: 'Jam in Stray Park next to the Jam I live in',
        date: new Date(2024, 3, 23),
        time: '6:30PM',
        location: '701 Bay shore Dr NE, St. Petersburg, FL',
        attendees: 23,
        key: RNG(),
        imageURL: '/vinoy-park.jpg',
    },
    {
        title: 'Jam with a Hobo in Williams park',
        date: new Date(2024, 3, 23),
        time: '6:30PM',
        location: '666 4th Ave N, St. Petersburg, FL',
        attendees: 0,
        key: RNG(),
        imageURL: '/vinoy-park.jpg',
    },
];

export default function Dashboard(props: Props) {
    return (
        <main
            aria-label="events feed wrapper "
            className=" bg-accent text-white "
        >
            <section
                aria-label="events feed section "
                className="border-2 border-gray-200/25 p-10 "
            >
                <h1 className="text-3xl">Events Feed</h1>
                <div aria-label="events list" className="">
                    <ul className="my-10 flex flex-col gap-10 ">
                        {eventsData.map((event) => (
                            <div
                                key={event.key}
                                className="flex flex-col items-center gap-10 border-2 border-gray-200/25 p-5 sm:flex-row sm:justify-between "
                            >
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-lg font-semibold">
                                        {event.title}
                                    </h2>
                                    <p>
                                        <FaClock className="mr-2 inline" />
                                        {event.date.toLocaleDateString(
                                            'en-US',
                                            {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            }
                                        )}{' '}
                                        {event.time}
                                    </p>
                                    <p>
                                        <FaLocationDot className="mr-2 inline" />
                                        {event.location}
                                    </p>
                                    <p>
                                        <FaUserAlt className="mr-2 inline" />
                                        {event.attendees} Attendees
                                    </p>
                                </div>
                                <Image
                                    src={event.imageURL}
                                    width={250}
                                    height={256}
                                    alt="event image"
                                />
                            </div>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
