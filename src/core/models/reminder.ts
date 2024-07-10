export interface Reminder {
    id: string;
    title: string;
    description: string;
    location: {
        latitude: number;
        longitude: number;
    };
    radius: number;
    startDate: Date;
    endDate: Date | null;
    lastSend: Date | null;
    username_id: string;
}