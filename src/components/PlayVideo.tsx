import { useEffect, useRef } from "react";

export const PlayVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch((error) => {
          console.error("Erro ao tentar reproduzir automaticamente:", error);
        });
      }
    };

    playVideo();

    const interval = setInterval(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((error) => {
          console.error("Erro ao tentar reiniciar o vídeo:", error);
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <video ref={videoRef} width={640} height={360} autoPlay controls={false}>
      <source src="win.mp4" type="video/mp4" />
      Seu navegador não suporta a tag de vídeo.
    </video>
  );
};
