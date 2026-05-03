import { useEffect, useRef } from "react";

interface CodeColumn {
  id: number;
  x: number;
  chars: string[];
  speed: number;
  offset: number;
  opacity: number;
}

// 生成随机字符
function getRandomChar(): string {
  const chars = [
    "0", "1", "A", "B", "C", "D", "E", "F",
    "{", "}", "[", "]", "(", ")", "<", ">",
    "=", "+", "-", "*", "/", "&", "|", "^",
    "~", "!", "?", ".", ",", ";", ":",
  ];
  return chars[Math.floor(Math.random() * chars.length)];
}

export default function HackerCodeEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const columnsRef = useRef<CodeColumn[]>([]);
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

    // 创建新列
    const createColumn = () => {
      const chars: string[] = [];
      const charCount = 20 + Math.floor(Math.random() * 30); // 20-50 个字符
      for (let i = 0; i < charCount; i++) {
        chars.push(getRandomChar());
      }

      columnsRef.current.push({
        id: idRef.current++,
        x: Math.random() * canvas.width,
        chars,
        speed: 0.3 + Math.random() * 0.7, // 0.3-1.0 流速
        offset: -charCount * 12, // 从屏幕上方开始
        opacity: 0.15 + Math.random() * 0.2, // 0.15-0.35 透明度
      });
    };

    // 初始化：创建足够多的列覆盖整个屏幕
    for (let i = 0; i < 80; i++) {
      createColumn();
    }

    // 动画循环
    let frameCount = 0;
    const animate = () => {
      // 清空 canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 定期创建新列（保持密度）
      frameCount++;
      if (frameCount % 5 === 0 && columnsRef.current.length < 120) {
        createColumn();
      }

      // 更新并绘制列
      columnsRef.current = columnsRef.current.filter((column) => {
        // 更新偏移
        column.offset += column.speed;

        // 如果列完全离开屏幕，删除它
        if (column.offset > canvas.height + 600) {
          return false;
        }

        // 绘制字符列
        ctx.font = "12px 'Space Mono', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let i = 0; i < column.chars.length; i++) {
          const y = column.offset + i * 12;

          // 只绘制在屏幕范围内的字符
          if (y > -20 && y < canvas.height + 20) {
            // 计算透明度（顶部和底部渐隐）
            let alpha = column.opacity;
            if (y < 50) {
              alpha *= y / 50;
            }
            if (y > canvas.height - 50) {
              alpha *= (canvas.height - y) / 50;
            }

            ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.fillText(column.chars[i], column.x, y);

            // 添加发光效果
            ctx.shadowColor = `rgba(0, 212, 255, ${alpha * 0.5})`;
            ctx.shadowBlur = 5;
            ctx.fillText(column.chars[i], column.x, y);
            ctx.shadowBlur = 0;
          }
        }

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
