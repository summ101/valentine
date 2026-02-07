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
    "The day you made me blush✨",
    "That perfect day 🌸",
    "Us in collage 🏢",
    "your first Bday with me💝✨",
    "9 Month's Completed🧿💕",
    "Our first event together😌✨",
    "Increasing temprature 🔥",
    "My peace 📸",
  ];

  const rotations = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.5];

  const photos = [
  "/pic1.jpg",
  "/pic2.jpg",
  "/pic3.jpg",
  "/pic4.webp",
  "/pic5.jpg",
  "/pic6.jpg",
  "/pic7.jpg",
  "/pic8.jpg",
];

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
              className="transition-all duration-700 ease-out opacity-100"
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
                  <img
                 src={photos[index]}
                  alt={captions[index]}
                  className="w-full h-full object-cover"
                 />

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
