import { ArrowRight, Users, Cog } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
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
            <a href="#join" className="text-sm hover:text-primary transition-colors">
              加入
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background Image with Dark Vignette and Frosted Glass */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663472474284/8pC7TLPU7HpozxEHK6PsGa/hero-create-factory-WfJ4uJJJW79gWLNcT758Tk.webp')",
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
        <div className="relative z-10 container text-center max-w-3xl px-4">
          <div className="mb-6 inline-block">
            <div className="px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
              <span className="text-xs text-primary" style={techStyle}>
                MINECRAFT SERVER
              </span>
            </div>
          </div>

          {/* Two-line Title */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2" style={displayStyle}>
              艰苦卓绝
            </h2>
            <h1 className="text-6xl md:text-8xl font-bold leading-tight" style={displayStyle}>
              <span className="text-glow">飞升者行动</span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            前期高难度的挑战，后期高自由度的创造。以 Create 模组为核心，打造精密工程的乐园。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="btn-tech"
              onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}
            >
              了解更多 <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10"
              onClick={() => window.location.href = "/turning-point"}
            >
              转折点
            </Button>
          </div>

          {/* Server Stats */}
          <div className="grid grid-cols-3 gap-4 mt-16 text-center">
            <div className="card-glow p-4">
              <div className="text-2xl font-bold text-primary mb-1">Java</div>
              <div className="text-xs text-muted-foreground">平台</div>
            </div>
            <div className="card-glow p-4">
              <div className="text-2xl font-bold text-neon-green mb-1">1.21.1</div>
              <div className="text-xs text-muted-foreground">当前版本</div>
            </div>
            <div className="card-glow p-4">
              <div className="text-2xl font-bold text-primary mb-1">neoforge</div>
              <div className="text-xs text-muted-foreground">加载器</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-20 border-t border-primary/10 bg-background/50 relative">
        <div className="container max-w-3xl">
          <div className="card-glow p-12 text-center">
            <h2 className="text-4xl font-bold mb-6" style={displayStyle}>
              <span className="text-glow">加入我们</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              准备好接受挑战了吗？加入 QQ 群，与志同道合的玩家一起探索艰苦卓绝的世界。
            </p>

            <div className="bg-background/50 rounded-lg p-8 mb-8 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-4">QQ 群号</p>
              <p className="text-4xl font-bold text-primary mb-4" style={techStyle}>
                657699707
              </p>
              <p className="text-sm text-muted-foreground">点击下方按钮加入群聊</p>
            </div>

            <Button
              size="lg"
              className="btn-tech w-full sm:w-auto"
              onClick={() => {
                window.open("https://qm.qq.com/cgi-bin/qm/qr?k=wkB5qKLKvGLzfEZCVvLVGZj9f3LPqFvL&jump_from=webapi&authKey=", "_blank");
              }}
            >
              <Users className="mr-2 w-4 h-4" />
              加入 QQ 群
            </Button>

            <div className="mt-8 pt-8 border-t border-primary/10">
              <p className="text-sm text-muted-foreground mb-4">服务器成立于</p>
              <p className="text-2xl font-bold text-neon-green" style={techStyle}>
                2022 年 1 月 18 日
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-primary/10 bg-background/80 backdrop-blur-md">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2022-2026 艰苦卓绝 Minecraft Server. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Powered by <span className="text-primary">Industrial Dark Tech Design</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
