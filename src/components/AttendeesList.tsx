'use client';

import { db } from '@/config/firebase-config';
import { FirebaseUserData } from '@/types/FirebaseUser';
import { Jam } from '@/types/Jam';
import { DocumentData } from 'firebase-admin/firestore';
import {
    collection,
    doc,
    DocumentSnapshot,
    getDoc,
    getDocs,
    onSnapshot,
} from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type AttendeesListProps = {
    Id: string;
    jamData: Jam;
};

function AttendeesList({ Id, jamData }: AttendeesListProps) {
    const [attendees, setAttendees] = useState<(FirebaseUserData | null)[]>([]);

    const attendeesColRef = collection(db, 'jams', Id, 'attendees');

    useEffect(() => {
        const unsubscribe = onSnapshot(
            attendeesColRef,
            async (snapshot) => {
                const attendeesWithUserData = await Promise.all(
                    snapshot.docs.map(async (doc) => {
                        const attendeeData = doc.data();

                        const userRef = attendeeData.userRef;

                        if (userRef) {
                            const userSnap: DocumentSnapshot =
                                await getDoc(userRef);
                            if (userSnap.exists()) {
                                const userData =
                                    userSnap.data() as FirebaseUserData;
                                return userData;
                            }
                        }
                        return null;
                    })
                );

                setAttendees(attendeesWithUserData);
            },
            (error) => console.log(error)
        );
        return () => unsubscribe();
    }, []);

    return (
        <section aria-label="attendees" className="col-span-3 lg:col-span-2">
            <div className="rounded-xl bg-accent p-5">
                <div className="flex flex-col gap-5">
                    <div className="flex p-5">
                        <h2 className="grow">
                            Attendees {`(${attendees?.length | 0})`}
                        </h2>
                        <a href="">See All</a>
                    </div>
                    <div>
                        <ul className="flex flex-wrap justify-evenly gap-5">
                            {attendees?.length > 0 &&
                                attendees.map((attendant) => (
                                    <Link
                                        key={attendant?.uid}
                                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${attendant?.uid}`}
                                    >
                                        <li className="flex min-w-48 flex-col items-center rounded-xl border-2 border-background/50 bg-accentSecondary p-5">
                                            <Image
                                                src={attendant?.photoURL || ''}
                                                alt="me"
                                                height={50}
                                                width={50}
                                                style={{
                                                    borderRadius: '100px',
                                                }}
                                            />
                                            <p>{attendant?.displayName}</p>
                                            <p className="opacity-60">
                                                {attendant?.uid ===
                                                jamData.hostUser.uid
                                                    ? 'Host'
                                                    : ''}
                                                {/* Add title/team (sweets, lotus, locked studios, etc.) to user  */}
                                            </p>
                                        </li>
                                    </Link>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AttendeesList;
