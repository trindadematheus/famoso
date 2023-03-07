import { v4 as uuidv4 } from "uuid";

import { Event } from "../types/event";
import { Song } from "../types/song";

type GenerateRandomEventsProps = {
    centerLat: number
    centerLong: number
    radiusInMeters: number
    count: number
    songs: Song[]
}


type GenerateRandomLocationProps = Pick<GenerateRandomEventsProps, 'centerLat' | 'centerLong' | 'radiusInMeters'>

// THANKS CHATGPT FOR THIS CODE
function generateRandomLocation({ centerLat, centerLong, radiusInMeters }: GenerateRandomLocationProps) {
    const raioEmGraus = radiusInMeters / 111320;

    const deslocamentoLatitude = Math.random() * raioEmGraus * 2 - raioEmGraus;
    const deslocamentoLongitude = Math.random() * raioEmGraus * 2 - raioEmGraus;

    const latitude = centerLat + deslocamentoLatitude;
    const longitude = centerLong + deslocamentoLongitude;

    return { latitude, longitude };
}

export default function generateRandomEvents({ centerLat, centerLong, radiusInMeters, count, songs }: GenerateRandomEventsProps): Event[] {
    let events: Event[] = []

    for (let index = 0; index < count; index++) {
        const index = Math.floor(Math.random() * songs.length);

        events.push({
            id: uuidv4(),
            title: 'Some Party',
            song: songs[index],
            location: generateRandomLocation({ centerLat, centerLong, radiusInMeters }),
        })
    }

    return events
}