import React, { useEffect, useRef } from "react";

export const PlaySound: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => console.log({ error }));
    }
  };

  setInterval(playSound, 5000);

  useEffect(() => {
    playSound();
  }, []);

  return (
    <div>
      <audio ref={audioRef} src="/patchon.mp3" />
    </div>
  );
};
