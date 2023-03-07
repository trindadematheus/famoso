import { toast } from 'react-hot-toast';
import recordLabels from '../../data/record-labels';

import { useSinger } from '../../hook/use-singer';
import { RecordLabel } from '../../types/record-label';
import * as S from './styles'

function ModalContract() {
    const { setArtist, artist, handleMoney } = useSinger()

    function handleBuy(item: RecordLabel) {
        if (artist.money >= item.fee) {
            const data = { ...artist, recordLabelId: item.id }

            localStorage.setItem('@famoso:artist', JSON.stringify(data));
            setArtist(data)

            handleMoney('remove', item.fee)
        } else {
            toast('Você não tem dinheiro suficiente');
        }
    }

    return (
        <>
            <S.Container>
                <h1 className="title">RECORD LABELS</h1>

                <S.List>
                    {recordLabels.map((item) => (
                        <S.Item>
                            <div className="left-content">
                                <h2 className="song-name">{item.name}</h2>
                                <p className="attr">Reward Increase: F${item.rewardIncrease}</p>
                                <p className="attr">Concert Increase: {item.concertIncrease}</p>
                            </div>

                            <button onClick={() => handleBuy(item)} disabled={item.id === artist.recordLabelId} className="buy">Buy F${item.fee}</button>
                        </S.Item>
                    ))}
                </S.List>
            </S.Container>
        </>
    )
}

export default ModalContract;