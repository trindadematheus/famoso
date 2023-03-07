import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import storeItems from '../../data/store'
import { useSinger } from '../../hook/use-singer'
import { Artist } from '../../types/artist'
import * as S from './styles'

function Home() {
    const navigate = useNavigate()
    const { setArtist, setSongs } = useSinger()

    const [name, setName] = useState('')

    async function handleStart(e: any) {
        e.preventDefault()

        const artistData: Artist = {
            name: name || 'John Doe',
            level: 0,
            money: 0,
            recordLabelId: null
        }

        setArtist(artistData)
        setSongs([storeItems[0]])

        localStorage.setItem('@famoso:artist', JSON.stringify(artistData))
        localStorage.setItem('@famoso:songs', JSON.stringify([storeItems[0]]))

        navigate('/map')
    }

    return (
        <>
            <S.Wrapper>
                <S.Container>
                    <S.Card>
                        <h1 className="title">Famoso</h1>

                        <S.Form onSubmit={handleStart} >
                            <p className="label">Your name:</p>
                            <input value={name} onChange={evt => setName(evt.target.value)} className='input' type="text" placeholder='Your name' />

                            <button onClick={handleStart} className="btn">START</button>
                        </S.Form>
                    </S.Card>
                </S.Container>
            </S.Wrapper>
        </>
    )
}

export default Home