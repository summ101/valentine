import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const HeartShower = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 18 + 8,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.15,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute heart-float"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            "--duration": `${heart.duration}s`,
            "--delay": `${heart.delay}s`,
            color: "hsl(var(--primary))",
          } as React.CSSProperties}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            width="1em"
            height="1em"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default HeartShower;
