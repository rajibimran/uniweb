import { useEffect, useState } from "react";
import PageHeroSlider from "@/components/PageHeroSlider";
import { SeoHelmet } from "@/components/seo/SeoHelmet";
import { useStrapiLayout } from "@/contexts/StrapiLayoutContext";
import { api, createEmptyPageHero, formatPageTitle, IS_STRAPI_CONFIGURED, USE_LOCAL_MOCK_HYDRATION, type PageHero } from "@/lib/api";

const defaultHomeHero: PageHero = {
  page: "home",
  title: "GCC Approved Medical Center",
  subtitle:
    "Trusted for comprehensive health screening, medical checkups, and overseas employment certification in Dhaka, Bangladesh.",
  slides: [
    {
      src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=900&fit=crop",
      alt: "Professional medical facility interior",
      title: "GCC Approved Medical Center",
      text: "Trusted for comprehensive health screening, medical checkups, and overseas employment certification in Dhaka, Bangladesh.",
      ctaButtons: [
        { label: "Book Appointment", href: "/book", variant: "primary" },
        { label: "Check Report", href: "/reports", variant: "secondary" },
      ],
    },
    {
      src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1600&h=900&fit=crop",
      alt: "Modern diagnostic laboratory",
      title: "Advanced diagnostics",
      text: "Digital imaging and accredited laboratory testing to meet GCC medical standards.",
      ctaButtons: [{ label: "Our Services", href: "/services", variant: "primary" }],
    },
    {
      src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1600&h=900&fit=crop",
      alt: "Medical consultation room",
      title: "Patient-centered care",
      text: "Experienced staff guiding you through every step of screening and certification.",
      ctaButtons: [{ label: "Contact Us", href: "/contact", variant: "secondary" }],
    },
  ],
};

const HeroSection = () => {
  const { siteConfig } = useStrapiLayout();
  const siteName = siteConfig.siteName?.trim() || "";
  const [hero, setHero] = useState<PageHero | null>(() =>
    USE_LOCAL_MOCK_HYDRATION ? defaultHomeHero : IS_STRAPI_CONFIGURED ? null : createEmptyPageHero("home")
  );
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
    const homePart = defaultHomeHero.title;
    return (
      <>
        <SeoHelmet
          layers={[]}
          fallbackTitle={siteName ? `${siteName} — ${homePart}` : formatPageTitle(homePart, siteName)}
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
        fallbackTitle={siteName ? `${siteName} — ${hero.title}` : formatPageTitle(hero.title, siteName)}
        fallbackDescription={hero.subtitle}
        pathForCanonical="/"
      />
      <PageHeroSlider
        images={hero.slides}
        fallbackCtaButtons={hero.ctaButtons}
        promoVideoUrl={hero.promoVideoUrl}
        title={hero.title}
        subtitle={hero.subtitle}
        height="min-h-[420px] sm:min-h-[560px]"
      />
    </>
  );
};

export default HeroSection;
