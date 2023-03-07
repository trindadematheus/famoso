import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import YouTube from 'react-youtube'
import Swal from 'sweetalert2'

import { useSinger } from '../../hook/use-singer'
import * as S from './styles'

function ShowScreen() {
    const { songs, handleMoney } = useSinger()

    const navigate = useNavigate()
    const params = useParams()

    const songData = useMemo(() => {
        const findedSong = songs.find(song => song.videoId === params.videoId)

        return findedSong
    }, [songs])

    function handleOnEnd() {
        Swal.fire(
            `Parabéns, show completado!`,
            `+ F$${songData?.value}`,
            'success'
        ).then((result) => {
            if (result.isConfirmed) {
                handleMoney('add', songData?.value || 1)
                navigate('/map')
            }
        })
    }

    function handleCancel() {
        Swal.fire({
            title: 'Deseja cancelar o show?',
            text: "Para cancelar o show você precisará pagar uma multa aos contratantes.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, cancelar!',
            cancelButtonText: 'Voltar para o show'
        }).then((result) => {
            if (result.isConfirmed) {
                handleMoney('remove', songData?.value || 1)
                navigate('/map')
            }
        })
    }

    return (
        <>
            <S.Wrapper>
                <S.Container>
                    <YouTube
                        videoId={params.videoId}
                        opts={{
                            width: '1000',
                            // playerVars: {
                            //     controls: 0,
                            //     disablekb: 1
                            // }
                        }}
                        onEnd={handleOnEnd}
                    />

                    <S.EventData>
                        <h1 className="title">{songData?.title}</h1>

                        <div className="actions">
                            <button onClick={handleCancel} className="action danger">CANCELAR SHOW</button>
                        </div>
                    </S.EventData>
                </S.Container>
            </S.Wrapper>
        </>
    )
}

export default ShowScreen