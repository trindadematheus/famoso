import { useNavigate } from 'react-router-dom';

import { Event } from '../../types/event';
import * as S from './styles'

type EventInfoTooltipProps = {
    event: Event
}

function EventInfoTooltip({ event }: EventInfoTooltipProps) {
    const navigate = useNavigate()

    return (
        <>
            <S.Container>
                <h2 className="title">{event.title}</h2>
                <p className="song-name">{event.song.title} | F${event.song.value}</p>

                <button className='action' onClick={() => navigate(`/show/${event.song.videoId}`)} >Cantar</button>
            </S.Container>
        </>
    )
}

export default EventInfoTooltip;