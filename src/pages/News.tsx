import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { SeoHelmet } from "@/components/seo/SeoHelmet";
import { newsPosts as defaultNewsPosts } from "@/data/newsData";
import { api, IS_STRAPI_CONFIGURED, type NewsPost, type PageHero } from "@/lib/api";

const defaultNewsHero: PageHero = {
  page: "news",
  title: "News & Updates",
  subtitle: "Stay informed with the latest announcements, regulatory changes, and clinic updates.",
  slides: [
    { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=900&fit=crop", alt: "News & Updates" },
    { src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1600&h=900&fit=crop", alt: "Latest announcements" },
  ],
};

const News = () => {
  const { pathname } = useLocation();
  const [posts, setPosts] = useState<NewsPost[] | null>(IS_STRAPI_CONFIGURED ? null : defaultNewsPosts);
  const [hero, setHero] = useState<PageHero | null>(IS_STRAPI_CONFIGURED ? null : defaultNewsHero);
  const [ready, setReady] = useState(!IS_STRAPI_CONFIGURED);

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

  if (!ready || !posts?.length || !hero) {
    return (
      <Layout>
        <SeoHelmet
          layers={hero?.seo ? [hero.seo] : []}
          fallbackTitle="News & Updates — Unicare Medical, Dhaka"
          fallbackDescription={hero?.subtitle ?? defaultNewsHero.subtitle}
          pathForCanonical={pathname}
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

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <Layout>
      <SeoHelmet
        layers={[hero.seo]}
        fallbackTitle="News & Updates — Unicare Medical, Dhaka"
        fallbackDescription={hero.subtitle}
        pathForCanonical={pathname}
      />
      <PageHeroSlider images={hero.slides} title={hero.title} subtitle={hero.subtitle}>
        <div className="mt-[24px] flex justify-center">
          <Link to="/book">
            <button className="h-[48px] min-w-[200px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-base font-semibold text-accent-foreground shadow-md hover:bg-accent/90">
              Book Appointment
            </button>
          </Link>
        </div>
      </PageHeroSlider>

      <PageBreadcrumb items={[{ label: "News & Updates" }]} />

      <section className="py-[48px]">
        <div className="container">
          <article className="mb-[48px] grid grid-cols-1 gap-[24px] overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md lg:grid-cols-2">
            <img
              src={featured.image}
              alt={featured.title}
              className="h-[240px] w-full object-cover lg:h-full"
              loading="lazy"
            />
            <div className="flex flex-col justify-center p-[24px] lg:p-[32px]">
              <div className="mb-[12px] flex items-center gap-[12px]">
                <span className="rounded bg-primary/10 px-[8px] py-[4px] font-heading text-xs font-semibold text-primary">
                  {featured.category}
                </span>
                <span className="flex items-center gap-[4px] font-body text-xs text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  {featured.date}
                </span>
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground lg:text-2xl">{featured.title}</h2>
              <p className="mt-[8px] font-body text-sm leading-relaxed text-muted-foreground">{featured.excerpt}</p>
              <Link to={`/news/${featured.slug}`} className="mt-[16px] inline-flex items-center gap-[4px] font-heading text-sm font-semibold text-primary">
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
                  <span className="absolute left-[12px] top-[12px] rounded bg-primary/90 px-[8px] py-[4px] font-heading text-[10px] font-semibold text-primary-foreground">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-[20px]">
                  <span className="mb-[8px] flex items-center gap-[4px] font-body text-xs text-muted-foreground">
                    <CalendarDays className="h-3 w-3" />
                    {post.date}
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
        </div>
      </section>
    </Layout>
  );
};

export default News;
