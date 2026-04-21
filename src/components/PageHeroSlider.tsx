import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { HeroSlide } from "@/lib/api";

type SlideMediaItem =
  | (HeroSlide & { kind?: "image" })
  | { src: string; alt: string; kind: "video"; title?: string; text?: string };

export type HeroCtaItem = NonNullable<HeroSlide["ctaButtons"]>[number];

interface PageHeroSliderProps {
  images: HeroSlide[];
  /** Fallback when the active slide (or promo video) has no `ctaButtons` (e.g. legacy hero-level CTAs). */
  fallbackCtaButtons?: HeroCtaItem[];
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
  fallbackCtaButtons,
  title,
  subtitle,
  children,
  height = "min-h-[400px]",
  promoVideoUrl,
}: PageHeroSliderProps) => {
  const [current, setCurrent] = useState(0);
  const mediaItems: SlideMediaItem[] = useMemo(() => {
    const imgs = images.map((img) => ({ ...img, kind: "image" as const }));
    if (promoVideoUrl) {
      return [
        ...imgs,
        { src: promoVideoUrl, alt: "Promotional video", kind: "video" as const },
      ];
    }
    return imgs;
  }, [images, promoVideoUrl]);

  const overlay = (() => {
    const item = mediaItems[current];
    if (!item) return { headline: title, sub: subtitle };
    if ("kind" in item && item.kind === "video") return { headline: title, sub: subtitle };
    const img = item as HeroSlide;
    return {
      headline: img.title?.trim() || title,
      sub: img.text?.trim() || subtitle,
    };
  })();

  const ctasForCurrent = useMemo((): HeroCtaItem[] => {
    const item = mediaItems[current];
    if (!item) return fallbackCtaButtons ?? [];
    if ("kind" in item && item.kind === "video") return fallbackCtaButtons ?? [];
    const slide = item as HeroSlide;
    if (slide.ctaButtons && slide.ctaButtons.length > 0) return slide.ctaButtons;
    return fallbackCtaButtons ?? [];
  }, [current, mediaItems, fallbackCtaButtons]);

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
      {mediaItems.length === 0 ? (
        <div className="absolute inset-0 bg-muted" aria-hidden />
      ) : null}
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
        {ctasForCurrent.length > 0 ? (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-[32px] sm:gap-4">
            {ctasForCurrent.map((cta, i) => {
              const external = /^https?:\/\//i.test(cta.href);
              const className = `h-[48px] min-w-[160px] rounded-[4px] px-[24px] py-[12px] font-heading text-base font-semibold shadow-md sm:min-w-[200px] ${
                cta.variant === "secondary"
                  ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  : "bg-accent text-accent-foreground hover:bg-accent/90"
              }`;
              return (
                <Button key={`${cta.href}-${cta.label}-${i}`} asChild className={className}>
                  {external ? (
                    <a href={cta.href} target="_blank" rel="noopener noreferrer">
                      {cta.label}
                    </a>
                  ) : (
                    <Link to={cta.href}>{cta.label}</Link>
                  )}
                </Button>
              );
            })}
          </div>
        ) : null}
        {children}
      </div>

      {mediaItems.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-[8px] sm:bottom-[24px]">
          {mediaItems.map((_, i) => (
            <button
              key={i}
              type="button"
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
