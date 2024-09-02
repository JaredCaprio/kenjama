import { Jam } from '@/types/Jams';
import { DocumentData } from 'firebase-admin/firestore';
import Image from 'next/image';

type AttendeesListProps = {
    Id: string;
    jamData: Jam;
};

const AttendeesList = async ({ Id, jamData }: AttendeesListProps) => {
    //Fetch Attendees list from api
    const attendeesRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/jam/${Id}/attendees`
    );
    const attendeesData = await attendeesRes.json();

    return (
        <section aria-label="attendees" className="col-span-3 lg:col-span-2">
            <div className="rounded-xl bg-accent p-5">
                <div className="flex flex-col gap-5">
                    <div className="flex p-5">
                        <h2 className="grow">
                            Attendees {`(${attendeesData?.length | 0})`}
                        </h2>
                        <a href="">See All</a>
                    </div>
                    <div>
                        <ul className="flex flex-wrap justify-evenly gap-5">
                            {attendeesData?.length > 0 &&
                                attendeesData.map((attendant: DocumentData) => (
                                    <li
                                        key={attendant.uid}
                                        className="flex min-w-48 flex-col items-center rounded-xl border-2 border-background/50 bg-accentSecondary p-5"
                                    >
                                        <Image
                                            src={attendant.photoURL}
                                            alt="me"
                                            height={50}
                                            width={50}
                                            style={{
                                                borderRadius: '100px',
                                            }}
                                        />
                                        <p>{attendant.displayName}</p>
                                        <p>
                                            {attendant.uid ===
                                            jamData.hostUser.uid
                                                ? 'Host'
                                                : attendant.title}
                                        </p>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AttendeesList;
