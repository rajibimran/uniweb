import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";

const heroImages = [
  { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=900&fit=crop", alt: "Health articles" },
  { src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1600&h=900&fit=crop", alt: "Medical resources" },
  { src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1600&h=900&fit=crop", alt: "Research and insights" },
];

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

const articles: BlogArticle[] = [
  {
    slug: "gcc-medical-screening-guide",
    title: "Complete Guide to GCC Medical Screening",
    excerpt: "Everything you need to know about the medical screening process for overseas employment in GCC countries.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    date: "April 5, 2026",
    category: "Guide",
  },
  {
    slug: "preparing-for-medical-checkup",
    title: "How to Prepare for Your Medical Checkup",
    excerpt: "Tips and steps to follow before your medical examination to ensure accurate results and smooth processing.",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop",
    date: "March 20, 2026",
    category: "Tips",
  },
  {
    slug: "understanding-lab-results",
    title: "Understanding Your Lab Test Results",
    excerpt: "A simplified breakdown of common lab tests included in GCC medical screening and what the results mean.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop",
    date: "March 10, 2026",
    category: "Education",
  },
  {
    slug: "vaccination-requirements-gcc",
    title: "Vaccination Requirements for GCC Countries",
    excerpt: "An overview of mandatory vaccinations including MMR and Meningococcal for overseas employment.",
    image: "https://images.unsplash.com/photo-1615631648086-325025c9e51e?w=600&h=400&fit=crop",
    date: "February 28, 2026",
    category: "Guide",
  },
  {
    slug: "digital-xray-benefits",
    title: "Benefits of Digital X-Ray Technology",
    excerpt: "How modern digital radiography provides safer, faster, and more accurate imaging for medical screening.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop",
    date: "February 15, 2026",
    category: "Technology",
  },
  {
    slug: "fitness-criteria-explained",
    title: "GCC Fitness Criteria Explained",
    excerpt: "Detailed explanation of health requirements candidates must meet to receive fitness certification.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    date: "February 1, 2026",
    category: "Guide",
  },
];

const Blog = () => {
  useEffect(() => { document.title = "Health Resources & Blog — Unicare Medical, Dhaka"; }, []);

  return (
    <Layout>
      <PageHeroSlider images={heroImages} title="Health Resources" subtitle="Articles, guides, and tips to help you prepare for your medical screening.">
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
              <article key={article.slug} className="group rounded-lg border border-border bg-card overflow-hidden transition-shadow hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
                <img src={article.image} alt={article.title} className="w-full h-[200px] object-cover" loading="lazy" />
                <div className="p-[24px]">
                  <div className="flex items-center gap-[12px] mb-[12px]">
                    <span className="rounded bg-primary/10 px-[8px] py-[4px] font-heading text-xs font-semibold text-primary">{article.category}</span>
                    <span className="flex items-center gap-[4px] font-body text-xs text-muted-foreground">
                      <CalendarDays className="h-3 w-3" />{article.date}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{article.title}</h3>
                  <p className="mt-[8px] font-body text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
                  <span className="mt-[16px] inline-flex items-center gap-[4px] font-heading text-sm font-semibold text-primary group-hover:text-primary/80">
                    Read More <ArrowRight className="h-4 w-4" />
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

export default Blog;
