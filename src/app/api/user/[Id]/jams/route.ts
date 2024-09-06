import { db } from '@/config/firebase-admin-config';
import { NextRequest, NextResponse } from 'next/server';

// Get all Jams user is attending
export async function GET(
    NextRequest: NextRequest,
    context: { params: { Id: string } }
) {
    const {
        params: { Id },
    } = context;
    try {
        const userJamsColRef = db
            .collection('users')
            .doc(Id)
            .collection('jams');
        const userJamsColSnap = await userJamsColRef.get();
        if (userJamsColSnap.empty) {
            return NextResponse.json(
                { message: 'User not attending any Jams' },
                { status: 404 }
            );
        }
        const userJamsColRefs = userJamsColSnap.docs.map(
            (jam: { data: () => any }) => {
                return jam.data();
            }
        );

        //Populate data from array of Jam doc refs
        const userJamsData = await Promise.all(
            userJamsColRefs.map(
                async (jamData: {
                    jamRef: FirebaseFirestore.DocumentReference;
                }) => {
                    if (jamData.jamRef) {
                        const jamSnap = await jamData.jamRef.get();
                        if (jamSnap.exists) {
                            return jamSnap.data();
                        }
                    }
                }
            )
        );

        return NextResponse.json(userJamsData);
    } catch (error) {
        console.error(`Error fetching users attending jams: ${error}`);
        return NextResponse.json(
            { error: 'Internal Server error fetching users attending jams' },
            { status: 500 }
        );
    }
}
