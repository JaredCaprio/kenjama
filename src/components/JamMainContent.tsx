import Image from 'next/image';

const JamMainContent = async ({ params }: any) => {
    const { id } = params;

    const jamRes = await fetch(`http://localhost:3000/jam/${id}`);
    const jamData = await jamRes.json();

    return (
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
    );
};

export default JamMainContent;
