import { db } from '@/config/firebase-admin-config';
import { DocumentData } from 'firebase-admin/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    NextRequest: NextRequest,
    context: any
): Promise<NextResponse> {
    const {
        params: { id },
    } = context;

    try {
        //Fetch data for single jam from jams collection
        const jamRef = db.collection('jams').doc(id);
        const jamSnap = await jamRef.get();
        if (!jamSnap.exists) {
            return NextResponse.json(
                { error: 'Jam not found' },
                { status: 404 }
            );
        }
        const jamData = jamSnap.data();
        //Check if attendees property isn't null or not an array
        if (!jamData?.attendees || !Array.isArray(jamData.attendees)) {
            return NextResponse.json(
                { error: 'Attendees list not found' },
                { status: 404 }
            );
        }
        //Map over attendees and save list of userIds in array
        const jamAttendees = jamData.attendees.map(
            (user: { userId: string }) => user.userId
        );
        const attendeesWithUserData = [];
        //Loop over list of userIds and fetch data for each user
        for (const attendee of jamAttendees) {
            const userRef = db.collection('users').doc(attendee);
            const userSnap = await userRef.get();
            if (userSnap.exists) {
                const userData = userSnap.data();
                if (userData) {
                    attendeesWithUserData.push(userData);
                }
            }
        }
        if (attendeesWithUserData.length == 0) {
            return NextResponse.json({});
        }
        return NextResponse.json(attendeesWithUserData);
    } catch (error) {
        console.error(`Error fetching attendees from firestore: ${error}`);
        return NextResponse.json(
            { error: `Internal Server Error: ${error}` },
            { status: 500 }
        );
    }
}
