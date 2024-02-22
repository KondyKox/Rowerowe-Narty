import { useEffect, useState } from "react";

const MusicPlayer = ({ isGameStarted }) => {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const playMusic = () => {
      const audioPath = isGameStarted
        ? "./sfx/game-music.mp3"
        : "./sfx/main-theme.mp3";

      if (!audio) {
        const newAudio = new Audio(audioPath);

        newAudio.loop = true;
        newAudio.addEventListener("canplay", () => {
          newAudio.play();
        });

        newAudio.addEventListener("ended", () => {
          newAudio.currentTime = 0;
          newAudio.play();
        });

        setAudio(newAudio);
      } else {
        audio.src = audioPath;
        audio.play();
      }
    };

    playMusic();
  });

  return null;
};

export default MusicPlayer;
