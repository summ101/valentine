import { useState } from "react";

interface RedEnvelopeProps {
  children: React.ReactNode;
}

const RedEnvelope = ({ children }: RedEnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <div className="animate-fade-in">
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <p className="text-xl font-handwritten text-muted-foreground mb-8 text-2xl">
        Tap the envelope to read my letter 💌
      </p>

      <div
        onClick={() => setIsOpen(true)}
        className="relative cursor-pointer group transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        {/* Red envelope body */}
        <div className="relative w-[300px] sm:w-[380px] h-[200px] sm:h-[240px] rounded-xl overflow-hidden shadow-2xl">
          {/* Envelope back */}
          <div className="absolute inset-0 bg-gradient-to-b from-accent to-warm-red" />
          
          {/* Envelope front/bottom part */}
          <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-rose-deep to-accent rounded-b-xl" />

          {/* Flap - triangular top */}
          <div className="absolute top-0 left-0 right-0 overflow-hidden">
            <div 
              className="w-0 h-0 mx-auto transition-transform duration-500 group-hover:-translate-y-2"
              style={{
                borderLeft: "150px solid transparent",
                borderRight: "150px solid transparent",
                borderTop: "90px solid hsl(var(--rose-deep))",
              }}
            />
          </div>

          {/* Heart seal */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center
                            shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 drop-shadow-md">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

          {/* Envelope lines (letter peek) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col gap-1.5 opacity-30">
            <div className="w-32 h-0.5 bg-white/60 rounded-full" />
            <div className="w-24 h-0.5 bg-white/60 rounded-full mx-auto" />
            <div className="w-28 h-0.5 bg-white/60 rounded-full" />
          </div>
        </div>

        {/* Click hint */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          <div className="animate-float-gentle bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-md">
            <span className="text-sm font-body text-foreground">Click to open</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedEnvelope;
