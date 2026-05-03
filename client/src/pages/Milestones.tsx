import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Milestones Page - 里程碑目录
 * Displays all server seasons/epochs
 */

const displayStyle = {
  fontFamily: "Orbitron, sans-serif",
  fontWeight: 700,
  letterSpacing: "0.05em",
};

const milestonesList = [
  { name: "飞升者行动", path: "/milestones/feisheng-zhe-xingdong" },
  { name: "非攻", path: null },
  { name: "科波菲尔", path: null },
  { name: "临危-末日", path: null },
  { name: "临危", path: null },
  { name: "启示", path: null },
  { name: "寻路", path: null },
  { name: "归真", path: null },
  { name: "不破不立", path: null },
  { name: "不再", path: null },
  { name: "往昔", path: null },
];

export default function Milestones() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMilestoneClick = (milestone: typeof milestonesList[0], index: number) => {
    if (milestone.path) {
      window.location.href = milestone.path;
    } else {
      toast.info("历史久远，难以查证");
    }
  };

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
            里程碑
          </h1>
          <div className="w-20" />
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-20">
        <div className="container max-w-3xl">
          <div className="card-glow p-12">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center" style={displayStyle}>
              <span className="text-glow">服务器周目</span>
            </h1>

            {/* Milestones Grid */}
            <div className="space-y-3">
              {milestonesList.map((milestone, index) => (
                <button
                  key={index}
                  onClick={() => handleMilestoneClick(milestone, index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="w-full p-4 rounded-lg border transition-all duration-300"
                  style={{
                    borderColor: hoveredIndex === index ? "rgba(0, 212, 255, 0.5)" : "rgba(0, 212, 255, 0.2)",
                    backgroundColor:
                      hoveredIndex === index ? "rgba(0, 212, 255, 0.05)" : "rgba(0, 212, 255, 0.02)",
                    boxShadow:
                      hoveredIndex === index
                        ? "0 0 20px rgba(0, 212, 255, 0.2), inset 0 0 20px rgba(0, 212, 255, 0.05)"
                        : "0 0 10px rgba(0, 212, 255, 0.1)",
                    transform: hoveredIndex === index ? "translateX(4px)" : "translateX(0)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-lg font-bold"
                      style={{
                        color: milestone.path ? "#00d4ff" : "#a0afc0",
                        fontFamily: "Orbitron, sans-serif",
                      }}
                    >
                      {milestone.name}
                    </span>
                    {milestone.path && (
                      <span className="text-xs text-neon-green" style={{ fontFamily: "Space Mono, monospace" }}>
                        →
                      </span>
                    )}
                  </div>
                </button>
              ))}
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
