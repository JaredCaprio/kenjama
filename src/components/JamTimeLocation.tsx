'use client';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';
import { DocumentData } from 'firebase/firestore';

type JamTimeLocationProps = {
    jamData: DocumentData | null;
};

const JamTimeLocation = ({ jamData }: JamTimeLocationProps) => {
    const jamDate = new Date(jamData?.dateTime!);
    const addMinutesToDate = (date: Date, minutesString: string) =>
        new Date(date.getTime() + parseInt(minutesString) * 60000);

    const jamEndTime = addMinutesToDate(jamDate, jamData?.duration!);
    const jamTimesForCalendarLink =
        `${new Date(jamDate)
            .toISOString()
            .replace(/[-:]/g, '')
            .slice(0, 15)}Z/${new Date(jamEndTime)
            .toISOString()
            .replace(/[-:]/g, '')
            .slice(0, 15)}Z` || '';

    return (
        <section className="col-span-3 items-center lg:col-span-1">
            <div className="sticky top-5">
                <div className="flex flex-col items-start justify-center gap-8 rounded-xl bg-accent p-5">
                    <div className="flex items-center gap-10">
                        <FaClock style={{ fontSize: '25px' }} />
                        <div>
                            <p>
                                {jamDate.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </p>
                            <p>
                                {new Date(jamDate).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                })}
                                {' to '}
                                {new Date(jamEndTime).toLocaleTimeString(
                                    'en-US',
                                    {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                    }
                                )}
                            </p>
                            <a
                                target="_blank"
                                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${jamData?.title}&details=${jamData?.description}&dates=${jamTimesForCalendarLink}&location=${jamData?.address}`}
                            >
                                Add to Google Calendar
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-10">
                        <FaMapMarkerAlt style={{ fontSize: '25px' }} />
                        <div>
                            <p>{jamData?.location}</p>
                            <p className="opacity-50">{jamData?.address}</p>
                        </div>
                    </div>
                    <Image
                        alt="Sample map"
                        height={150}
                        width={500}
                        src="/sample-map.png"
                    />
                    <a href="">Report this Event</a>
                </div>
            </div>
        </section>
    );
};

export default JamTimeLocation;
