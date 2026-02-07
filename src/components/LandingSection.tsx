import { useState, useRef, useCallback } from "react";

interface LandingSectionProps {
  onYes: () => void;
}

const LandingSection = ({ onYes }: LandingSectionProps) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const dodgeButton = useCallback(() => {
    const maxX = 200;
    const maxY = 150;
    const newX = (Math.random() - 0.5) * maxX * 2;
    const newY = (Math.random() - 0.5) * maxY * 2;
    setNoPosition({ x: newX, y: newY });
    setDodgeCount((prev) => prev + 1);
  }, []);

  const getDodgeMessage = () => {
    if (dodgeCount === 0) return "Choose wisely... 💕";
    if (dodgeCount === 1) return "Hehe, try again! 😏";
    if (dodgeCount === 2) return "You can't click it! 😜";
    if (dodgeCount === 3) return "Just say yes already! 🥺";
    if (dodgeCount >= 4) return "The button doesn't want you! 💔 Say YES!";
    return "Choose wisely... 💕";
  };

  const getNoButtonText = () => {
    if (dodgeCount === 0) return "Hmm, let me think... 🤔";
    if (dodgeCount === 1) return "Nope, can't catch me! 😜";
    if (dodgeCount === 2) return "Still trying? 🏃‍♂️";
    if (dodgeCount === 3) return "I'm too fast! ⚡";
    if (dodgeCount >= 4) return "GIVE UP! 🚫";
    return "Hmm, let me think... 🤔";
  };

  return (
    <section className="snap-section flex flex-col items-center justify-center relative gradient-hero px-4">
      {/* Large pulsing heart */}
      <div className="pulse-heart mb-6">
        <svg
          viewBox="0 0 24 24"
          fill="hsl(var(--primary))"
          className="w-16 h-16 md:w-20 md:h-20"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* Main question */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-foreground mb-2 text-center leading-tight">
        Will you be my
      </h1>
      <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold text-primary italic mb-8 text-center">
        Valentine?
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-muted-foreground mb-12 font-handwritten text-2xl md:text-3xl">
        {getDodgeMessage()}
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center relative">
        <button
          onClick={onYes}
          className="gradient-accent text-primary-foreground px-10 py-4 rounded-full text-xl font-display font-semibold
                     shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300
                     hover:brightness-110 active:scale-95 min-w-[180px]"
        >
          Yes! &lt;3
        </button>

        <button
          ref={noButtonRef}
          onMouseEnter={dodgeButton}
          onTouchStart={dodgeButton}
          className="dodge-button bg-secondary text-secondary-foreground px-10 py-4 rounded-full text-xl font-display font-semibold
                     shadow-md hover:shadow-lg min-w-[220px] border border-border"
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
          }}
        >
          {getNoButtonText()}
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 animate-float-gentle opacity-50">
        <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default LandingSection;
