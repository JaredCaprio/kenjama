'use client';
import React, { useState, useEffect } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { FirebaseUserData } from '@/types/FirebaseUser';
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

    async function fetchAttendanceStatus() {
        const attendanceRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/jam/${eventId}/attendees`
        );
        const attendanceData = await attendanceRes.json();

        if (Array.isArray(attendanceData)) {
            const isUserAttending = attendanceData.filter(
                (attendant: FirebaseUserData) => {
                    return attendant.uid == userId;
                }
            );
            setIsAttending(!!isUserAttending.length);
        }
        setIsLoading(false);
    }

    const toggleAttendance = async () => {
        setIsLoading(true);
        const patchReqBody = {
            attending: isAttending ? false : true,
            userId,
        };

        const attendanceRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/jam/${eventId}/attendees`,
            {
                method: 'PATCH',
                body: JSON.stringify(patchReqBody),
            }
        );
        setIsLoading(false);
        setIsAttending(!isAttending);
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
