import { db } from '@/config/firebase-admin-config';
import { NextRequest, NextResponse } from 'next/server';

//Get user data by Id
export async function GET(
    NextRequest: NextRequest,
    { params }: { params: { Id: string } }
) {
    const { Id } = params;

    try {
        const userRef = db.collection('users').doc(Id);
        const userSnap = await userRef.get();

        if (!userSnap.exists) {
            return NextResponse.json(
                { error: 'No User Found' },
                { status: 404 }
            );
        }
        const userData = userSnap.data();
        return NextResponse.json(userData);
    } catch (error) {
        console.error(`Error fetching user data from firestore: ${error}`);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
