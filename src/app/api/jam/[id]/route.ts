import { admin, db } from '@/config/firebase-admin-config';
import { DocumentReference } from 'firebase-admin/firestore';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { Jam } from '@/types/Jam';

//Get jam by Id
export async function GET(
    NextRequest: NextRequest,
    { params }: { params: { Id: string } }
): Promise<NextResponse> {
    const { Id } = params;
    if (!Id) {
        return NextResponse.json(
            { error: 'Jam ID is required' },
            { status: 400 }
        );
    }

    try {
        // Store ref to document with id in jams collection
        const jamRef = db.collection('jams').doc(Id);
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

//Update jam by Id
export async function PATCH(
    req: NextRequest,
    { params }: { params: { Id: string } }
) {
    try {
        const { Id } = params;
        const reqBody = await req.json();
        const hostUserId = reqBody.hostUser;
        const reqBodyWithUser = {
            ...reqBody,
            hostUser: db.collection('users').doc(hostUserId),
        };

        const jamRef = await db
            .collection('jams')
            .doc(Id)
            ?.update(reqBodyWithUser);

        return NextResponse.json({ message: jamRef }, { status: 200 });
    } catch (error) {
        console.error(`error patching jam data with firebase: ${error}`);
        return NextResponse.json(
            { error: 'Internal Server Error: Jam data unable to be patched' },
            { status: 500 }
        );
    }
}

export async function POST(NextRequest: NextRequest) {
    const reqBody: Jam = await NextRequest.json();

    try {
        const jamDocRef = db.collection('jams').doc(reqBody.id).set(reqBody);
    } catch (error) {}
}
