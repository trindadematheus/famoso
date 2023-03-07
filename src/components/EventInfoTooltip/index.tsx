import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import recordLabels from '../../data/record-labels';
import { useSinger } from '../../hook/use-singer';

import { Event } from '../../types/event';
import * as S from './styles'

type EventInfoTooltipProps = {
    event: Event
}

function EventInfoTooltip({ event }: EventInfoTooltipProps) {
    const navigate = useNavigate()
    const { artist } = useSinger()

    const increase = useMemo(() => {
        return artist.recordLabelId ? `+ F$${recordLabels[artist.recordLabelId - 1].rewardIncrease}` : ''
    }, [artist])

    return (
        <>
            <S.Container>
                <h2 className="title">{event.title}</h2>
                <p className="song-name">{event.song.title}</p>
                <p className="song-name">F${event.song.value} <span className="bonus">{increase}</span> </p>

                <button className='action' onClick={() => navigate(`/show/${event.song.videoId}`)} >SING</button>
            </S.Container>
        </>
    )
}

export default EventInfoTooltip;