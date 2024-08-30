'use client';
import React, { useState, useEffect } from 'react';
import {
    arrayRemove,
    arrayUnion,
    doc,
    getDoc,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebase-config';

import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

import IconButton from './IconButton';

type AttendanceButtonProps = {
    eventId: string;
    userId: string | undefined;
};

const AttendanceButton = ({ eventId, userId }: AttendanceButtonProps) => {
    const [isAttending, setIsAttending] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAttendanceStatus();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventId, userId]);

    const fetchAttendanceStatus = async () => {
        setIsLoading(true);
        try {
            const jamRef = doc(db, 'jams', eventId);
            const jamDoc = await getDoc(jamRef);
            if (jamDoc.exists()) {
                setIsAttending(
                    jamDoc
                        .data()
                        .attendees.map(
                            (user: { userId: string }) => user.userId
                        )
                        .includes(userId)
                );
            } else {
                setIsAttending(false);
            }
        } catch (error) {
            console.error('Error fetching attendance status:', error);
        }
        setIsLoading(false);
    };

    const toggleAttendance = async () => {
        setIsLoading(true);
        try {
            const jamRef = doc(db, 'jams', eventId);
            const newAttendingStatus = !isAttending;
            setIsAttending(newAttendingStatus);

            const updateRes = await updateDoc(jamRef, {
                attendees: newAttendingStatus
                    ? arrayUnion({ userId })
                    : arrayRemove({ userId }),
            });
        } catch (error) {
            console.error('Error updating attendance status:', error);
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <button
                disabled
                className="inline-flex items-center border border-gray-600/50 px-2 py-1  text-white"
            >
                <IoIosCheckmarkCircleOutline />
                Loading
            </button>
        );
    }

    return (
        <IconButton
            onClick={toggleAttendance}
            icon={
                isAttending ? (
                    <IoIosCheckmarkCircle />
                ) : (
                    <IoIosCheckmarkCircleOutline />
                )
            }
        >
            {isAttending ? 'Going' : 'Attend'}
        </IconButton>
    );
};

export default AttendanceButton;
