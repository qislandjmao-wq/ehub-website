import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

interface MusicContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // 创建音频元素
    if (!audioRef.current) {
      const audio = new Audio();
      audio.src = "https://www.joy127.com/url/149586.mp3";
      audio.loop = true;
      audio.volume = 0.3; // 设置音量为 30%
      audioRef.current = audio;

      // 尝试自动播放
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // 自动播放被浏览器阻止，等待用户交互
            setIsPlaying(false);
          });
      }
    }

    return () => {
      // 组件卸载时不停止音乐，保持播放
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return context;
}
