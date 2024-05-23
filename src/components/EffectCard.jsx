/* eslint-disable react/prop-types */

import ContinuousSlider from "./sliderComponent";
import useAudioPlayer from "../lib/useAudioPlayer";

/**
 * Represents a Music Card component.
 * @component
 * @param {Object} props - The props for the Music Card component.
 * @param {string} props.type - The type of the music card (e.g., "effect").
 * @param {string} props.sound - The sound file name for the music card.
 * @param {string} props.src - The image file name for the music card background.
 * @param {string} props.name - The name of the music card.
 * @returns {JSX.Element} The rendered Music Card component.
 */
const MusicCard = (props) => {
  const {
    isPlaying,
    handleClick,
    audioIdPlaying,
    audioType,
    volume,
    handleVolumeChange,
  } = useAudioPlayer();

  return (
    <>
      <div className="flex flex-col items-center h-56">
        <div
          className={`cursor-pointer relative rounded-xl flex items-center justify-center transition-all duration-100 overflow-hidden min-w-max ${
            isPlaying &&
            audioIdPlaying.current == props.id &&
            audioType.current === props.type
              ? `shadow-[0_0_0_4px] shadow-green-500`
              : ``
          }`}
          onClick={(event) =>
            handleClick(event, props.type, props.sound, props.id)
          }
          data-audio-id={props.id}
        >
          <div className="overflow-hidden rounded-md">
            <img
              src={`/assets/background/${props.src}.jpg`}
              width={180}
              height={330}
              className="object-cover aspect-square hover:scale-105 duration-300"
            />
          </div>
          <div
            className={`pointer-events-none absolute px-5 bg-slate-100 bg-opacity-50 text-black rounded-3xl ${
              isPlaying &&
              audioIdPlaying.current == props.id &&
              audioType.current === props.type
                ? `bg-green-600 bg-opacity-100 text-white`
                : ``
            }`}
          >
            {props.name}
          </div>
        </div>
        <ContinuousSlider
          className={`${
            isPlaying &&
            audioIdPlaying.current == props.id &&
            audioType.current === props.type
              ? ``
              : `hidden`
          }`}
          value={volume}
          onVolumeChange={(event, newValue) => handleVolumeChange(newValue)}
        />
      </div>
    </>
  );
};

export default MusicCard;
