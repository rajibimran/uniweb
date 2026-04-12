import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight, Newspaper } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { newsPosts } from "@/data/newsData";

const heroImages = [
  { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=900&fit=crop", alt: "News & Updates" },
  { src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1600&h=900&fit=crop", alt: "Latest announcements" },
];

const News = () => {
  useEffect(() => {
    document.title = "News & Updates — Unicare Medical, Dhaka";
  }, []);

  return (
    <Layout>
      <PageHeroSlider
        images={heroImages}
        title="News & Updates"
        subtitle="Stay informed with the latest announcements, regulatory changes, and clinic updates."
      >
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
          {/* Featured post */}
          <article className="mb-[48px] grid grid-cols-1 gap-[24px] lg:grid-cols-2 overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md">
            <img
              src={newsPosts[0].image}
              alt={newsPosts[0].title}
              className="h-[240px] w-full object-cover lg:h-full"
              loading="lazy"
            />
            <div className="flex flex-col justify-center p-[24px] lg:p-[32px]">
              <div className="flex items-center gap-[12px] mb-[12px]">
                <span className="rounded bg-primary/10 px-[8px] py-[4px] font-heading text-xs font-semibold text-primary">
                  {newsPosts[0].category}
                </span>
                <span className="flex items-center gap-[4px] font-body text-xs text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  {newsPosts[0].date}
                </span>
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground lg:text-2xl">
                {newsPosts[0].title}
              </h2>
              <p className="mt-[8px] font-body text-sm text-muted-foreground leading-relaxed">
                {newsPosts[0].excerpt}
              </p>
              <span className="mt-[16px] inline-flex items-center gap-[4px] font-heading text-sm font-semibold text-primary">
                Read More <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </article>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
            {newsPosts.slice(1).map((post) => (
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
                  <span className="absolute top-[12px] left-[12px] rounded bg-primary/90 px-[8px] py-[4px] font-heading text-[10px] font-semibold text-primary-foreground">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-[20px]">
                  <span className="flex items-center gap-[4px] font-body text-xs text-muted-foreground mb-[8px]">
                    <CalendarDays className="h-3 w-3" />
                    {post.date}
                  </span>
                  <h3 className="font-heading text-base font-semibold text-foreground leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-[8px] flex-1 font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="mt-[16px] inline-flex items-center gap-[4px] font-heading text-xs font-semibold text-primary group-hover:text-primary/80 transition-colors">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
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
