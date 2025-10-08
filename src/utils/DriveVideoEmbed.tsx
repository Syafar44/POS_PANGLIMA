import React, { useState } from "react";

interface DriveVideoEmbedProps {
  video: string; // ID Google Drive
  title?: string; // opsional: untuk aksesibilitas
}

const DriveVideoEmbed: React.FC<DriveVideoEmbedProps> = ({ video, title }) => {
  // State untuk mengatur apakah video sudah diputar
  const [isPlaying, setIsPlaying] = useState(false);
  const [disableInteraction, setDisableInteraction] = useState(false);

  const videoUrl = `https://drive.google.com/file/d/${video}/preview`; // URL embed untuk Google Drive

  // Fungsi yang dipanggil saat tombol Play diklik
  const handlePlayClick = () => {
    setIsPlaying(true);
    
    // Tunggu 2 detik setelah play, kemudian nonaktifkan interaksi
    setTimeout(() => {
      setDisableInteraction(true); // Menonaktifkan interaksi setelah 2 detik
    }, 4000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto" style={{ position: "relative" }}>
      {!isPlaying ? (
        <div
          onClick={handlePlayClick}
          className="absolute inset-0 flex justify-center items-center cursor-pointer text-black"
        >
          Play Video
        </div>
      ) : (
        <iframe
          src={videoUrl}
          width="100%"
          height="480"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={title || "Video Drive"}
          className="rounded-2xl shadow-md border border-gray-200"
          style={{
            pointerEvents: disableInteraction ? "none" : "auto", // Nonaktifkan interaksi setelah 2 detik
          }}
        ></iframe>
      )}
    </div>
  );
};

export default DriveVideoEmbed;
