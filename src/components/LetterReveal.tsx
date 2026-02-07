import { useEffect, useRef, useState } from "react";
import RedEnvelope from "@/components/RedEnvelope";

const LetterReveal = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const fullText = `My Dearest,

From the very first moment I met you, I knew something beautiful was beginning. You walked into my life and painted it with colors I never knew existed.

Every day with you feels like a gift I didn't know I was waiting for. Your laugh is my favorite sound, your smile is my favorite sight, and your heart is my favorite home.

Thank you for being you — for your kindness, your patience, your warmth, and your love. You make me want to be the best version of myself.

I don't just love you for who you are — I love who I am when I'm with you.

Forever and always yours ❤️`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isVisible]);

  const letterContent = (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-primary text-center mb-10 scroll-animate scroll-from-top">
        A Letter For You 💌
      </h2>

      <div className="bg-cream/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-border/30 relative scroll-animate scroll-from-bottom">
        {/* Decorative corner hearts */}
        <span className="absolute top-4 left-4 text-primary/20 text-2xl">♥</span>
        <span className="absolute top-4 right-4 text-primary/20 text-2xl">♥</span>
        <span className="absolute bottom-4 left-4 text-primary/20 text-2xl">♥</span>
        <span className="absolute bottom-4 right-4 text-primary/20 text-2xl">♥</span>

        <div className="font-handwritten text-xl md:text-2xl leading-relaxed text-foreground whitespace-pre-line">
          {displayedText}
          {!isComplete && <span className="typewriter-cursor" />}
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="snap-section min-h-screen flex items-center justify-center py-20 px-4 gradient-romantic"
    >
      <RedEnvelope>
        {letterContent}
      </RedEnvelope>
    </section>
  );
};

export default LetterReveal;
