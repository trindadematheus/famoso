import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Song } from "../types/song";
import { Artist } from "../types/artist";

interface SingerProviderProps {
    children: React.ReactNode;
}

interface SingerContextProps {
    artist: Artist
    setArtist(artistData: Artist): void
    songs: Song[]
    setSongs(songs: Song[]): void
    handleMoney(type: 'add' | 'remove', amount: number): void
}

const SingerContext = createContext<SingerContextProps | null>(null);

export function SingerProvider({ children }: SingerProviderProps) {
    const navigate = useNavigate()

    const [songs, setSongs] = useState<Song[]>([])
    const [artist, setArtist] = useState<Artist>({
        name: '',
        level: 0,
        money: 0,
        recordLabelId: null
    })

    useEffect(() => {
        loadArtistData()
    }, [])

    async function loadArtistData() {
        const artistData = localStorage.getItem('@famoso:artist')
        const storagedSongList = localStorage.getItem('@famoso:songs')

        if (!artistData || !storagedSongList) {
            navigate('/')
            return;
        }

        const parsedArtistData = JSON.parse(artistData)
        const parsedSongList = JSON.parse(storagedSongList)

        setSongs(parsedSongList)
        setArtist({
            name: parsedArtistData.name,
            level: parsedArtistData.level,
            money: parsedArtistData.money,
            recordLabelId: parsedArtistData.recordLabelId
        })

        navigate('/map')
    }

    function handleMoney(type: 'add' | 'remove', amount: number) {
        if (type === 'add') {
            setArtist(state => {
                const data = { ...state, money: state.money + amount }
                localStorage.setItem('@famoso:artist', JSON.stringify(data));

                return data
            })
        }

        if (type === 'remove') {
            setArtist(state => {
                const data = { ...state, money: state.money - amount }
                localStorage.setItem('@famoso:artist', JSON.stringify(data));

                return data
            })
        }
    }

    return (
        <SingerContext.Provider
            value={{
                artist,
                setArtist,
                songs,
                setSongs,
                handleMoney
            }}
        >
            {children}
        </SingerContext.Provider>
    );
}

export function useSinger(): SingerContextProps {
    const context = useContext(SingerContext);

    if (!context) {
        throw new Error("useSinger must be used within a SingerProvider");
    }

    return context;
}