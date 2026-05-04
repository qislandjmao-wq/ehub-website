import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

interface MusicContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const autoplayBlockedRef = useRef(false);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    // 创建音频元素
    if (!audioRef.current) {
      const audio = new Audio();
      audio.src = "https://www.joy127.com/url/149586.mp3";
      audio.loop = true;
      audio.volume = 0.3; // 设置音量为 30%
      audioRef.current = audio;
    }

    // 立即尝试自动播放
    const attemptAutoplay = async () => {
      if (!audioRef.current) return;

      try {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          console.log("Autoplay succeeded");
          return; // 自动播放成功，不需要监听交互
        }
      } catch (error) {
        // 自动播放被阻止
        console.log("Autoplay blocked:", error);
        autoplayBlockedRef.current = true;
      }

      // 如果自动播放失败，监听用户交互
      setupInteractionListener();
    };

    const setupInteractionListener = () => {
      const handleUserInteraction = async () => {
        if (hasInteractedRef.current || !audioRef.current) return;
        
        hasInteractedRef.current = true;
        
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          console.log("Music started after user interaction");
        } catch (error) {
          console.warn("Failed to play music after interaction:", error);
          setIsPlaying(false);
        }
        
        // 移除所有交互监听器
        document.removeEventListener("click", handleUserInteraction);
        document.removeEventListener("scroll", handleUserInteraction);
        document.removeEventListener("keydown", handleUserInteraction);
        document.removeEventListener("touchstart", handleUserInteraction);
      };

      // 添加交互监听器
      document.addEventListener("click", handleUserInteraction);
      document.addEventListener("scroll", handleUserInteraction);
      document.addEventListener("keydown", handleUserInteraction);
      document.addEventListener("touchstart", handleUserInteraction);
    };

    // 延迟一点执行自动播放尝试，确保 DOM 完全加载
    const timeoutId = setTimeout(attemptAutoplay, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((error) => {
          console.warn("Failed to play music:", error);
        });
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
