//Custom useAudioPlayer hook

import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for managing audio player functionality.
 *
 * @returns {Object} An object containing the following properties:
 *   - isPlaying: A boolean indicating whether the audio is currently playing.
 *   - handleClick: A function to handle click events on audio elements.
 *   - trackIdPlaying: A reference to the currently playing track ID.
 */
function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  // const [audio, setAudio] = useState(new Audio());
  const audioRef = useRef(null);
  const audioIdPlaying = useRef(null);
  const audioType = useRef(null);
  const [volume, setVolume] = useState(30);

  const handleClick = (event, type, sound, id) => {
    const audioId = id;
    audioType.current = type;

    switch (type) {
      case "track":
        const audioSrc = event.target.getAttribute("data-audio-src");
        const trackId = event.target.getAttribute("data-track-id");
        if (trackId == audioIdPlaying.current) {
          try {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            audioIdPlaying.current = null;
          } catch (error) {
            console.log("Error pausing track:", error);
          }
        } else {
          if (audioRef.current) {
            try {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            } catch (error) {
              console.log("Error pausing track:", error);
            }
          }
          audioRef.current = new Audio(`/assets/sound/${type}/${audioSrc}.mp3`);
          try {
            audioRef.current.play().then(() => {
              setIsPlaying(true);
              audioIdPlaying.current = trackId;
            });
          } catch (error) {
            console.log("Error playing track:", error);
          }
        }
        break;

      case "effect":
        if (audioId == audioIdPlaying.current && type === audioType.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setIsPlaying(false);
          audioIdPlaying.current = null;
          audioType.current = null;
        } else {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          audioRef.current = new Audio(`/assets/sound/${type}/${sound}.mp3`);
          audioRef.current.volume = type === "effect" ? volume / 100 : 1;
          audioIdPlaying.current = audioId;
          audioType.current = type;
          setIsPlaying(true);
        }
        break;
    }

    // if (audioId == audioIdPlaying.current && type === audioType.current) {
    //   audioRef.current.pause();
    //   audioRef.current.currentTime = 0;
    //   setIsPlaying(false);
    //   audioIdPlaying.current = null;
    //   audioType.current = null;
    // } else {
    //   if (audioRef.current) {
    //     audioRef.current.pause();
    //     audioRef.current.currentTime = 0;
    //   }
    //   audioRef.current = new Audio(`/assets/sound/${type}/${sound}.mp3`);
    //   audioRef.current.volume = type === "effect" ? volume / 100 : 1;
    //   audioIdPlaying.current = audioId;
    //   audioType.current = type;
    //   setIsPlaying(true);
    // }
  };

  const handleVolumeChange = (newValue) => {
    setVolume(newValue);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.loop = true;
        audioRef.current.play().catch((error) => {
          console.log("Error playing media: ", error);
        });
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioType.current === "track") {
      if (audioRef.current && isPlaying) {
        audioRef.current.loop = true;
        try {
          audioRef.current.play();
        } catch (error) {
          console.log("Error playing track:", error);
        }
      } else if (audioRef.current && !isPlaying) {
        try {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        } catch (error) {
          console.log("Error pausing track:", error);
        }
      }
    }

    return () => {
      if (audioRef.current) {
        try {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        } catch (error) {
          console.log("Error pausing track on unmount:", error);
        }
      }
    };
  }, [isPlaying, audioType.current]);

  return {
    isPlaying,
    handleClick,
    audioIdPlaying,
    audioType,
    volume,
    handleVolumeChange,
    audioRef,
  };
}

export default useAudioPlayer;
