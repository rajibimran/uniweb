import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { SeoHelmet } from "@/components/seo/SeoHelmet";
import { blogArticles as defaultBlogArticles } from "@/data/blogData";
import { api, IS_STRAPI_CONFIGURED, type BlogArticle, type PageHero } from "@/lib/api";

const defaultBlogHero: PageHero = {
  page: "blog",
  title: "Health Resources",
  subtitle: "Articles, guides, and tips to help you prepare for your medical screening.",
  slides: [
    { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=900&fit=crop", alt: "Health articles" },
    { src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1600&h=900&fit=crop", alt: "Medical resources" },
    { src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1600&h=900&fit=crop", alt: "Research and insights" },
  ],
};

const Blog = () => {
  const { pathname } = useLocation();
  const [articles, setArticles] = useState<BlogArticle[] | null>(IS_STRAPI_CONFIGURED ? null : defaultBlogArticles);
  const [hero, setHero] = useState<PageHero | null>(IS_STRAPI_CONFIGURED ? null : defaultBlogHero);
  const [ready, setReady] = useState(!IS_STRAPI_CONFIGURED);

  useEffect(() => {
    if (!IS_STRAPI_CONFIGURED) return;
    let cancelled = false;
    (async () => {
      const [a, h] = await Promise.all([api.blog.getAll(defaultBlogArticles), api.hero.getByPage("blog", defaultBlogHero)]);
      if (!cancelled) {
        setArticles(a);
        setHero(h);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready || !articles?.length || !hero) {
    return (
      <Layout>
        <SeoHelmet
          layers={hero?.seo ? [hero.seo] : []}
          fallbackTitle="Health Resources & Blog — Unicare Medical, Dhaka"
          fallbackDescription={hero?.subtitle ?? defaultBlogHero.subtitle}
          pathForCanonical={pathname}
        />
        <section className="relative min-h-[400px] animate-pulse bg-muted" aria-busy="true" aria-label="Loading blog" />
        <PageBreadcrumb items={[{ label: "Blog" }]} />
        <div className="container grid grid-cols-1 gap-[32px] py-[48px] sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-80 animate-pulse rounded-lg border border-border bg-muted" />
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SeoHelmet
        layers={[hero.seo]}
        fallbackTitle="Health Resources & Blog — Unicare Medical, Dhaka"
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

      <PageBreadcrumb items={[{ label: "Blog" }]} />

      <section className="py-[48px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-[200px] w-full object-cover"
                  loading="lazy"
                />
                <div className="p-[24px]">
                  <div className="mb-[12px] flex items-center gap-[12px]">
                    <span className="rounded bg-primary/10 px-[8px] py-[4px] font-heading text-xs font-semibold text-primary">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-[4px] font-body text-xs text-muted-foreground">
                      <CalendarDays className="h-3 w-3" />
                      {article.date}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{article.title}</h3>
                  <p className="mt-[8px] font-body text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="mt-[16px] inline-flex items-center gap-[4px] font-heading text-sm font-semibold text-primary group-hover:text-primary/80"
                  >
                    Read More <ArrowRight className="h-4 w-4" />
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

export default Blog;
