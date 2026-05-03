import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Turning Point Page - 转折点
 * Displays the "航空学问世" milestone event
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

export default function TurningPoint() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 border-b border-primary/10 bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </Button>
          <h1 className="text-xl font-bold text-primary" style={displayStyle}>
            转折点
          </h1>
          <div className="w-20" />
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-20">
        <div className="container max-w-3xl">
          <div className="card-glow p-12">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center" style={displayStyle}>
              <span className="text-glow">航空学问世</span>
            </h1>

            {/* Date */}
            <div className="flex items-center justify-center gap-2 mb-8 text-primary">
              <Calendar className="w-4 h-4" />
              <span className="text-sm" style={techStyle}>
                2026年4月19日
              </span>
            </div>

            {/* Image */}
            <div className="mb-8 rounded-lg overflow-hidden border border-primary/20">
              <img
                src="https://img.cdn1.vip/i/69e51b57dbbfe_1776622423.webp"
                alt="航空学问世"
                className="w-full h-auto"
              />
            </div>

            {/* Description */}
            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
              <p>
                4月19日，服主于混沌中苏醒，得知航空学已出，连滚带爬下床核对日期，不是4月1日，情况属实。艰苦卓绝从此退出1.20.1，加入航空学这个更权威的圈子。
              </p>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-primary/20" />

            {/* Back Button */}
            <div className="text-center">
              <Button
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回首页
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-primary/10 bg-background/80 backdrop-blur-md">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2022-2026 艰苦卓绝 Minecraft Server. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
