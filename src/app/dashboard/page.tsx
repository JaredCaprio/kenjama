import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Jam } from '@/types/Jam';
import { FaLocationDot } from 'react-icons/fa6';
import { FaClock, FaRegCalendarPlus } from 'react-icons/fa';
import IconButton from '@/components/Buttons/IconButton';

export default async function Dashboard() {
    const jamsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jams`);
    const jamsData: Jam[] = await jamsRes.json();

    return (
        <main aria-label="events feed wrapper " className=" text-white ">
            <section
                aria-label="events feed section "
                className="border-gray-200/25 p-10 "
            >
                <div className="flex justify-between">
                    <h1 className="text-3xl">Events Feed</h1>
                    <Link href="jam/add">
                        <IconButton
                            icon={<FaRegCalendarPlus />}
                            buttonType={'primary'}
                        >
                            Create Jam
                        </IconButton>
                    </Link>
                </div>
                <div aria-label="events list" className="">
                    <ul className="my-10 flex flex-col gap-10 ">
                        {jamsData &&
                            jamsData //TODO - sort Jams in api before fetching
                                .sort((a, b) =>
                                    a.dateTime.localeCompare(b.dateTime)
                                ) // TODO - Find more efficient way to filter past events
                                .map((jam, i) => (
                                    <Link key={i} href={`/jam/${jam.id}`}>
                                        {' '}
                                        <div className="flex cursor-pointer flex-col items-center gap-10 rounded-lg border-2 border-borderDefault p-5 duration-500 hover:bg-accentSecondary sm:flex-row sm:justify-between ">
                                            <div className="flex flex-col gap-2">
                                                <h2 className="text-lg font-semibold">
                                                    {jam.title}
                                                </h2>
                                                <p>
                                                    <FaClock className="mr-2 inline" />
                                                    {new Date(
                                                        jam.dateTime
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        }
                                                    )}
                                                </p>
                                                <p className="flex items-center">
                                                    <FaLocationDot className="mr-2 inline" />
                                                    {jam.location}
                                                    <br />
                                                    {jam.address}
                                                </p>
                                            </div>
                                            <Image
                                                src={jam?.photoURL}
                                                width={150}
                                                height={150}
                                                style={{
                                                    width: '150px',
                                                    height: '150px',
                                                    objectFit: 'cover',
                                                    objectPosition: 'center',
                                                }}
                                                alt="event image"
                                            />
                                        </div>
                                    </Link>
                                ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
