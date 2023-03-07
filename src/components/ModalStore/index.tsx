import { useMemo } from 'react';
import { toast } from 'react-hot-toast';

import storeItems from '../../data/store';
import { useSinger } from '../../hook/use-singer';
import { Song } from '../../types/song';
import * as S from './styles'

interface StoreItem extends Song {
    isBought: boolean
}

function ModalStore() {
    const { songs, setSongs, artist, handleMoney } = useSinger()

    const items = useMemo(() => {
        return storeItems.reduce((acc, curr) => {
            const idx = songs.findIndex((song) => song.videoId === curr.videoId)

            if (idx !== -1) {
                acc.push({ ...curr, isBought: true })
                return acc
            }

            acc.push({ ...curr, isBought: false })

            return acc
        }, [] as StoreItem[])
    }, [songs])

    function handleBuy(songItem: Song) {
        if (artist.money >= songItem.fee) {
            localStorage.setItem('@famoso:songs', JSON.stringify([...songs, songItem]))
            setSongs([...songs, songItem])
            handleMoney('remove', songItem.fee)
        } else {
            toast('Você não tem dinheiro suficiente');
        }
    }

    return (
        <>
            <S.Container>
                <h1 className="title">STORE</h1>

                <S.List>
                    {items.map((item) => (
                        <S.Item>
                            <div className="left-content">
                                <h2 className="song-name">{item.title}</h2>
                                <p className="artist-name">{item.artist}</p>
                                <p className="attr">Reward: F${item.value}</p>
                            </div>

                            <button onClick={() => handleBuy(item)} disabled={item.isBought} className="buy">Buy F${item.fee}</button>
                        </S.Item>
                    ))}
                </S.List>
            </S.Container>
        </>
    )
}

export default ModalStore;