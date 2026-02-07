import { useState, useRef, useEffect } from "react";

interface EnvelopeLoginProps {
  onUnlock: () => void;
}

const PASSCODE = "2926";

const EnvelopeLogin = ({ onUnlock }: EnvelopeLoginProps) => {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (showInputs) {
      inputRefs.current[0]?.focus();
    }
  }, [showInputs]);

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);
    setError(false);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    const code = newDigits.join("");
    if (code.length === 4) {
      if (code === PASSCODE) {
        setIsOpening(true);
        setTimeout(() => onUnlock(), 1200);
      } else {
        setError(true);
        setTimeout(() => {
          setDigits(["", "", "", ""]);
          inputRefs.current[0]?.focus();
        }, 600);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[hsl(30_30%_94%)]">
      {/* Subtle texture background */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4b5a0' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute heart-float text-rose-light/30"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 14 + 8}px`,
              "--duration": `${Math.random() * 6 + 6}s`,
              "--delay": `${Math.random() * 8}s`,
            } as React.CSSProperties}
          >
            ♥
          </div>
        ))}
      </div>

      <div
        className={`relative flex flex-col items-center transition-all duration-1000 ease-in-out ${
          isOpening ? "scale-150 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Heading */}
        <h1 className="font-handwritten text-3xl sm:text-4xl md:text-5xl text-foreground/80 mb-8 sm:mb-10 text-center leading-relaxed">
          You Have A<br />Special Letter
        </h1>

        {/* Envelope */}
        <div
          onClick={() => !showInputs && setShowInputs(true)}
          className={`relative ${!showInputs ? "cursor-pointer group" : ""} transition-transform duration-300 ${
            !showInputs ? "hover:scale-[1.03] active:scale-[0.98]" : ""
          }`}
        >
          {/* Envelope body */}
          <div className="relative w-[360px] sm:w-[480px] md:w-[540px] h-[240px] sm:h-[320px] md:h-[360px] rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(180deg, hsl(340 30% 82%) 0%, hsl(340 35% 78%) 100%)",
              boxShadow: "0 20px 60px -15px hsl(340 40% 50% / 0.3), 0 8px 20px -8px hsl(340 30% 40% / 0.2)",
            }}
          >
            {/* Flap - top triangle */}
            <div className="absolute top-0 left-0 right-0 z-10">
              <svg viewBox="0 0 540 160" className="w-full" preserveAspectRatio="none">
                <path
                  d="M0,0 L270,140 L540,0 L540,0 L0,0 Z"
                  fill="hsl(340 32% 76%)"
                />
                <path
                  d="M0,0 L270,140 L540,0"
                  fill="none"
                  stroke="hsl(340 25% 72%)"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* Embossed floral pattern - left */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.12]">
              <svg viewBox="0 0 540 360" className="w-full h-full">
                {/* Bottom left floral */}
                <g transform="translate(40, 220) scale(0.8)" fill="hsl(340 20% 65%)">
                  <circle cx="20" cy="20" r="8" />
                  <circle cx="35" cy="15" r="6" />
                  <circle cx="10" cy="35" r="7" />
                  <ellipse cx="50" cy="30" rx="15" ry="3" transform="rotate(-30 50 30)" />
                  <ellipse cx="60" cy="45" rx="12" ry="3" transform="rotate(20 60 45)" />
                  <circle cx="75" cy="25" r="5" />
                  <ellipse cx="30" cy="50" rx="18" ry="3" transform="rotate(-15 30 50)" />
                </g>
                {/* Bottom right floral */}
                <g transform="translate(380, 240) scale(0.8)" fill="hsl(340 20% 65%)">
                  <circle cx="20" cy="20" r="7" />
                  <circle cx="40" cy="10" r="5" />
                  <ellipse cx="55" cy="25" rx="14" ry="3" transform="rotate(25 55 25)" />
                  <circle cx="70" cy="35" r="6" />
                  <ellipse cx="35" cy="40" rx="16" ry="3" transform="rotate(-20 35 40)" />
                </g>
                {/* Top flap florals */}
                <g transform="translate(60, 30) scale(0.6)" fill="hsl(340 20% 65%)">
                  <ellipse cx="20" cy="15" rx="12" ry="3" transform="rotate(40 20 15)" />
                  <circle cx="40" cy="25" r="5" />
                  <ellipse cx="55" cy="20" rx="10" ry="3" transform="rotate(-30 55 20)" />
                </g>
                <g transform="translate(380, 20) scale(0.6)" fill="hsl(340 20% 65%)">
                  <ellipse cx="20" cy="15" rx="12" ry="3" transform="rotate(-40 20 15)" />
                  <circle cx="40" cy="25" r="5" />
                  <ellipse cx="55" cy="20" rx="10" ry="3" transform="rotate(30 55 20)" />
                </g>
              </svg>
            </div>

            {/* Bottom fold line */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
              <svg viewBox="0 0 540 180" className="w-full" preserveAspectRatio="none">
                <path
                  d="M0,180 L270,40 L540,180"
                  fill="none"
                  stroke="hsl(340 25% 72%)"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
              </svg>
            </div>

            {/* Wax seal */}
            <div className="absolute top-[38%] sm:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center
                  ${!showInputs ? "group-hover:scale-110" : ""} transition-transform duration-300`}
                style={{
                  background: "radial-gradient(circle at 35% 35%, hsl(340 40% 55%), hsl(340 35% 42%))",
                  boxShadow: "0 4px 12px hsl(340 40% 30% / 0.4), inset 0 1px 2px hsl(340 30% 65% / 0.3)",
                }}
              >
                <span className="text-[10px] sm:text-xs font-display font-bold tracking-wider text-white/90 text-center leading-tight uppercase">
                  Open<br />Me
                </span>
              </div>
            </div>

            {/* Passcode inputs - shown after clicking */}
            {showInputs && (
              <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-fade-in">
                <p className="text-xs sm:text-sm text-foreground/50 mb-3 font-body tracking-wide">
                  Enter the secret code
                </p>
                <div className="flex gap-2 sm:gap-3">
                  {digits.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (inputRefs.current[i] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      className={`w-9 h-11 sm:w-11 sm:h-13 text-center text-lg sm:text-xl font-display font-bold 
                                 rounded-lg border-2 outline-none transition-all duration-200
                                 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-primary/20
                                 ${error
                                   ? "border-destructive animate-[shake_0.3s_ease-in-out] text-destructive"
                                   : "border-rose-light focus:border-primary text-foreground"
                                 }`}
                    />
                  ))}
                </div>
                {error && (
                  <p className="text-sm text-destructive mt-2 font-handwritten text-base">
                    Wrong code, try again! 💔
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Click hint */}
          {!showInputs && (
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
              <div className="animate-float-gentle bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-md">
                <span className="text-sm font-body text-foreground/60">Tap to open</span>
              </div>
            </div>
          )}
        </div>

        {/* Sparkle decorations */}
        <div className="absolute top-[15%] right-[5%] text-cream/60 text-xl animate-pulse">✦</div>
        <div className="absolute bottom-[20%] left-[8%] text-cream/50 text-lg animate-pulse" style={{ animationDelay: "1s" }}>✦</div>
      </div>
    </div>
  );
};

export default EnvelopeLogin;
