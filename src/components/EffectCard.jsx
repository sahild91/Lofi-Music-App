/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import ContinuousSlider from "./sliderComponent";

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
   const [isSelected, setIsSelected] = useState(false);
   const [isPlaying, setIsPlaying] = useState(false);
   const [audio] = useState(
      new Audio(`/assets/sound/${props.type}/${props.sound}.mp3`)
   );
   const [value, setValue] = useState(30);

   const toggleSound = () => {
      if (props.type === "effect") {
         //if its an effect
         if (isPlaying) {
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
            setIsSelected(false);
         } else {
            // audio.play().then(()=>console.log("Played")).then((error)=>console.log("Error playing: ", error));
            audio.loop = true;
            let audioPlayPromise = audio.play();
            if (audioPlayPromise !== undefined) {
               audioPlayPromise
                  .then(() => {
                     setIsPlaying(true);
                     setIsSelected(true);
                  })
                  .catch((error) => console.log("Error Playing: ", error));
            }
         }
      }
   };

   // Set up an event listener for when the audio can be played

   // Cleanup function when component unmounts
   useEffect(() => {
      return () => {
         audio.pause(); // Pause the audio when the component unmounts
      };
   }, [audio]);

   function handleVolumeChange(event, newValue) {
      setValue(newValue);
      audio.volume = value / 100;
   }

   return (
      <>
         <div className='flex flex-col items-center'>
            <div
               className={`cursor-pointer relative rounded-xl flex items-center justify-center transition-all duration-100 overflow-hidden min-w-max ${
                  isSelected ? `border-4 border-green-500` : ``
               }`}
               onClick={toggleSound}
            >
               {/* {props.name} */}
               <div className='overflow-hidden rounded-md'>
                  <img
                     src={`/assets/background/${props.src}.jpg`}
                     width={180}
                     height={330}
                     className='object-cover aspect-square hover:scale-105 duration-300'
                  />
               </div>
               <div
                  className={`absolute px-5 bg-slate-100 bg-opacity-50 text-black rounded-3xl ${
                     isSelected ? `bg-green-500 bg-opacity-100 text-white` : ``
                  }`}
               >
                  {props.name}
               </div>
            </div>
            <ContinuousSlider
               className={`${isSelected ? `` : `hidden`}`}
               value={value}
               onVolumeChange={handleVolumeChange}
            />
         </div>
      </>
   );
};

export default MusicCard;
