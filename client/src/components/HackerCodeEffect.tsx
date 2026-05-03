import { useEffect, useRef } from "react";

interface CodeParticle {
  id: number;
  char: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

const CHARACTERS = [
  "0", "1", "A", "B", "C", "D", "E", "F",
  "{", "}", "[", "]", "(", ")", "<", ">",
  "=", "+", "-", "*", "/", "&", "|", "^",
  "~", "!", "?", ".", ",", ";", ":",
  "0x", "01", "FF", "00", "11", "AA", "BB",
];

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
      const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      const x = Math.random() * canvas.width;
      const y = -20;
      const duration = 8000 + Math.random() * 8000; // 8-16 秒
      const delay = Math.random() * 1000;

      particlesRef.current.push({
        id: idRef.current++,
        char,
        x,
        y,
        duration,
        delay,
        opacity: 0.15 + Math.random() * 0.15, // 0.15-0.3 透明度
      });
    };

    // 动画循环
    let lastParticleTime = 0;
    const animate = (timestamp: number) => {
      // 清空 canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 定期创建新粒子
      if (timestamp - lastParticleTime > 100 + Math.random() * 200) {
        if (particlesRef.current.length < 60) {
          createParticle();
        }
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

        // 上下漂浮（正弦波）
        const floatOffset = Math.sin(progress * Math.PI * 4) * 20;
        const currentY = particle.y + progress * (canvas.height + 40) + floatOffset;

        // 透明度逐渐降低
        const alpha = particle.opacity * (1 - progress);

        // 绘制文字
        ctx.font = "12px 'Space Mono', monospace";
        ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(particle.char, particle.x, currentY);

        // 添加发光效果
        ctx.shadowColor = `rgba(0, 212, 255, ${alpha * 0.5})`;
        ctx.shadowBlur = 8;
        ctx.fillText(particle.char, particle.x, currentY);
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
