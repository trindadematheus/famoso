import { useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Modal from 'react-modal';

import EventInfoTooltip from '../../components/EventInfoTooltip'
import ModalContract from '../../components/ModalContract';
import ModalStore from '../../components/ModalStore';
import recordLabels from '../../data/record-labels';
import { useSinger } from '../../hook/use-singer'
import { Event } from '../../types/event'
import generateRandomLocation from '../../utils/generate-random-location'
import * as S from './styles'

const currentLocation = {
    lat: 51.505,
    long: -0.09
}

const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY
const MAPBOX_USERID = import.meta.env.VITE_MAPBOX_USERID
const MAPBOX_STYLEID = import.meta.env.VITE_MAPBOX_STYLEID

Modal.setAppElement('#root');

const CustomTileLayer = () => {
    return MAPBOX_API_KEY ? (
        <TileLayer
            attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url={`https://api.mapbox.com/styles/v1/${MAPBOX_USERID}/${MAPBOX_STYLEID}/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_API_KEY}`}
        />
    ) : (
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    )
}

function MapScreen() {
    const { songs, artist } = useSinger()

    const [isModalStoreOpen, setIsModalStoreOpen] = useState(false)
    const [isModalContractOpen, setIsModalContractOpen] = useState(false)

    const increase = useMemo(() => {
        return {
            name: artist.recordLabelId ? recordLabels[artist.recordLabelId - 1].name : '',
            value: artist.recordLabelId ? recordLabels[artist.recordLabelId - 1].concertIncrease : 0,
        }
    }, [artist])

    const events: Event[] = useMemo(() => {
        if (songs.length > 0) {
            return generateRandomLocation({
                centerLat: currentLocation.lat,
                centerLong: currentLocation.long,
                radiusInMeters: 4000,
                count: 2 + increase.value,
                songs: songs
            })
        }

        return []
    }, [songs, artist])

    return (
        <>
            <S.Menu>
                <S.MenuContainer>
                    <S.LeftContent>
                        <h2 className="singer-name">{artist.name}</h2>

                        <p className="money">F${artist.money}</p>
                        <p className="promoter">{increase.name}</p>
                    </S.LeftContent>

                    <S.RightContent>
                        <button onClick={() => setIsModalContractOpen(true)} className='btn-menu' >CONTRACTS</button>
                        <button onClick={() => setIsModalStoreOpen(true)} className='btn-menu'>STORE</button>
                    </S.RightContent>
                </S.MenuContainer>
            </S.Menu>

            <S.Wrapper>
                <MapContainer scrollWheelZoom={false} center={[currentLocation.lat, currentLocation.long]} zoom={13} style={{ height: '100%', width: '100%' }} >
                    <CustomTileLayer />

                    {events.map((event) => (
                        <Marker key={event.id} position={[event.location.latitude, event.location.longitude]}>
                            <Popup>
                                <EventInfoTooltip event={event} />
                            </Popup>
                        </Marker>
                    ))}

                </MapContainer>
            </S.Wrapper>

            <Modal
                isOpen={isModalStoreOpen}
                onRequestClose={() => setIsModalStoreOpen(false)}
                className="Modal"
                overlayClassName="Overlay"
            >
                <ModalStore />
            </Modal>

            <Modal
                isOpen={isModalContractOpen}
                onRequestClose={() => setIsModalContractOpen(false)}
                className="Modal"
                overlayClassName="Overlay"
            >
                <ModalContract />
            </Modal>
        </>
    )
}

export default MapScreen