import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, CalendarDays, Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { SeoHelmet } from "@/components/seo/SeoHelmet";
import { Input } from "@/components/ui/input";
import { useStrapiLayout } from "@/contexts/StrapiLayoutContext";
import { newsPosts as defaultNewsPosts } from "@/data/newsData";
import { api, createEmptyPageHero, formatPageTitle, IS_STRAPI_CONFIGURED, USE_LOCAL_MOCK_HYDRATION, type NewsPost, type PageHero } from "@/lib/api";

const defaultNewsHero: PageHero = {
  page: "news",
  title: "News & Updates",
  subtitle: "Stay informed with the latest announcements, regulatory changes, and clinic updates.",
  slides: [
    { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=900&fit=crop", alt: "News & Updates" },
    { src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1600&h=900&fit=crop", alt: "Latest announcements" },
  ],
  ctaButtons: [{ label: "Book Appointment", href: "/book", variant: "primary" }],
};

const News = () => {
  const { pathname } = useLocation();
  const { siteConfig } = useStrapiLayout();
  const siteName = siteConfig.siteName?.trim() || "Site";
  const [posts, setPosts] = useState<NewsPost[] | null>(() =>
    USE_LOCAL_MOCK_HYDRATION ? defaultNewsPosts : IS_STRAPI_CONFIGURED ? null : []
  );
  const [hero, setHero] = useState<PageHero | null>(() =>
    USE_LOCAL_MOCK_HYDRATION ? defaultNewsHero : IS_STRAPI_CONFIGURED ? null : createEmptyPageHero("news")
  );
  const [ready, setReady] = useState(!IS_STRAPI_CONFIGURED);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    if (!IS_STRAPI_CONFIGURED) return;
    let cancelled = false;
    (async () => {
      const [p, h] = await Promise.all([api.news.getAll(defaultNewsPosts), api.hero.getByPage("news", defaultNewsHero)]);
      if (!cancelled) {
        setPosts(p);
        setHero(h);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const { featured, rest } = useMemo(() => {
    if (!posts?.length) return { featured: null as NewsPost | null, rest: [] as NewsPost[] };
    const q = searchQ.trim().toLowerCase();
    const pool = q
      ? posts.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.excerpt.toLowerCase().includes(q) ||
            (p.category || "").toLowerCase().includes(q)
        )
      : posts;
    if (!pool.length) return { featured: null, rest: [] };
    const feat = pool.find((p) => p.isFeatured) ?? pool[0];
    return { featured: feat, rest: pool.filter((p) => p.slug !== feat.slug) };
  }, [posts, searchQ]);

  if (!ready || !posts?.length || !hero) {
    return (
      <Layout>
        <SeoHelmet
          layers={hero?.seo ? [hero.seo] : []}
          fallbackTitle={formatPageTitle("News & Updates", siteName)}
          fallbackDescription={hero?.subtitle ?? defaultNewsHero.subtitle}
          fallbackOgImage={hero?.slides?.[0]?.src}
          fallbackOgImageAlt={hero?.slides?.[0]?.alt}
          pathForCanonical={pathname}
          autoJsonLd={{ kind: "webpage", pageName: "News & Updates" }}
        />
        <section className="relative min-h-[400px] animate-pulse bg-muted" aria-busy="true" aria-label="Loading news" />
        <PageBreadcrumb items={[{ label: "News & Updates" }]} />
        <div className="container py-[48px]">
          <div className="mb-[48px] grid grid-cols-1 gap-[24px] lg:grid-cols-2">
            <div className="h-64 animate-pulse rounded-lg bg-muted" />
            <div className="h-64 animate-pulse rounded-lg bg-muted" />
          </div>
          <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-72 animate-pulse rounded-lg border border-border bg-muted" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SeoHelmet
        layers={[hero.seo]}
        fallbackTitle={formatPageTitle(hero.title || "News & Updates", siteName)}
        fallbackDescription={hero.subtitle}
        fallbackOgImage={hero.slides?.[0]?.src}
        fallbackOgImageAlt={hero.slides?.[0]?.alt}
        pathForCanonical={pathname}
        autoJsonLd={{ kind: "webpage", pageName: hero.title || "News & Updates" }}
      />
      <PageHeroSlider
        images={hero.slides}
        fallbackCtaButtons={hero.ctaButtons}
        title={hero.title}
        subtitle={hero.subtitle}
      />

      <PageBreadcrumb items={[{ label: "News & Updates" }]} />

      <section className="py-[48px]">
        <div className="container">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-md">
              <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-3 w-3 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
              />

              <Input
                  type="text"
                  inputMode="search"
                  placeholder="Search news by title, excerpt, or category…"
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    bg-background
                    pl-11
                    pr-4
                    text-sm
                    leading-none
                    placeholder:text-muted-foreground/70
                    focus-visible:ring-2
                    focus-visible:ring-primary/30
                  "
                  aria-label="Search news"
              />
            </div>
          </div>

          {!featured ? (
            <p className="py-[24px] text-center font-body text-sm text-muted-foreground">No news posts match your search.</p>
          ) : (
            <>
              <article className="mb-[48px] grid grid-cols-1 gap-[24px] overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md lg:grid-cols-2">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-[240px] w-full object-cover lg:h-full"
                  loading="lazy"
                />
                <div className="flex flex-col justify-center p-[24px] lg:p-[32px]">
                  <div className="mb-[12px] flex flex-wrap items-center gap-[12px]">
                    {featured.category ? (
                      <span className="rounded bg-primary/10 px-[8px] py-[4px] font-heading text-xs font-semibold text-primary">
                        {featured.category}
                      </span>
                    ) : null}
                    {featured.isFeatured ? (
                      <span className="rounded bg-accent/15 px-[8px] py-[4px] font-heading text-xs font-semibold text-accent-foreground">
                        Featured
                      </span>
                    ) : null}
                    <span className="flex items-center gap-[4px] font-body text-xs text-muted-foreground">
                      <CalendarDays className="h-3 w-3" />
                      {featured.date}
                    </span>
                    {featured.readMinutes != null ? (
                      <span className="font-body text-xs text-muted-foreground">{featured.readMinutes} min read</span>
                    ) : null}
                  </div>
                  {featured.author ? (
                    <p className="mb-[8px] font-body text-xs text-muted-foreground">By {featured.author.name}</p>
                  ) : null}
                  <h2 className="font-heading text-xl font-bold text-foreground lg:text-2xl">{featured.title}</h2>
                  <p className="mt-[8px] font-body text-sm leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                  <Link
                    to={`/news/${featured.slug}`}
                    className="mt-[16px] inline-flex items-center gap-[4px] font-heading text-sm font-semibold text-primary"
                  >
                    Read More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>

              <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <article
                    key={post.slug}
                    className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-[180px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      {post.category ? (
                        <span className="absolute left-[12px] top-[12px] rounded bg-primary/90 px-[8px] py-[4px] font-heading text-[10px] font-semibold text-primary-foreground">
                          {post.category}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-[20px]">
                      <span className="mb-[8px] flex flex-wrap items-center gap-[8px] font-body text-xs text-muted-foreground">
                        <span className="flex items-center gap-[4px]">
                          <CalendarDays className="h-3 w-3" />
                          {post.date}
                        </span>
                        {post.readMinutes != null ? <span>{post.readMinutes} min read</span> : null}
                      </span>
                      <h3 className="font-heading text-base font-semibold leading-snug text-foreground">{post.title}</h3>
                      <p className="mt-[8px] line-clamp-3 flex-1 font-body text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <Link
                        to={`/news/${post.slug}`}
                        className="mt-[16px] inline-flex items-center gap-[4px] font-heading text-xs font-semibold text-primary transition-colors group-hover:text-primary/80"
                      >
                        Read More <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default News;
