import { db } from '@/config/firebase-admin-config';
import { DocumentData } from 'firebase-admin/firestore';
import { NextRequest, NextResponse } from 'next/server';

//Get all jams
export async function GET(): Promise<NextResponse> {
    try {
        //Fetch all documents in jams collection
        //TODO - Figure out orderby using timestamp field for date of jam to order the results
        //eliminate the need to sort array of jams on the client
        const querySnapshot = await db.collection('jams').limit(100).get();
        //Map over query snapshot to get data from each doc and store in jamsData variable
        const jamsData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
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
