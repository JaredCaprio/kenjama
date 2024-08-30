import { db } from '@/config/firebase-admin-config';
import { DocumentReference } from 'firebase-admin/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    NextRequest: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    const { id } = params;
    if (!id) {
        return NextResponse.json(
            { error: 'Jam ID is required' },
            { status: 400 }
        );
    }

    try {
        // Store ref to document with id in jams collection
        const jamRef = db.collection('jams').doc(id);
        //get snapshot from document reference
        const jamSnap = await jamRef.get();
        //Make sure a document exists on the snapshot
        if (!jamSnap.exists) {
            return NextResponse.json(
                { error: 'Jam not found' },
                { status: 400 }
            );
        }
        let jamData = jamSnap.data();

        if (jamData) {
            const userRef = jamData.hostUser;
            if (userRef instanceof DocumentReference) {
                const userSnap = await userRef.get();
                if (userSnap.exists) {
                    const hostUser = userSnap.data();
                    jamData = {
                        ...jamData,
                        hostUser,
                    };
                }
            }
        }

        return NextResponse.json(jamData);
    } catch (error) {
        console.error('Error fetching jam data from firestore', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
