import { useEffect, useRef, useState } from "react";

const HappyValentines = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="snap-section min-h-screen flex flex-col items-center justify-center px-4 gradient-warm relative overflow-hidden"
    >
      {/* Background decorative hearts */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute text-primary/10 animate-float-gentle"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            fontSize: `${Math.random() * 40 + 20}px`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          ♥
        </div>
      ))}

      <div
        className={`text-center z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Big heart with slow pop */}
        <div className={`mb-8 transition-all duration-[1500ms] ease-out ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}>
          <svg
            viewBox="0 0 24 24"
            fill="hsl(var(--accent))"
            className="w-28 h-28 md:w-36 md:h-36 mx-auto drop-shadow-lg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <h2 className={`text-5xl sm:text-6xl md:text-8xl font-display font-bold text-primary mb-4 
                         transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}`}>
          Happy
        </h2>
        <h2 className={`text-5xl sm:text-6xl md:text-8xl font-display font-bold text-gradient-accent mb-8 italic
                         transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}>
          Valentine's Day
        </h2>

        <p className={`text-2xl md:text-3xl font-handwritten text-foreground mb-4 max-w-lg mx-auto
                        transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Thank you for being the best part of my life
        </p>
        <p className={`text-xl font-handwritten text-muted-foreground mb-10
                        transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          I love you more than words can say 💕
        </p>

        {/* Decorative divider */}
        <div className={`flex items-center justify-center gap-3 mb-8
                          transition-all duration-700 delay-[800ms] ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
          <div className="h-px w-16 bg-primary/30" />
          <span className="text-primary text-2xl">♥</span>
          <div className="h-px w-16 bg-primary/30" />
        </div>

        <p className={`text-sm text-muted-foreground font-body
                        transition-all duration-700 delay-[900ms] ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Made with love, just for you ❤️
        </p>
      </div>
    </section>
  );
};

export default HappyValentines;
