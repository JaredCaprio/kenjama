import { db } from '@/config/firebase-admin-config';
import { DocumentData } from 'firebase-admin/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
    try {
        //Fetch all documents in jams collection
        const querySnapshot = await db.collection('jams').get();
        //Map over query snapshot to get data from each doc and store in jamsData variable
        const jamsData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return NextResponse.json(jamsData);
    } catch (error) {
        console.error(`Error fetching jams from firestore ${error}`);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
