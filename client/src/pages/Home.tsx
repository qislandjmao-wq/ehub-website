import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Cog } from "lucide-react";

/**
 * Home Page - 艰苦卓绝 Minecraft Server
 * Design: Industrial Dark Tech Aesthetic
 * Color Palette: Deep blue-black (#0a0e27) + Cyan (#00d4ff) + Neon Green (#39ff14)
 * Typography: Orbitron for headings, Inter for body, Space Mono for tech elements
 */

const displayStyle = {
  fontFamily: "Orbitron, sans-serif",
  fontWeight: 700,
  letterSpacing: "0.05em",
};

const techStyle = {
  fontFamily: "Space Mono, monospace",
  letterSpacing: "0.02em",
};

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 border-b border-primary/10 bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Cog className="w-6 h-6 text-primary animate-spin" style={{ animationDuration: "3s" }} />
            <h1 className="text-xl font-bold text-primary" style={displayStyle}>
              艰苦卓绝
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground" style={{ fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
              服主：古城林
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Screen */}
      <section className="relative h-screen w-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image with Dark Vignette and Frosted Glass */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://createsimulated.com/resources/images/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          {/* Dark Vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/40 to-background/90" />
          {/* Frosted Glass Effect */}
          <div className="absolute inset-0 backdrop-blur-sm" />
          {/* Additional Dark Overlay */}
          <div className="absolute inset-0 bg-background/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 container text-center max-w-3xl px-4 flex flex-col items-center justify-center h-full">
          <div className="mb-6 inline-block">
            <div className="px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
              <span className="text-xs text-primary" style={techStyle}>
                MINECRAFT SERVER
              </span>
            </div>
          </div>

          {/* Two-line Title */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2" style={displayStyle}>
              E-hub
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight flicker-text" style={{
              fontFamily: "'FZChaoZTJW', sans-serif",
              color: "#00d4ff",
              textShadow: "0 0 10px rgba(0, 212, 255, 0.5), 0 0 20px rgba(0, 212, 255, 0.3)",
            }}>
              飞升者行动
            </h1>
          </div>

          {/* Quote */}
          <p className="text-sm sm:text-base md:text-lg italic mb-6 sm:mb-8 leading-relaxed" style={{
            fontFamily: "'FangSong', serif",
            color: "#39ff14",
            fontStyle: "italic",
          }}>
            -"甚么？航空学出了？" -"是的，你活到头了！"
          </p>

          {/* Main Description */}
          <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed" style={{
            textShadow: "0 0 8px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.6)",
            whiteSpace: "normal",
          }}>
            这不是一个让你放松的游戏。前期比生活更苦，活命都成难题。<br />
            但熬过去之后，没有主线，没有约束，想干嘛就干嘛。<br />
            你可以用工业征服世界，也可以成为吓哭所有人的"法爷"。<br />
            这里没有"应该做的事"，只有你想做的事。
          </p>

          <div className="flex flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 w-full sm:w-auto">
            <Button
              size="lg"
              className="btn-tech text-sm sm:text-base"
              onClick={() => window.location.href = "/milestones"}
              style={{ fontWeight: 900, fontFamily: "Arial, sans-serif" }}
            >
              里程碑
            </Button>
            <Button
              size="lg"
              className="btn-tech text-sm sm:text-base"
              onClick={() => window.location.href = "/turning-point"}
              style={{ fontWeight: 900, fontFamily: "Arial, sans-serif" }}
            >
              转折点
            </Button>
          </div>

          {/* Server Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-8 sm:mt-12 text-center w-full">
            <div className="card-glow p-2 sm:p-3 md:p-4 min-w-0">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-1 truncate">Java</div>
              <div className="text-xs text-muted-foreground truncate">平台</div>
            </div>
            <div className="card-glow p-2 sm:p-3 md:p-4 min-w-0">
              <div className="text-lg sm:text-xl md:text-2xl font-bold mb-1 truncate" style={{ color: "#39ff14" }}>
                1.21.1
              </div>
              <div className="text-xs text-muted-foreground truncate">当前版本</div>
            </div>
            <div className="card-glow p-2 sm:p-3 md:p-4 min-w-0">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-1 truncate">neoforge</div>
              <div className="text-xs text-muted-foreground truncate">加载器</div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section - Full Screen */}
      <section id="join" className="relative h-screen w-screen flex items-center justify-center border-t border-primary/10 bg-background/50 backdrop-blur-md overflow-hidden pt-16">
        <div className="container max-w-2xl px-4 flex items-center justify-center h-full">
          <div className="card-glow p-6 sm:p-8 md:p-12 text-center w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-primary" style={displayStyle}>
              加入我们
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8">
              成立于 2022 年 1 月 18 日
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div className="p-3 sm:p-4 rounded-lg border border-primary/30 bg-primary/5">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">QQ 群</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">657699707</p>
              </div>
              <Button
                size="lg"
                className="btn-tech w-full text-sm sm:text-base"
                onClick={() => window.open("https://qm.qq.com/q/657699707", "_blank")}
                style={{ fontWeight: 900, fontFamily: "Arial, sans-serif" }}
              >
                加入 QQ 群
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 border-t border-primary/10 bg-background/80 backdrop-blur-md">
        <div className="container text-center text-xs sm:text-sm text-muted-foreground">
          <p>© 2022-2026 艰苦卓绝 Minecraft Server. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
