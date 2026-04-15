import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHeroSlider from "@/components/PageHeroSlider";
import { SeoHelmet } from "@/components/seo/SeoHelmet";
import { api, IS_STRAPI_CONFIGURED, type PageHero } from "@/lib/api";

const defaultHomeHero: PageHero = {
  page: "home",
  title: "GCC Approved Medical Center",
  subtitle:
    "Trusted for comprehensive health screening, medical checkups, and overseas employment certification in Dhaka, Bangladesh.",
  slides: [
    { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=900&fit=crop", alt: "Professional medical facility interior" },
    { src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1600&h=900&fit=crop", alt: "Modern diagnostic laboratory" },
    { src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1600&h=900&fit=crop", alt: "Medical consultation room" },
  ],
};

const HeroSection = () => {
  const [hero, setHero] = useState<PageHero | null>(IS_STRAPI_CONFIGURED ? null : defaultHomeHero);
  const [ready, setReady] = useState(!IS_STRAPI_CONFIGURED);

  useEffect(() => {
    if (!IS_STRAPI_CONFIGURED) return;
    let cancelled = false;
    (async () => {
      const h = await api.hero.getByPage("home", defaultHomeHero);
      if (!cancelled) {
        setHero(h);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready || !hero) {
    return (
      <>
        <SeoHelmet
          layers={[]}
          fallbackTitle="Unicare Medical, Dhaka — GCC Approved Medical Center"
          fallbackDescription={defaultHomeHero.subtitle}
          pathForCanonical="/"
        />
        <section
          className="relative min-h-[420px] animate-pulse bg-muted sm:min-h-[560px]"
          aria-busy="true"
          aria-label="Loading hero"
        />
      </>
    );
  }

  return (
    <>
      <SeoHelmet
        layers={[hero.seo]}
        fallbackTitle={`Unicare Medical, Dhaka — ${hero.title}`}
        fallbackDescription={hero.subtitle}
        pathForCanonical="/"
      />
      <PageHeroSlider
        images={hero.slides}
        promoVideoUrl={hero.promoVideoUrl}
        title={hero.title}
        subtitle={hero.subtitle}
        height="min-h-[420px] sm:min-h-[560px]"
      >
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-[32px] sm:flex-row sm:gap-[16px]">
        {(hero.ctaButtons && hero.ctaButtons.length > 0
          ? hero.ctaButtons.slice(0, 2)
          : [
              { label: "Book Appointment", href: "/book", variant: "primary" as const },
              { label: "Check Report", href: "/reports", variant: "secondary" as const },
            ]
        ).map((cta, i) => {
          const external = /^https?:\/\//i.test(cta.href);
          const className = `h-[48px] w-full min-w-[200px] rounded-[4px] px-[24px] py-[12px] font-heading text-base font-semibold shadow-md sm:w-auto ${
            cta.variant === "secondary"
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
              : "bg-accent text-accent-foreground hover:bg-accent/90"
          }`;
          return (
            <Button key={`${cta.href}-${i}`} asChild className={`w-full sm:w-auto ${className}`}>
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
    </PageHeroSlider>
    </>
  );
};

export default HeroSection;
