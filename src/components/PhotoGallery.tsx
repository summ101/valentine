import { useEffect, useRef, useState } from "react";

const PhotoGallery = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const captions = [
    "Our favorite place ✨",
    "That perfect day 🌸",
    "Laughing together 😄",
    "Adventures await 🌍",
    "Sweet moments 💕",
    "My favorite smile 😊",
    "Us being us 💖",
    "Forever memories 📸",
  ];

  const rotations = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.5];

  const getEntryAnimation = (index: number, isVisible: boolean) => {
    if (!isVisible) {
      const animations = [
        "opacity-0 -translate-x-16 -rotate-6",
        "opacity-0 translate-x-16 rotate-6",
        "opacity-0 translate-y-12 scale-75",
        "opacity-0 -translate-x-20 rotate-3",
        "opacity-0 translate-x-20 -rotate-3",
        "opacity-0 -translate-y-12 scale-75",
        "opacity-0 -translate-x-12 rotate-12",
        "opacity-0 translate-x-12 -rotate-12",
      ];
      return animations[index % animations.length];
    }
    return "opacity-100 translate-x-0 translate-y-0 scale-100";
  };

  return (
    <section className="snap-section min-h-screen py-20 px-4 gradient-hero">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-primary text-center mb-4 scroll-animate scroll-from-left">
          Our Memories
        </h2>
        <p className="text-xl font-handwritten text-muted-foreground text-center mb-14 scroll-animate scroll-from-right">
          Every picture tells our story 📸
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className={`transition-all duration-700 ease-out
                         ${getEntryAnimation(index, visibleItems.has(index))}`}
              style={{
                transform: visibleItems.has(index)
                  ? `rotate(${rotations[index]}deg)`
                  : undefined,
                transitionDelay: `${index * 80}ms`,
              }}
            >
              <div className="gallery-item rounded-2xl overflow-hidden bg-card shadow-lg border border-border/30">
                {/* Photo placeholder */}
                <div className="aspect-[3/4] relative overflow-hidden bg-secondary flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 md:w-10 md:h-10 text-primary/40"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-muted-foreground font-handwritten">
                      Add your photo here
                    </p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/0 hover:bg-primary/10 transition-colors duration-300" />
                </div>

                {/* Caption */}
                <div className="p-3 md:p-4 text-center">
                  <p className="text-sm md:text-base font-handwritten text-foreground">
                    {captions[index]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
