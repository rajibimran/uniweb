import { useState, useEffect, useCallback } from "react";

type HeroImageItem = { src: string; alt: string; title?: string; text?: string; kind?: "image" };

interface PageHeroSliderProps {
  images: HeroImageItem[];
  /** Fallback headline when a slide has no `title` (and for promo video). */
  title: string;
  /** Fallback subcopy when a slide has no `text`. */
  subtitle?: string;
  children?: React.ReactNode;
  height?: string;
  promoVideoUrl?: string;
}

const PageHeroSlider = ({
  images,
  title,
  subtitle,
  children,
  height = "min-h-[400px]",
  promoVideoUrl,
}: PageHeroSliderProps) => {
  const [current, setCurrent] = useState(0);
  const mediaItems = promoVideoUrl
    ? [...images.map((img) => ({ ...img, kind: "image" as const })), { src: promoVideoUrl, alt: "Promotional video", kind: "video" as const }]
    : images.map((img) => ({ ...img, kind: "image" as const }));

  const overlay = (() => {
    const item = mediaItems[current];
    if (!item) return { headline: title, sub: subtitle };
    if ("kind" in item && item.kind === "video") return { headline: title, sub: subtitle };
    const img = item as HeroImageItem;
    return {
      headline: img.title?.trim() || title,
      sub: img.text?.trim() || subtitle,
    };
  })();

  const len = Math.max(1, mediaItems.length);
  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % len);
  }, [len]);

  useEffect(() => {
    if (mediaItems.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, mediaItems.length]);

  return (
    <section className={`relative flex ${height} items-center justify-center overflow-hidden`}>
      {mediaItems.map((item, i) =>
        item.kind === "video" ? (
          <video
            key={item.src}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={item.alt}
          >
            <source src={item.src} />
          </video>
        ) : (
          <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            loading={i === 0 ? "eager" : "lazy"}
            width={1600}
            height={900}
          />
        )
      )}
      <div className="absolute inset-0 bg-foreground/65" />

      <div className="container relative z-10 px-4 py-8 text-center sm:px-6 sm:py-[48px]">
        <h1 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {overlay.headline}
        </h1>
        {overlay.sub && (
          <p className="mx-auto mt-3 max-w-2xl font-body text-base leading-relaxed text-white/90 sm:mt-[16px] sm:text-lg">
            {overlay.sub}
          </p>
        )}
        {children}
      </div>

      {/* Slider dots */}
      {mediaItems.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-[8px] sm:bottom-[24px]">
          {mediaItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[10px] w-[10px] rounded-full transition-colors ${
                i === current ? "bg-white" : "bg-white/40"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PageHeroSlider;
