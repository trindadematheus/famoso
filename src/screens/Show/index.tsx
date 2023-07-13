import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Swal from "sweetalert2";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import recordLabels from "../../data/record-labels";
import { useSinger } from "../../hook/use-singer";
import * as S from "./styles";
import { calculateTextSimilarity } from "../../utils/calculateTextSimilarity";

function ShowScreen() {
  const { songs, handleMoney, artist } = useSinger();

  const { transcript } = useSpeechRecognition();
  const navigate = useNavigate();
  const params = useParams();

  const songData = useMemo(() => {
    const findedSong = songs.find((song) => song.videoId === params.videoId);

    return findedSong;
  }, [songs]);

  const increase = useMemo(() => {
    return {
      label: artist.recordLabelId
        ? `+ F$${recordLabels[artist.recordLabelId - 1].rewardIncrease}`
        : "",
      value: artist.recordLabelId
        ? recordLabels[artist.recordLabelId - 1].rewardIncrease
        : 0,
    };
  }, [artist]);

  function handleOnEnd() {
    if (songData) {
      SpeechRecognition.stopListening();
      const textSimilarity = calculateTextSimilarity(
        songData.lyric,
        transcript
      );

      if (textSimilarity >= 50) {
        Swal.fire(
          `Congratulations, you completed the concert! ${textSimilarity}%`,
          `+ F$${songData?.value} ${increase.label}`,
          "success"
        ).then((result) => {
          if (result.isConfirmed) {
            const value = (songData ? songData.value : 0) + increase.value;

            handleMoney("add", value);
            navigate("/map");
          }
        });
      } else {
        Swal.fire(
          `Oops, you didn't sing correctly! ${textSimilarity}%`,
          `- F$${songData?.value}`,
          "error"
        ).then((result) => {
          if (result.isConfirmed) {
            handleMoney("remove", songData?.value || 1);
            navigate("/map");
          }
        });
      }
    }
  }

  function handleCancel() {
    Swal.fire({
      title: "Do you want to cancel the concert?",
      text: "To cancel the concert you will need to pay a fine to the contractors.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, cancelar!",
      cancelButtonText: "Voltar para o show",
    }).then((result) => {
      if (result.isConfirmed) {
        SpeechRecognition.stopListening();
        handleMoney("remove", songData?.value || 1);
        navigate("/map");
      }
    });
  }

  return (
    <>
      <S.Wrapper>
        <S.Container>
          <YouTube
            videoId={params.videoId}
            opts={{
              width: "1000",
              playerVars: {
                controls: 0,
                disablekb: 1,
              },
            }}
            onPlay={() =>
              SpeechRecognition.startListening({
                continuous: true,
                language: "en-US",
              })
            }
            onEnd={handleOnEnd}
            onPause={() => SpeechRecognition.stopListening()}
          />

          <S.EventData>
            <h1 className="title">{songData?.title}</h1>

            <div className="actions">
              <button onClick={handleCancel} className="action danger">
                LEAVE CONCERT
              </button>
            </div>
          </S.EventData>

          <S.TranscriptArea>{transcript}</S.TranscriptArea>
        </S.Container>
      </S.Wrapper>
    </>
  );
}

export default ShowScreen;
