import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import storeItems from '../../data/store'

import { useSinger } from '../../hook/use-singer'
import * as S from './styles'

function Home() {
    const navigate = useNavigate()
    const { setArtist, setSongs } = useSinger()

    const [name, setName] = useState('Matheus')

    async function handleStart() {
        const artistData = {
            name,
            level: 0,
            money: 0
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
                    <S.Form>
                        <input value={name} onChange={evt => setName(evt.target.value)} className='input' type="text" placeholder='Seu nome' />

                        <button type='button' onClick={handleStart} className="btn">COMEÇAR</button>
                    </S.Form>
                </S.Container>
            </S.Wrapper>
        </>
    )
}

export default Home