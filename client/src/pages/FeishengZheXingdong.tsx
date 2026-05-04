import { ArrowLeft, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useRoute } from "@/contexts/RouteContext";

/**
 * Feisheng Zhe Xingdong Milestone Page
 * Displays BOSS kill records fetched from database
 */

const displayStyle = {
  fontFamily: "Orbitron, sans-serif",
  fontWeight: 700,
  letterSpacing: "0.05em",
};

const SEASON = "飞升者行动";

/** 将 UTC 时间转为北京时间并格式化为 M/D HH:mm */
function formatKilledAt(date: Date): { dateStr: string; timeStr: string } {
  const d = new Date(date);
  // UTC+8
  const offset = 8 * 60 * 60 * 1000;
  const local = new Date(d.getTime() + offset);
  const month = local.getUTCMonth() + 1;
  const day = local.getUTCDate();
  const hours = String(local.getUTCHours()).padStart(2, "0");
  const minutes = String(local.getUTCMinutes()).padStart(2, "0");
  return { dateStr: `${month}/${day}`, timeStr: `${hours}:${minutes}` };
}

export default function FeishengZheXingdong() {
  const { navigateTo } = useRoute();
  const utils = trpc.useUtils();

  const seedMutation = trpc.bossKills.seed.useMutation({
    onSuccess: (data) => {
      if (data.seeded) {
        // 种子数据写入成功后，刷新列表和统计
        utils.bossKills.list.invalidate({ season: SEASON });
        utils.bossKills.topParticipant.invalidate({ season: SEASON });
      }
    },
  });

  const { data: kills = [], isLoading: killsLoading } = trpc.bossKills.list.useQuery(
    { season: SEASON }
  );

  const { data: topParticipant, isLoading: topLoading } = trpc.bossKills.topParticipant.useQuery(
    { season: SEASON }
  );

  // 首次加载时，如果数据库为空则自动写入种子数据
  useEffect(() => {
    seedMutation.mutate({ season: SEASON });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = killsLoading || topLoading;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 border-b border-primary/10 bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateTo("milestones")}
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

            {/* Most Participated Player - Dynamic from DB */}
            {!topLoading && topParticipant && (
              <div className="mb-8 p-6 rounded-lg border border-red-500/30 bg-red-500/5 text-center">
                <p className="text-xs font-bold mb-4" style={{ color: "#ff0000", fontFamily: "Arial, sans-serif" }}>
                  参团最多
                </p>
                <span
                  className="text-2xl font-bold"
                  style={{
                    color: "#39ff14",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  {topParticipant.playerName}
                </span>
              </div>
            )}

            {/* Boss Kills List */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6" style={displayStyle}>
                <span className="text-glow">BOSS击杀</span>
              </h2>

              {isLoading ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>加载中...</p>
                </div>
              ) : kills.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>暂无记录</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {kills.map((kill) => {
                    const { dateStr, timeStr } = formatKilledAt(kill.killedAt);
                    return (
                      <div
                        key={kill.id}
                        className="p-4 rounded-lg border border-primary/20 bg-primary/5 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          {/* Date and Time */}
                          <span
                            className="text-sm flex-shrink-0"
                            style={{
                              color: "#a0afc0",
                              fontFamily: "Space Mono, monospace",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {dateStr} {timeStr}
                          </span>

                          {/* Players and Boss */}
                          <div className="flex flex-wrap items-center gap-2 justify-end">
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
                            <span style={{ color: "#a0afc0" }}>击败了</span>

                            {/* Boss */}
                            <span
                              style={{
                                color: "#39ff14",
                                fontFamily: "Orbitron, sans-serif",
                                fontWeight: 600,
                              }}
                            >
                              {kill.bossName}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-primary/20" />

            {/* Back Button */}
            <div className="text-center">
              <Button
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                返回顶部
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
