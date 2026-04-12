import { useState, useEffect, useCallback } from "react";

interface PageHeroSliderProps {
  images: { src: string; alt: string }[];
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  height?: string;
}

const PageHeroSlider = ({
  images,
  title,
  subtitle,
  children,
  height = "min-h-[400px]",
}: PageHeroSliderProps) => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, images.length]);

  return (
    <section className={`relative flex ${height} items-center justify-center overflow-hidden`}>
      {images.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          loading={i === 0 ? "eager" : "lazy"}
          width={1600}
          height={900}
        />
      ))}
      <div className="absolute inset-0 bg-foreground/65" />

      <div className="container relative z-10 px-4 py-8 text-center sm:px-6 sm:py-[48px]">
        <h1 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-2xl font-body text-base leading-relaxed text-white/90 sm:mt-[16px] sm:text-lg">
            {subtitle}
          </p>
        )}
        {children}
      </div>

      {/* Slider dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-[8px] sm:bottom-[24px]">
          {images.map((_, i) => (
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
