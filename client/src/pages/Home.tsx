import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Users, Cog, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

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
            <a href="#about" className="text-sm hover:text-primary transition-colors">
              关于
            </a>
            <a href="#features" className="text-sm hover:text-primary transition-colors">
              特色
            </a>
            <a href="#join" className="text-sm hover:text-primary transition-colors">
              加入
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background Image with Overlay */}
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
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/90" />
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

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={displayStyle}>
            <span className="text-glow">艰苦卓绝</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            前期高难度的挑战，后期高自由度的创造。以 Create 模组为核心，打造精密工程的乐园。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="btn-tech"
              onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}
            >
              加入服务器 <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            >
              了解更多
            </Button>
          </div>

          {/* Server Stats */}
          <div className="grid grid-cols-3 gap-4 mt-16 text-center">
            <div className="card-glow p-4">
              <div className="text-2xl font-bold text-primary mb-1">2022</div>
              <div className="text-xs text-muted-foreground">成立年份</div>
            </div>
            <div className="card-glow p-4">
              <div className="text-2xl font-bold text-neon-green mb-1">1.20.1</div>
              <div className="text-xs text-muted-foreground">当前版本</div>
            </div>
            <div className="card-glow p-4">
              <div className="text-2xl font-bold text-primary mb-1">∞</div>
              <div className="text-xs text-muted-foreground">自由度</div>
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

      {/* About Section */}
      <section id="about" className="py-20 border-t border-primary/10 bg-background relative">
        <div className="container max-w-4xl">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-6" style={displayStyle}>
              <span className="text-glow">关于艰苦卓绝</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              《艰苦卓绝》成立于 <span className="text-primary" style={techStyle}>2022 年 1 月 18 日</span>
              ，是一个致力于打造高难度、高自由度游戏体验的 Minecraft 服务器。
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              我们相信真正的游戏乐趣来自于挑战与创造的平衡。前期的高难度磨练玩家的技能，后期的高自由度让玩家尽情发挥想象力。
            </p>
          </div>

          {/* Core Experience */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-glow p-8">
              <div className="flex items-start gap-4">
                <Zap className="w-8 h-8 text-neon-green flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-3 text-neon-green" style={displayStyle}>
                    前期：高难度挑战
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    严苛的资源获取难度、复杂的怪物机制、精心设计的地形挑战。每一步都需要玩家的策略与技巧。
                  </p>
                </div>
              </div>
            </div>

            <div className="card-glow p-8">
              <div className="flex items-start gap-4">
                <Sparkles className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-3 text-primary" style={displayStyle}>
                    后期：高自由度创造
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    掌握核心技能后，玩家获得无限的创造空间。建造宏伟工厂、设计复杂机械、探索模组深度。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 border-t border-primary/10 bg-background/50 relative">
        <div className="container max-w-5xl">
          <h2 className="text-4xl font-bold mb-12 text-center" style={displayStyle}>
            <span className="text-glow">核心模组特色</span>
          </h2>

          {/* Create Mod - Main Feature */}
          <div className="mb-12 card-glow overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-4 text-primary" style={displayStyle}>
                  Create 机械动力
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Create 模组是我们服务器的核心。通过齿轮、传动轴、机械臂等精密机械，玩家可以构建自动化工厂、流水线生产系统，体验真正的工程设计快乐。
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    精密齿轮系统与动力传输
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    自动化生产与流水线设计
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    复杂机械的美学与实用性结合
                  </li>
                </ul>
              </div>
              <div
                className="h-80 md:h-auto bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663472474284/8pC7TLPU7HpozxEHK6PsGa/create-mod-showcase-Woq2yJZzc2KiqtJjkfSkb8.webp')",
                }}
              />
            </div>
          </div>

          {/* Other Mods */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-glow p-6">
              <h4 className="text-lg font-bold mb-3 text-neon-green" style={displayStyle}>
                魔法系统
              </h4>
              <p className="text-sm text-muted-foreground">
                丰富的魔法模组为游戏增添神秘感，与工业模组形成有趣的对比与融合。
              </p>
            </div>

            <div className="card-glow p-6">
              <h4 className="text-lg font-bold mb-3 text-primary" style={displayStyle}>
                冒险内容
              </h4>
              <p className="text-sm text-muted-foreground">
                精心设计的地牢、boss 战斗与探险任务，为玩家提供持续的挑战与奖励。
              </p>
            </div>

            <div className="card-glow p-6">
              <h4 className="text-lg font-bold mb-3 text-neon-green" style={displayStyle}>
                农业模组
              </h4>
              <p className="text-sm text-muted-foreground">
                高效的农业系统支撑工业发展，打造完整的经济循环与生产链。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Difficulty Curve Section */}
      <section className="py-20 border-t border-primary/10 bg-background relative">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center" style={displayStyle}>
            <span className="text-glow">游戏进度曲线</span>
          </h2>

          <div
            className="w-full h-96 rounded-lg overflow-hidden card-glow"
            style={{
              backgroundImage:
                "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663472474284/8pC7TLPU7HpozxEHK6PsGa/hero-difficulty-curve-PoDmmhWnFN35Uex2Rn4hib.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <p className="text-center text-muted-foreground mt-8 leading-relaxed">
            从初期的资源匮乏与怪物威胁，到中期的技能积累与工业启蒙，再到后期的自由创造与无限可能。
            每一个阶段都有其独特的挑战与乐趣。
          </p>
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
