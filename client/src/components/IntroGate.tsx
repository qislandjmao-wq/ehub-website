import { useEffect, useState } from "react";

/**
 * IntroGate - 科幻工厂推拉门开屏动画
 * 动画流程：
 * 1. 初始：两扇门关闭，中央显示锁扣（齿轮+锁）
 * 2. 锁扣旋转并解锁（0.8s）
 * 3. 门向两侧滑开（0.9s）
 * 4. 动画结束，组件卸载
 */

interface IntroGateProps {
  onComplete?: () => void;
}

export default function IntroGate({ onComplete }: IntroGateProps) {
  // phase: "locked" | "unlocking" | "opening" | "done"
  const [phase, setPhase] = useState<"locked" | "unlocking" | "opening" | "done">("locked");

  useEffect(() => {
    // 短暂停留后开始解锁
    const t1 = setTimeout(() => setPhase("unlocking"), 400);
    // 解锁动画结束后开始开门
    const t2 = setTimeout(() => setPhase("opening"), 1300);
    // 开门动画结束后完成
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  const isOpening = phase === "opening";
  const isUnlocking = phase === "unlocking";

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ pointerEvents: isOpening ? "none" : "all" }}
    >
      {/* 左侧门板 */}
      <div
        className="absolute top-0 left-0 h-full w-1/2"
        style={{
          background: "linear-gradient(135deg, #0d1240 0%, #111840 50%, #0a0f30 100%)",
          transform: isOpening ? "translateX(-100%)" : "translateX(0)",
          transition: isOpening ? "transform 1.1s cubic-bezier(0.77, 0, 0.175, 1)" : "none",
          borderRight: "2px solid rgba(0, 212, 255, 0.5)",
          boxShadow: "inset -8px 0 24px rgba(0, 212, 255, 0.08), 4px 0 20px rgba(0, 212, 255, 0.15)",
        }}
      >
        {/* 左门：工业纹理线条 */}
        <DoorPanel side="left" />
      </div>

      {/* 右侧门板 */}
      <div
        className="absolute top-0 right-0 h-full w-1/2"
        style={{
          background: "linear-gradient(225deg, #0d1240 0%, #111840 50%, #0a0f30 100%)",
          transform: isOpening ? "translateX(100%)" : "translateX(0)",
          transition: isOpening ? "transform 1.1s cubic-bezier(0.77, 0, 0.175, 1)" : "none",
          borderLeft: "2px solid rgba(0, 212, 255, 0.5)",
          boxShadow: "inset 8px 0 24px rgba(0, 212, 255, 0.08), -4px 0 20px rgba(0, 212, 255, 0.15)",
        }}
      >
        {/* 右门：工业纹理线条 */}
        <DoorPanel side="right" />
      </div>

      {/* 中央锁扣 */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: isOpening ? 0 : 1,
          transition: isOpening ? "opacity 0.3s ease" : "none",
        }}
      >
        <LockBadge isUnlocking={isUnlocking} />
      </div>

      {/* 中央分割线发光 */}
      <div
        className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(0, 212, 255, 0.6) 20%, rgba(0, 212, 255, 0.8) 50%, rgba(0, 212, 255, 0.6) 80%, transparent)",
          boxShadow: "0 0 12px rgba(0, 212, 255, 0.5), 0 0 24px rgba(0, 212, 255, 0.2)",
          opacity: isOpening ? 0 : 1,
          transition: isOpening ? "opacity 0.4s ease" : "none",
        }}
      />
    </div>
  );
}

/** 门板纹理装饰 */
function DoorPanel({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 横向扫描线 */}
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-full"
          style={{
            top: `${(i + 1) * 5.5}%`,
            height: "1px",
            background: `rgba(0, 212, 255, ${0.04 + (i % 3) * 0.02})`,
          }}
        />
      ))}

      {/* 竖向结构线 */}
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-full"
          style={{
            [isLeft ? "right" : "left"]: `${(i + 1) * 22}%`,
            width: "1px",
            background: `rgba(0, 212, 255, ${0.06 + i * 0.02})`,
          }}
        />
      ))}

      {/* 角落装饰 */}
      <div
        className="absolute"
        style={{
          [isLeft ? "right" : "left"]: "12px",
          top: "12px",
          width: "40px",
          height: "40px",
          borderTop: "2px solid rgba(0, 212, 255, 0.4)",
          [isLeft ? "borderRight" : "borderLeft"]: "2px solid rgba(0, 212, 255, 0.4)",
        }}
      />
      <div
        className="absolute"
        style={{
          [isLeft ? "right" : "left"]: "12px",
          bottom: "12px",
          width: "40px",
          height: "40px",
          borderBottom: "2px solid rgba(0, 212, 255, 0.4)",
          [isLeft ? "borderRight" : "borderLeft"]: "2px solid rgba(0, 212, 255, 0.4)",
        }}
      />

      {/* 中部警示条纹 */}
      <div
        className="absolute"
        style={{
          [isLeft ? "right" : "left"]: 0,
          top: "40%",
          bottom: "40%",
          width: "6px",
          background: "repeating-linear-gradient(45deg, rgba(0,212,255,0.15) 0px, rgba(0,212,255,0.15) 4px, transparent 4px, transparent 10px)",
        }}
      />

      {/* 服务器名称水印 */}
      <div
        className="absolute"
        style={{
          [isLeft ? "left" : "right"]: "24px",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "Orbitron, sans-serif",
          fontSize: "11px",
          letterSpacing: "0.3em",
          color: "rgba(0, 212, 255, 0.12)",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          userSelect: "none",
        }}
      >
        E-HUB SYSTEM
      </div>
    </div>
  );
}

/** 中央锁扣组件 */
function LockBadge({ isUnlocking }: { isUnlocking: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* 外圈旋转齿轮 */}
      <div
        style={{
          width: "100px",
          height: "100px",
          position: "relative",
          animation: isUnlocking ? "gateGearSpin 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none",
        }}
      >
        {/* 齿轮 SVG */}
        <svg
          viewBox="0 0 100 100"
          style={{ width: "100%", height: "100%", filter: "drop-shadow(0 0 8px rgba(0,212,255,0.6))" }}
        >
          {/* 外齿 */}
          <GearTeeth />
          {/* 外圈 */}
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(0,212,255,0.7)" strokeWidth="2" />
          {/* 内圈 */}
          <circle cx="50" cy="50" r="26" fill="rgba(10,14,39,0.95)" stroke="rgba(0,212,255,0.5)" strokeWidth="1.5" />
          {/* 锁图标 */}
          {!isUnlocking && (
            <>
              {/* 锁身 */}
              <rect x="38" y="52" width="24" height="16" rx="3" fill="none" stroke="rgba(0,212,255,0.9)" strokeWidth="1.5" />
              {/* 锁环 */}
              <path d="M43 52 L43 46 Q43 40 50 40 Q57 40 57 46 L57 52" fill="none" stroke="rgba(0,212,255,0.9)" strokeWidth="1.5" />
              {/* 锁孔 */}
              <circle cx="50" cy="59" r="2.5" fill="rgba(0,212,255,0.9)" />
            </>
          )}
          {/* 解锁状态：开锁图标 */}
          {isUnlocking && (
            <>
              <rect x="38" y="52" width="24" height="16" rx="3" fill="none" stroke="rgba(57,255,20,0.9)" strokeWidth="1.5" />
              <path d="M43 52 L43 46 Q43 40 50 40 Q57 40 57 46" fill="none" stroke="rgba(57,255,20,0.9)" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="20"
                style={{ animation: "lockOpen 0.4s 0.2s ease forwards" }} />
              <circle cx="50" cy="59" r="2.5" fill="rgba(57,255,20,0.9)" />
            </>
          )}
        </svg>
      </div>

      {/* 状态文字 */}
      <div
        style={{
          fontFamily: "Space Mono, monospace",
          fontSize: "11px",
          letterSpacing: "0.25em",
          color: isUnlocking ? "rgba(57,255,20,0.9)" : "rgba(0,212,255,0.7)",
          transition: "color 0.3s ease",
          textShadow: isUnlocking
            ? "0 0 8px rgba(57,255,20,0.6)"
            : "0 0 8px rgba(0,212,255,0.4)",
        }}
      >
        {isUnlocking ? "UNLOCKED" : "LOCKED"}
      </div>

      {/* 横向装饰线 */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "40px", height: "1px", background: "rgba(0,212,255,0.3)" }} />
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(0,212,255,0.5)" }} />
        <div style={{ width: "40px", height: "1px", background: "rgba(0,212,255,0.3)" }} />
      </div>
    </div>
  );
}

/** 齿轮齿形 SVG */
function GearTeeth() {
  const teeth = 12;
  const innerR = 38;
  const outerR = 46;
  const cx = 50;
  const cy = 50;
  const points: string[] = [];

  for (let i = 0; i < teeth; i++) {
    const angle = (i / teeth) * Math.PI * 2 - Math.PI / 2;
    const halfTooth = (Math.PI / teeth) * 0.4;
    const a1 = angle - halfTooth;
    const a2 = angle + halfTooth;
    const a3 = angle + (Math.PI / teeth) - halfTooth;
    const a4 = angle + (Math.PI / teeth) + halfTooth;

    points.push(
      `${cx + innerR * Math.cos(a1)},${cy + innerR * Math.sin(a1)}`,
      `${cx + outerR * Math.cos(a2)},${cy + outerR * Math.sin(a2)}`,
      `${cx + outerR * Math.cos(a3)},${cy + outerR * Math.sin(a3)}`,
      `${cx + innerR * Math.cos(a4)},${cy + innerR * Math.sin(a4)}`
    );
  }

  return (
    <polygon
      points={points.join(" ")}
      fill="none"
      stroke="rgba(0,212,255,0.6)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  );
}
