import { useRef } from "react";

export function useBackgroundMusic() {
  const musicRef = useRef(null);

  if (!musicRef.current) {
    musicRef.current = new Audio("/sounds/bg-music.mp3");
    musicRef.current.volume = 0.2;
    musicRef.current.loop = true;
  }

  const play = () => {
    if (musicRef.current.paused) {
      musicRef.current.play();
    }
  };

  const pause = () => {
    musicRef.current.pause();
  };

  return { play, pause };
}
