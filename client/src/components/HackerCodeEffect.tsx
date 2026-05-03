import { useEffect, useRef } from "react";

interface CodeParticle {
  id: number;
  text: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
  speed: number;
}

// 生成更长的代码字符串
function generateCodeString(): string {
  const binaryChunks = [];
  for (let i = 0; i < 3; i++) {
    binaryChunks.push(
      Math.random().toString(2).substring(2, 10) +
      " " +
      Math.random().toString(16).substring(2, 10)
    );
  }
  return binaryChunks.join(" | ");
}

export default function HackerCodeEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<CodeParticle[]>([]);
  const idRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 设置 canvas 大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 创建新粒子
    const createParticle = () => {
      const text = generateCodeString();
      const x = Math.random() * canvas.width;
      const y = -30;
      const duration = 12000 + Math.random() * 10000; // 12-22 秒
      const delay = Math.random() * 500;
      const speed = 0.5 + Math.random() * 0.5; // 流速参差不齐

      particlesRef.current.push({
        id: idRef.current++,
        text,
        x,
        y,
        duration,
        delay,
        opacity: 0.12 + Math.random() * 0.18, // 0.12-0.3 透明度
        speed,
      });
    };

    // 动画循环
    let lastParticleTime = 0;
    const animate = (timestamp: number) => {
      // 清空 canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 持续创建新粒子（无限循环）
      if (timestamp - lastParticleTime > 300 + Math.random() * 400) {
        createParticle();
        lastParticleTime = timestamp;
      }

      // 更新并绘制粒子
      particlesRef.current = particlesRef.current.filter((particle) => {
        const elapsed = timestamp - particle.delay;

        if (elapsed < 0) {
          return true; // 还未开始
        }

        if (elapsed > particle.duration) {
          return false; // 已结束
        }

        // 计算进度
        const progress = elapsed / particle.duration;

        // 上下漂浮（正弦波）+ 向下移动
        const floatOffset = Math.sin(progress * Math.PI * 3) * 15;
        const currentY =
          particle.y +
          progress * (canvas.height + 60) * particle.speed +
          floatOffset;

        // 透明度逐渐降低
        const alpha = particle.opacity * (1 - progress);

        // 绘制文字
        ctx.font = "11px 'Space Mono', monospace";
        ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(particle.text, particle.x, currentY);

        // 添加发光效果
        ctx.shadowColor = `rgba(0, 212, 255, ${alpha * 0.6})`;
        ctx.shadowBlur = 6;
        ctx.fillText(particle.text, particle.x, currentY);
        ctx.shadowBlur = 0;

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
