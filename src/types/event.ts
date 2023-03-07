import { Song } from "./song"

export type Event = {
    id: string
    title: string
    song: Song
    location: {
        latitude: number
        longitude: number
    }
}