import { useEffect, useRef, useState } from "react";

interface TimelineItem {
  title: string;
  date: string;
  description: string;
  emoji: string;
}

const timelineItems: TimelineItem[] = [
  {
    title: "The First Glance",
    date: "The moment it all started",
    description: "Something about you caught my eye, and I just knew my world was about to change forever.",
    emoji: "✨",
  },
  {
    title: "Talking to you",
    date: "When words became magic",
    description: "Talking to you became the best part of my everyday life, i felt home in your voice ",
    emoji: "💬",
  },
  {
    title: "The First Date",
    date: "Butterflies everywhere",
    description: "My heart was racing, my palms were sweaty, but your smile made everything feel right.",
    emoji: "🦋",
  },
  {
    title: "Falling In Love",
    date: "The sweetest surrender",
    description: "It wasn't a single moment — it was a thousand little ones that made me realize you're my person.",
    emoji: "💕",
  },
  {
    title: "Our Adventures",
    date: "Making memories together",
    description: "I never thought, i am gonna attend so many hackathon in diffrent cities with my little kajju, we fuckin infiltrated Microsoft !!, And many more adventures yet to come.",
    emoji: "🔥",
  },
  {
    title: "Right Now",
    date: "This very moment",
    description: "Here we are, and I'm still falling more in love with you every single day.",
    emoji: "💖",
  },
];

const StoryTimeline = () => {
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
      { threshold: 0.3 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getAnimationClass = (index: number, isVisible: boolean) => {
    if (!isVisible) {
      // Alternate between different hidden states
      const animations = [
        "opacity-0 -translate-x-20",
        "opacity-0 translate-x-20",
        "opacity-0 -translate-x-16 rotate-3",
        "opacity-0 translate-x-16 -rotate-3",
        "opacity-0 -translate-x-24 scale-90",
        "opacity-0 translate-x-24 scale-90",
      ];
      return animations[index % animations.length];
    }
    return "opacity-100 translate-x-0 rotate-0 scale-100";
  };

  return (
    <section className="snap-section min-h-screen py-20 px-4 gradient-warm">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-primary text-center mb-4 scroll-animate scroll-from-top">
          Our Story
        </h2>
        <p className="text-xl font-handwritten text-muted-foreground text-center mb-16 scroll-animate scroll-from-bottom">
          A timeline of us 💕
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary/20" />

          {timelineItems.map((item, index) => {
            const isVisible = visibleItems.has(index);
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                data-index={index}
                className={`relative mb-12 md:mb-16 flex items-start ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } transition-all duration-700 ease-out ${getAnimationClass(index, isVisible)}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 z-10">
                  <div className="timeline-dot flex items-center justify-center">
                    <span className="text-xs">{item.emoji}</span>
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`ml-16 md:ml-0 md:w-5/12 ${
                    isEven ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/50 hover:shadow-xl transition-shadow duration-300">
                    <span className="text-3xl mb-3 block">{item.emoji}</span>
                    <h3 className="text-xl font-display font-bold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm font-handwritten text-primary mb-3">
                      {item.date}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StoryTimeline;
