import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import { Play } from "lucide-react";

interface VideoCardProps {
  videoId: string;
  thumbnail: string;
  onPlay?: () => void;
}

export function VideoCard({ videoId, thumbnail, onPlay }: VideoCardProps) {
  const {language}=useLanguage();
  const title=language === "yo" ? "Fídíò ẹ̀kọ́ nípa jẹjẹrẹ ọrùn ilé-ọmọ" : "Cervical cancer education video";
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    onPlay?.();
  };

  return (
    <div className="relative h-[192px] rounded-[8px] overflow-hidden bg-black">
      {isPlaying ? (
        <iframe title={title}
          className="absolute inset-0 size-full border-none"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          aria-label={title}
          onClick={handlePlay}
          className="absolute inset-0 size-full border-none p-0 cursor-pointer bg-transparent"
        >
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover size-full"
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-white/30 rounded-full p-[12px]">
              <Play size={48} color="white" fill="white" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}