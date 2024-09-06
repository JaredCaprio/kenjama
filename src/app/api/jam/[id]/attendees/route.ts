import { db } from '@/config/firebase-admin-config';
import { FieldValue } from 'firebase-admin/firestore';
import { DocumentReference } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

//Get attendees by Jam Id
export async function GET(
    NextRequest: NextRequest,
    context: any
): Promise<NextResponse> {
    const {
        params: { Id },
    } = context;

    try {
        const jamRef = db.collection('jams').doc(Id).collection('attendees');
        const attendeesSnap = await jamRef.get();
        if (!attendeesSnap.empty) {
            const jamData = attendeesSnap.docs.map((doc) => doc.data());
            const attendeesWithUserData = await Promise.all(
                jamData.map(async (doc) => {
                    const userRef = doc.userRef;
                    const userSnap = await userRef.get();
                    if (userSnap.exists) {
                        const userData = userSnap.data();
                        return userData;
                    } else {
                        console.log('No such document!');
                    }
                })
            );
            return NextResponse.json(attendeesWithUserData);
        }

        return NextResponse.json({
            message: 'No Attendees found in subcollection',
        });
    } catch (error) {
        console.error(`Error fetching attendees from firestore: ${error}`);
        return NextResponse.json(
            { error: `Internal Server Error 500: ${error}` },
            { status: 500 }
        );
    }
}

//Update attendees for individual jam document
export async function PATCH(
    NextRequest: NextRequest,
    { params }: { params: { Id: string } }
) {
    try {
        const { Id } = params;
        const { userId, attending } = await NextRequest.json();

        //Get references to both the Jam and user documents
        const jamRef = db.collection('jams').doc(Id);
        const userRef = db.collection('users').doc(userId);

        //Check if the attendees subcollection exists on Jam document and the updated attendance status
        const jamSnap = await jamRef.collection('attendees').doc(userId).get();
        if (!jamSnap.exists && attending) {
            await jamRef.collection('attendees').doc(userId).create({
                userRef,
            });
            await userRef.collection('jams').doc(Id).create({
                jamRef,
            });
        } else if (jamSnap.exists && !attending) {
            await jamRef.collection('attendees').doc(userId).delete();
            await userRef.collection('jams').doc(Id).delete();
        }
        return NextResponse.json({ message: 'Attendance Status Updated' });
    } catch (error) {
        console.error(`error patching jam data with firebase: ${error}`);
        return NextResponse.json(
            { error: 'Internal Server Error: Jam data unable to be patched' },
            { status: 500 }
        );
    }
}
