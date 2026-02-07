import { useEffect, useRef, useState } from "react";
import RedEnvelope from "@/components/RedEnvelope";

const LetterReveal = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const fullText = `My Dearest Vidhika💖,

  Thankyou for choosing me, Thankyou for listening me, Thankyou for understanding me, Thankyou for taking care of me, tujhe pata he you are the most special person in my life 

  mujhe bohot acha lagta he tere sath time spend kerna teri saaaaarii " pata he ajj kya hua " wali baten sunna, tujhe dekhte rehna, chahe jitna dekho mnn hi nai bharta or na bhare ga 

  mujhe tu boht zadaaaa pyari lagti he jab tu dhire se apna sir mujhprr tikaleti he vo bohot pyara moment hota he mere liye, mujhe tujhe  adore kerna bohot pasand he, mene bachpan se

  bss yahi chaha he ki mera koi esa ho jisse me Hakk se or bohot selfishly apna kehsakun, or mujhe tu mili, orr me bohot zada khus hun, hnn tu thora sa to gussa dilla ti he jab tu baat 

  nai manti he, tujhe kissi kerne ka mnn kera he My sweet little kajju, 

  Iam always yours forever🧿❤️  
  Your Dearest Sum
   `;

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
