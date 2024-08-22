import React from 'react';
import Image from 'next/image';
import { FaClock } from 'react-icons/fa';
import { IoMdPin } from 'react-icons/io';
import Link from 'next/link';

type Props = {};

const attendees = [
    {
        imagURL: '/ezra.jpg',
        name: 'Jared',
        title: 'Organizer',
        id: '1',
    },
    {
        imagURL: '/ezra.jpg',
        name: 'Nick Gallagher',
        title: 'Sweets',
        id: '2',
    },
    {
        imagURL: '/ezra.jpg',
        name: 'John Kress',
        title: 'Sweet',
        id: '3',
    },
    {
        imagURL: '/ezra.jpg',
        name: 'Issac',
        title: 'Lotus',
        id: '4',
    },
];

export default function Jam({}: Props) {
    return (
        <main className="p-5 sm:p-10">
            <section className="flex flex-col gap-10" aria-label="jam header">
                <h1 className="text-3xl">Games of Ken in Crescent Lake Park</h1>
                <Link href="/profile/345">
                    <div className="mb-10 flex items-center gap-4">
                        <Image
                            src="/ezra.jpg"
                            alt="alternative text"
                            style={{ borderRadius: '50px' }}
                            height={50}
                            width={50}
                        />
                        <div>
                            <p>Hosted by</p>{' '}
                            <p className="font-semibold">Jared C.</p>
                        </div>
                    </div>
                </Link>
            </section>
            <section
                aria-label="jam info"
                className="mb-16 flex flex-col items-center gap-10 md:flex-row md:items-start"
            >
                <div className="flex-grow basis-0">
                    <Image
                        src="/vinoy-park.jpg"
                        alt="alternative text"
                        height={40}
                        width={1500}
                    />
                    <div className="">
                        <h2 className="py-5 text-3xl">Details</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Fugiat alias amet id eius labore inventore,
                            maxime, illum voluptas ad consectetur sit excepturi
                            beatae voluptatem. Consequatur atque voluptatum illo
                            beatae, dolorem nobis explicabo optio eius omnis
                            sequi aliquam ab numquam veritatis magni impedit
                            animi dicta iure accusantium error culpa earum
                            consequuntur dignissimos! Architecto, cumque. Facere
                            fugit neque perspiciatis ea voluptatum! Dolores,
                            nobis eaque! Ad, error. Molestias rem ipsam cum
                            accusantium vero iusto odio quasi unde nobis amet
                            repudiandae, ab, blanditiis suscipit odit porro
                            soluta doloribus in. Fuga repellat dolorem quam
                            facere repellendus.
                        </p>
                        <br />
                        <p>
                            Laudantium, ipsa. Delectus accusantium iure quaerat
                            corporis, laborum eos cupiditate placeat, non nobis
                            omnis vel expedita rem! Magni pariatur atque
                            molestias hic rerum quasi facere tempore, vero eum
                            laudantium dolorem dignissimos voluptate distinctio
                            dolores eligendi corrupti veritatis. Temporibus
                            excepturi soluta illo corrupti tempora. Optio
                            facilis ipsum molestiae in unde magni repellendus
                            corporis officiis praesentium numquam quasi repellat
                            consequatur voluptatibus, adipisci fugit velit ex
                            eligendi vel, quos laborum sed et maiores! Ipsam,
                            totam quaerat. Ipsum rem eius nam amet eligendi
                            dolor error earum voluptas recusandae iure, delectus
                            veniam repudiandae deserunt quod soluta, nisi at
                            saepe. Tempora facilis veniam qui harum dolor,
                            soluta odit. Expedita saepe fugit suscipit, sed
                            molestias vero quidem voluptatem cumque numquam
                            inventore officia repudiandae aut dolorem accusamus
                            pariatur ad sequi laboriosam excepturi mollitia.
                        </p>
                        <br />
                        <p>
                            Quis dolores, sed soluta repudiandae dignissimos vel
                            temporibus consequuntur iure minus. Deserunt
                            aspernatur eaque, libero cumque officia aut
                            doloremque iure adipisci quasi optio rem vel eum
                            quisquam ullam laboriosam esse maiores ratione quo
                            quidem quia! Velit beatae consequatur rem voluptate
                            asperiores illum explicabo odio repudiandae debitis
                            corporis, ipsum obcaecati reiciendis eveniet autem
                            libero culpa temporibus animi laudantium eum
                            veritatis. Deleniti, odit ad corporis tempore ipsa
                            asperiores obcaecati sapiente rerum perspiciatis!
                            Quia nesciunt quae incidunt repellat repellendus aut
                            voluptatum, repudiandae quibusdam culpa illo et
                            dolorem? Ipsam ipsum blanditiis laborum assumenda
                            animi adipisci corrupti error dolores totam in
                            tempore, exercitationem necessitatibus dignissimos.
                            Maiores culpa voluptatibus illo voluptate,
                            accusantium quam iure dolores assumenda eius
                            obcaecati, quo esse? Fuga harum consequuntur dolor
                            doloremque, expedita repellat aliquid, ex omnis
                            esse,
                        </p>
                    </div>
                </div>
                <div className="max-w-96 flex-grow basis-0">
                    <div className="flex flex-col items-center justify-center gap-8 rounded-md bg-accent py-5">
                        <div className="flex items-center gap-10">
                            <FaClock style={{ fontSize: '25px' }} />
                            <div>
                                <p>Friday May 23rd, 2024</p>
                                <p>2:00 PM to 3:30 PM EST</p>
                                <a href="">Add to calendar</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-10">
                            <IoMdPin style={{ fontSize: '35px' }} />
                            <div>
                                <p>Crescent Lake Park</p>
                                <p>1320 5th St N</p>
                                <p>St. Petersburg, Fl 33701</p>
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
            <section aria-label="attendees" className="flex">
                <div className="flex  max-w-[50%] flex-grow basis-0 flex-col">
                    <div className="flex gap-x-28">
                        <h2 className="">Attendees (12)</h2>
                        <a href="">See All</a>
                    </div>
                    <div>
                        <ul className="flex gap-10 bg-accent">
                            {attendees.map((attendant) => (
                                <li key={attendant.id}>
                                    <Image
                                        src={attendant.imagURL}
                                        alt="me"
                                        height={50}
                                        width={50}
                                        style={{ borderRadius: '100px' }}
                                    />
                                    <p>{attendant.name}</p>
                                    <p>{attendant.title}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="max-w-96 flex-grow basis-0"></div>
            </section>
            <section aria-label="photos"></section>
            <section aria-label="comments"></section>
        </main>
    );
}
