import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { SeoHelmet } from "@/components/seo/SeoHelmet";
import { RichText } from "@/components/content/RichText";
import { useStrapiLayout } from "@/contexts/StrapiLayoutContext";
import {
  api,
  createEmptyPageHero,
  defaultAboutPage,
  formatPageTitle,
  getEmptyAboutPageContent,
  IS_MOCK_DATA_ENABLED,
  type AboutPageContent,
  type PageHero,
} from "@/lib/api";

const defaultAboutHero: PageHero = {
  page: "about",
  title: "About Us",
  subtitle: "Delivering trusted, GCC-approved medical services in Dhaka.",
  slides: [
    { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=900&fit=crop", alt: "Medical facility reception" },
    { src: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1600&h=900&fit=crop", alt: "Laboratory diagnostics" },
    { src: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1600&h=900&fit=crop", alt: "Patient examination room" },
  ],
  ctaButtons: [
    { label: "Book Appointment", href: "/book", variant: "primary" },
    { label: "Our Services", href: "/services", variant: "secondary" },
  ],
};

function toYouTubeEmbedUrl(input?: string): string {
  const raw = (input ?? "").trim();
  if (!raw) return "";

  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./i, "").toLowerCase();

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0] ?? "";
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        const id = url.searchParams.get("v") ?? "";
        return id ? `https://www.youtube.com/embed/${id}` : "";
      }
      if (url.pathname.startsWith("/embed/")) return raw;
      if (url.pathname.startsWith("/shorts/")) {
        const id = url.pathname.split("/").filter(Boolean)[1] ?? "";
        return id ? `https://www.youtube.com/embed/${id}` : "";
      }
    }
  } catch {
    return "";
  }

  return "";
}

const About = () => {
  const { pathname } = useLocation();
  const { siteConfig } = useStrapiLayout();
  const siteName = siteConfig.siteName?.trim() || "Site";
  const [content, setContent] = useState<AboutPageContent | null>(null);
  const [hero, setHero] = useState<PageHero | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [aboutData, heroData] = await Promise.all([
          api.about.get(),
          api.hero.getByPage("about", defaultAboutHero),
        ]);
        if (!cancelled) {
          setContent(aboutData);
          setHero(heroData);
        }
      } catch {
        if (!cancelled) {
          setContent(IS_MOCK_DATA_ENABLED ? defaultAboutPage : getEmptyAboutPageContent());
          setHero(IS_MOCK_DATA_ENABLED ? defaultAboutHero : createEmptyPageHero("about"));
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const aboutDesc =
    content?.missionText?.slice(0, 180) ?? defaultAboutPage.missionText.slice(0, 180);
  const virtualTourEmbedUrl = toYouTubeEmbedUrl(content?.virtualTourYoutubeUrl);

  return (
    <Layout>
      <SeoHelmet
        layers={ready && hero ? [hero.seo, content?.seo] : []}
        fallbackTitle={formatPageTitle("About Us", siteName)}
        fallbackDescription={aboutDesc}
        fallbackTextForDescription={content?.missionText}
        fallbackOgImage={hero?.slides?.[0]?.src}
        fallbackOgImageAlt={hero?.slides?.[0]?.alt}
        pathForCanonical={pathname}
        autoJsonLd={{ kind: "webpage", pageName: "About Us" }}
      />
      {!ready || !hero ? (
        <section
          className="relative flex min-h-[400px] items-center justify-center bg-muted"
          aria-busy="true"
          aria-label="Loading"
        >
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </section>
      ) : (
        <PageHeroSlider
          images={hero.slides}
          fallbackCtaButtons={hero.ctaButtons}
          title={hero.title}
          subtitle={hero.subtitle}
        />
      )}

      <PageBreadcrumb items={[{ label: "About Us" }]} />

      {!ready || !content ? (
        <div className="container space-y-6 py-[48px]" aria-busy="true" aria-label="Loading content">
          <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
            </div>
            <div className="aspect-[4/3] animate-pulse rounded-lg bg-muted" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        </div>
      ) : null}

      {ready && content ? (
      <>
      {/* Mission */}
      <section className="py-[48px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-[32px] lg:grid-cols-2 items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-[16px]">{content.missionTitle}</h2>
              <RichText value={content.missionText} />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src={content.missionImage}
                alt=""
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Center */}
      <section className="bg-muted py-[48px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-[32px] lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 rounded-lg overflow-hidden">
              <img src={content.centerImage} alt="" className="w-full h-auto object-cover" loading="lazy" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-[16px]">{content.centerTitle}</h2>
              <RichText value={content.centerText} />
            </div>
          </div>
        </div>
      </section>

      {/* Key Values */}
      <section className="py-[48px]">
        <div className="container">
          <div className="text-center mb-[32px]">
            <h2 className="font-heading text-2xl font-bold text-foreground">{content.valuesSectionTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-3">
            {content.values.map((v) => (
              <div key={v.title} className="rounded-lg border border-border bg-card p-[24px] text-center">
                <img src={v.img} alt={v.alt} className="w-full h-[160px] object-cover rounded-lg mb-[16px]" loading="lazy" />
                <h3 className="font-heading text-lg font-semibold text-foreground mb-[8px]">{v.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Gallery */}
      <section className="bg-muted py-[48px]">
        <div className="container">
          <div className="text-center mb-[32px]">
            <h2 className="font-heading text-2xl font-bold text-foreground">{content.facilityGalleryTitle}</h2>
            <p className="mt-[8px] font-body text-sm text-muted-foreground">{content.facilityGallerySubtitle}</p>
          </div>
          <div className="columns-1 gap-[16px] sm:columns-2 lg:columns-3">
            {content.gallery.map((img, i) => (
              <div key={`${img.src}-${i}`} className="mb-[16px] break-inside-avoid overflow-hidden rounded-lg">
                <img src={img.src} alt={img.alt} className="w-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="mt-[32px]">
            <h3 className="font-heading text-xl font-bold text-foreground mb-[16px] text-center">Virtual Tour</h3>
            <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-lg bg-card border border-border flex items-center justify-center">
              {virtualTourEmbedUrl ? (
                <iframe
                  src={virtualTourEmbedUrl}
                  title="Virtual Tour"
                  className="h-full w-full rounded-lg"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <div className="text-center">
                  <div className="mx-auto mb-[16px] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-primary/10">
                    <Play className="h-[32px] w-[32px] text-primary" />
                  </div>
                  <p className="font-heading text-base font-semibold text-foreground">Virtual Tour Coming Soon</p>
                  <p className="mt-[4px] font-body text-sm text-muted-foreground">Add About Page YouTube URL in Strapi</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      </>
      ) : null}
    </Layout>
  );
};

export default About;
