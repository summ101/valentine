import { useEffect, useRef, useCallback } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
}

const SparkleHeartCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const frameRef = useRef<number>(0);
  const idCounter = useRef(0);

  const addSparkles = useCallback((x: number, y: number) => {
    const count = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      sparklesRef.current.push({
        id: idCounter.current++,
        x: x + (Math.random() - 0.5) * 30,
        y: y + (Math.random() - 0.5) * 30,
        size: Math.random() * 6 + 3,
        opacity: 1,
        rotation: Math.random() * 360,
      });
    }
    // Keep sparkles array manageable
    if (sparklesRef.current.length > 80) {
      sparklesRef.current = sparklesRef.current.slice(-60);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let lastX = -100;
    let lastY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 8) {
        addSparkles(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      mouseRef.current = { x: touch.clientX, y: touch.clientY };
      addSparkles(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);

    const drawHeart = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number,
      color: string
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      const s = size / 12;
      ctx.moveTo(0, s * 3);
      ctx.bezierCurveTo(-s * 6, -s * 3, -s * 12, s * 3, 0, s * 12);
      ctx.moveTo(0, s * 3);
      ctx.bezierCurveTo(s * 6, -s * 3, s * 12, s * 3, 0, s * 12);
      ctx.fill();
      ctx.restore();
    };

    const drawStar = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "hsl(340, 80%, 60%)";
      ctx.shadowBlur = size * 2;

      // 4-point star
      const s = size * 0.5;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        ctx.lineTo(Math.cos(angle) * s, Math.sin(angle) * s);
        const midAngle = angle + Math.PI / 4;
        ctx.lineTo(Math.cos(midAngle) * s * 0.3, Math.sin(midAngle) * s * 0.3);
      }
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw cursor heart
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        drawHeart(ctx, mx, my - 4, 18, 0, 0.9, "hsl(340, 80%, 55%)");
        // Glow
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.shadowColor = "hsl(340, 80%, 60%)";
        ctx.shadowBlur = 15;
        drawHeart(ctx, mx, my - 4, 20, 0, 0.3, "hsl(350, 85%, 65%)");
        ctx.restore();
      }

      // Update and draw sparkles
      sparklesRef.current = sparklesRef.current.filter((s) => s.opacity > 0.01);
      sparklesRef.current.forEach((sparkle) => {
        sparkle.opacity *= 0.94;
        sparkle.y -= 0.5;
        sparkle.rotation += 2;
        sparkle.size *= 0.98;

        if (sparkle.id % 3 === 0) {
          drawHeart(
            ctx,
            sparkle.x,
            sparkle.y,
            sparkle.size,
            sparkle.rotation,
            sparkle.opacity,
            "hsl(340, 75%, 60%)"
          );
        } else {
          drawStar(
            ctx,
            sparkle.x,
            sparkle.y,
            sparkle.size,
            sparkle.rotation,
            sparkle.opacity
          );
        }
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [addSparkles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ cursor: "none" }}
    />
  );
};

export default SparkleHeartCursor;
