//Types for Jam data
export type Jam = {
    uid: string;
    title: string;
    description: string;
    attendees: { userId: string }[];
    dateTime: string;
    location: string;
    address: string;
    duration: string;
    howToFindUs: string;
    photoURL: string;
    hostUser: {
        displayName: string;
        email: string;
        photoURL: string;
        uid: string;
    };
};
