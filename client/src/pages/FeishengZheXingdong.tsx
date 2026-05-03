import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

/**
 * Feisheng Zhe Xingdong Milestone Page
 * Displays BOSS kill records for the current season
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

interface BossKill {
  date: string;
  time: string;
  players: string[];
  boss: string;
}

const bossKills: BossKill[] = [
  { date: "26/4", time: "19:32", players: ["muxuemeng", "shijuanren"], boss: "史莱姆王" },
  { date: "26/4", time: "21:29", players: ["muxuemeng", "shijuanren"], boss: "克苏鲁之眼" },
  { date: "4/29", time: "17:50", players: ["WeingPhonk", "Elysia0516"], boss: "死者之王" },
  { date: "4/29", time: "23:22", players: ["shijuanren"], boss: "焰魔" },
  { date: "4/29", time: "23:30", players: ["shijuanren"], boss: "下界合金巨兽" },
  { date: "4/30", time: "20:45", players: ["shijuanren"], boss: "独眼巨鹿" },
  { date: "4/30", time: "21:00", players: ["muxuemeng"], boss: "末影龙" },
  { date: "4/30", time: "22:10", players: ["ercishichang", "ChongYue_WoWu", "muxuemeng"], boss: "克苏鲁之脑" },
  { date: "4/30", time: "22:20", players: ["ChongYue_WoWu", "muxuemeng", "ercishichang", "shijuanren"], boss: "咒翼灵骸" },
  { date: "5/1", time: "20:17", players: ["shijuanren"], boss: "乌姆纳塔" },
  { date: "5/2", time: "16:18", players: ["shijuanren"], boss: "受火者" },
  { date: "5/3", time: "17:11", players: ["muxuemeng", "shijuanren"], boss: "先驱者" },
];

export default function FeishengZheXingdong() {
  // Calculate player participation
  const playerStats = useMemo(() => {
    const stats: Record<string, number> = {};
    bossKills.forEach((kill) => {
      kill.players.forEach((player) => {
        stats[player] = (stats[player] || 0) + 1;
      });
    });
    return stats;
  }, []);

  // Find most participated player
  const mostParticipatedPlayer = useMemo(() => {
    let maxPlayer = "";
    let maxCount = 0;
    Object.entries(playerStats).forEach(([player, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxPlayer = player;
      }
    });
    return { player: maxPlayer, count: maxCount };
  }, [playerStats]);

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
            飞升者行动-里程碑
          </h1>
          <div className="w-20" />
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-20">
        <div className="container max-w-4xl">
          <div className="card-glow p-12">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center flicker-text" style={{
              fontFamily: "'FZChaoZTJW', sans-serif",
              color: "#00d4ff",
              textShadow: "0 0 10px rgba(0, 212, 255, 0.5), 0 0 20px rgba(0, 212, 255, 0.3)",
            }}>
              飞升者行动
            </h1>

            {/* Most Participated Player */}
            {mostParticipatedPlayer.player && (
              <div className="mb-8 p-6 rounded-lg border border-red-500/30 bg-red-500/5">
                <p className="text-xs font-bold mb-2" style={{ color: "#ff0000", fontFamily: "Arial, sans-serif" }}>
                  参团最多
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-2xl font-bold"
                    style={{
                      color: "#ff0000",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    {mostParticipatedPlayer.player}
                  </span>
                  <span
                    className="text-lg"
                    style={{
                      color: "#ff0000",
                      fontFamily: "Space Mono, monospace",
                    }}
                  >
                    {mostParticipatedPlayer.count} 次
                  </span>
                </div>
              </div>
            )}

            {/* Boss Kills List */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6" style={displayStyle}>
                <span className="text-glow">BOSS击杀</span>
              </h2>

              <div className="space-y-3">
                {bossKills.map((kill, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-primary/20 bg-primary/5 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      {/* Date and Time */}
                      <span
                        className="text-sm"
                        style={{
                          color: "#a0afc0",
                          fontFamily: "Space Mono, monospace",
                        }}
                      >
                        {kill.date} {kill.time}
                      </span>

                      {/* Players and Boss */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Players */}
                        <div className="flex flex-wrap gap-1">
                          {kill.players.map((player, pIndex) => (
                            <span key={pIndex}>
                              <span
                                style={{
                                  color: "#00d4ff",
                                  fontFamily: "Orbitron, sans-serif",
                                  fontWeight: 600,
                                }}
                              >
                                {player}
                              </span>
                              {pIndex < kill.players.length - 1 && (
                                <span
                                  style={{
                                    color: "#a0afc0",
                                    marginLeft: "0.25rem",
                                    marginRight: "0.25rem",
                                  }}
                                >
                                  、
                                </span>
                              )}
                            </span>
                          ))}
                        </div>

                        {/* Separator */}
                        <span
                          style={{
                            color: "#a0afc0",
                          }}
                        >
                          击败了
                        </span>

                        {/* Boss */}
                        <span
                          style={{
                            color: "#39ff14",
                            fontFamily: "Orbitron, sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          {kill.boss}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                返回里程碑
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
