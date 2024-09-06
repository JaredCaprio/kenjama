import jwt from 'jsonwebtoken';
import React from 'react';
import Image from 'next/image';
import AttendeesList from '@/components/AttendeesList';
import JamTimeLocation from '@/components/JamTimeLocation';
import HostBadge from '@/components/HostBadge';
import 'react-loading-skeleton/dist/skeleton.css';
import { cookies } from 'next/headers';
import { auth } from '@/config/firebase-admin-config';
import type { Jam } from '@/types/Jam';

type FirebaseToken = {
    id_token: string;
    refresh_token: string;
    custom_token: string;
};

export default async function Jam({ params }: { params: { Id: string } }) {
    const { Id } = params;
    const cookieStore = cookies();
    // TODO - abstract getting and decoding token to obtain userId
    const idToken = cookieStore.get('AuthToken')?.value;
    if (!idToken) {
        console.error('idToken undefined');
        throw new Error('Id Token undefined');
    }

    const decodedJwt = jwt.decode(idToken) as FirebaseToken;
    let decodedToken;
    if (typeof decodedJwt?.id_token === 'string') {
        decodedToken = await auth.verifyIdToken(decodedJwt.id_token);
    }
    const userUid = decodedToken?.uid;

    //Fetch jam data
    const jamRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/jam/${Id}`
    );
    const jamData: Jam = await jamRes.json();

    const photoURL: string = jamData.hostUser?.photoURL;

    const HostBadgeProps = {
        photoURL,
        displayName: jamData?.hostUser?.displayName?.split(' ')[0],
        userId: userUid,
        jamData: jamData,
    };

    return (
        <main className="grid grid-cols-3 gap-10 p-5 sm:p-10">
            <section
                className="col-span-3 flex flex-col gap-10"
                aria-label="jam header"
            >
                <h1 className="text-3xl">{jamData?.title}</h1>
                <HostBadge {...HostBadgeProps} />
            </section>
            <section aria-label="jam info" className="col-span-3 lg:col-span-2">
                <div className="grow basis-0">
                    <Image
                        src={jamData?.photoURL!}
                        alt="alternative text"
                        height={40}
                        width={1500}
                        style={{
                            maxHeight: '750px',
                            objectFit: 'cover',
                            objectPosition: 'top',
                        }}
                    />
                    <div className="">
                        <h2 className="py-5 text-3xl">Details</h2>
                        <p>{jamData?.description}</p>
                    </div>
                    <div>
                        <h2 className="py-5 text-3xl">How to find us</h2>
                        <p>{jamData?.howToFindUs}</p>
                    </div>
                </div>
            </section>
            <JamTimeLocation jamData={jamData} />
            <AttendeesList jamData={jamData} Id={Id} />
            <section aria-label="photos"></section>
            <section aria-label="comments"></section>
        </main>
    );
}
