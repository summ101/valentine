import { useEffect, useState } from "react";

const RevealSection = () => {
  const [showContent, setShowContent] = useState(false);
  const [confettiHearts, setConfettiHearts] = useState<
    { id: number; left: number; delay: number; size: number; rotation: number }[]
  >([]);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);

    const hearts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      size: Math.random() * 20 + 10,
      rotation: Math.random() * 360,
    }));
    setConfettiHearts(hearts);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="snap-section flex flex-col items-center justify-center relative gradient-romantic px-4 overflow-hidden">
      {/* Confetti hearts */}
      {confettiHearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute top-0 pointer-events-none"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animation: `confetti-fall ${3 + Math.random() * 3}s ${heart.delay}s linear forwards`,
            color: `hsl(${340 + Math.random() * 20} ${60 + Math.random() * 30}% ${40 + Math.random() * 30}%)`,
            transform: `rotate(${heart.rotation}deg)`,
          }}
        >
          ♥
        </div>
      ))}

      <div
        className={`text-center transition-all duration-1000 ${
          showContent ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        {/* GIF placeholder instead of heart */}
        <div className="mb-8 scale-bounce">
          <div className="w-40 h-40 md:w-52 md:h-52 mx-auto rounded-2xl overflow-hidden bg-secondary/60 border-2 border-primary/20 shadow-xl flex items-center justify-center">
            <img
            src="/bubu kiss.gif"
           alt="bubu kiss gif"
            className="w-full h-full object-cover"
           />
          </div>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-primary mb-4">
          Yay!! 🎉
        </h2>
        <p className="text-2xl md:text-3xl font-handwritten text-foreground mb-6">
          I knew you'd say yes!
        </p>
        <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-10">
          Now scroll down for a little journey through our story...
        </p>

        <div className="animate-float-gentle">
          <svg className="w-8 h-8 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default RevealSection;
