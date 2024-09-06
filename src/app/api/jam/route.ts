import { Jam } from '@/types/Jam';

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/firebase-admin-config';

//Create a new jam
export async function POST(NextRequest: NextRequest) {
    const reqBody = await NextRequest.json();
    const hostUserId = reqBody.hostUser;
    const reqBodyWithUser = {
        ...reqBody,
        hostUser: db.collection('users').doc(hostUserId),
    };

    try {
        const jamDocRef = await db
            .collection('jams')
            .doc(reqBody.id)
            .set(reqBodyWithUser);

        return NextResponse.json({ message: 'Jam added' }, { status: 200 });
    } catch (error) {
        console.error(
            error,
            'Internal server error: Jam not added to firestore'
        );
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
