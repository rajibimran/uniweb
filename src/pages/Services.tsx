import { useEffect, useState } from "react";
import { Check, X as XIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { SeoHelmet } from "@/components/seo/SeoHelmet";
import { RichText } from "@/components/content/RichText";
import { ServiceMark } from "@/components/service/ServiceMark";
import {
  services as defaultServices,
  serviceFAQs,
  type ServiceCard,
  type FAQItem,
} from "@/data/mockData";
import { api, defaultServicesPageConfig, IS_STRAPI_CONFIGURED, type PageHero, type ServiceComparisonRow } from "@/lib/api";

const defaultServicesHero: PageHero = {
  page: "services",
  title: "Our Services",
  subtitle: "Comprehensive GCC-approved medical services for overseas employment and travel certification.",
  slides: [
    { src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1600&h=900&fit=crop", alt: "Medical examination" },
    { src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1600&h=900&fit=crop", alt: "Digital radiology" },
    { src: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&h=900&fit=crop", alt: "Laboratory testing" },
  ],
};

const Services = () => {
  const { pathname } = useLocation();
  const [items, setItems] = useState<ServiceCard[] | null>(IS_STRAPI_CONFIGURED ? null : defaultServices);
  const [hero, setHero] = useState<PageHero | null>(IS_STRAPI_CONFIGURED ? null : defaultServicesHero);
  const [faqs, setFaqs] = useState<FAQItem[] | null>(IS_STRAPI_CONFIGURED ? null : serviceFAQs);
  const [pageConfig, setPageConfig] = useState(IS_STRAPI_CONFIGURED ? null : defaultServicesPageConfig);
  const [ready, setReady] = useState(!IS_STRAPI_CONFIGURED);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = pageConfig?.categories ?? defaultServicesPageConfig.categories;
  const comparison: ServiceComparisonRow[] = pageConfig?.comparison ?? defaultServicesPageConfig.comparison;

  useEffect(() => {
    if (!IS_STRAPI_CONFIGURED) return;
    let cancelled = false;
    (async () => {
      const [svc, h, f, cfg] = await Promise.all([
        api.services.getAll(),
        api.hero.getByPage("services", defaultServicesHero),
        api.faqs.getAll(),
        api.servicesPage.get(),
      ]);
      if (!cancelled) {
        setItems(svc);
        setHero(h);
        setFaqs(f);
        setPageConfig(cfg);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = items && (activeCategory === "All" ? items : items.filter((s) => s.category === activeCategory));

  if (!ready || !items || !hero || !faqs || !filtered || !pageConfig) {
    return (
      <Layout>
        <SeoHelmet
          layers={hero?.seo ? [hero.seo] : []}
          fallbackTitle="Our Services — Unicare Medical, Dhaka"
          fallbackDescription={hero?.subtitle ?? defaultServicesHero.subtitle}
          pathForCanonical={pathname}
        />
        <section
          className="relative flex min-h-[400px] items-center justify-center bg-muted"
          aria-busy="true"
          aria-label="Loading services"
        >
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </section>
        <PageBreadcrumb items={[{ label: "Services" }]} />
        <div className="container space-y-4 py-[48px]">
          <div className="h-10 w-full max-w-2xl animate-pulse rounded-lg bg-muted" />
          <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
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
        fallbackTitle="Our Services — Unicare Medical, Dhaka"
        fallbackDescription={hero.subtitle}
        pathForCanonical={pathname}
      />
      <PageHeroSlider images={hero.slides} title={hero.title} subtitle={hero.subtitle}>
        <div className="mt-[24px] flex flex-col items-center gap-[12px] sm:flex-row sm:justify-center">
          <Link to="/book">
            <Button className="h-[48px] min-w-[200px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-base font-semibold text-accent-foreground shadow-md hover:bg-accent/90">
              Book Appointment
            </Button>
          </Link>
        </div>
      </PageHeroSlider>

      <PageBreadcrumb items={[{ label: "Services" }]} />

      <section className="py-[48px]">
        <div className="container">
          <div className="flex flex-wrap gap-[8px] mb-[32px] justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`h-[44px] rounded-[4px] px-[24px] py-[12px] font-heading text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground border border-border hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2">
            {filtered.map((service) => {
              return (
                <Link
                  key={service.title}
                  to={service.href}
                  className="group rounded-lg border border-border bg-card overflow-hidden transition-shadow hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
                >
                  {service.cardImage ? (
                    <img
                      src={service.cardImage}
                      alt={service.title}
                      className="h-[200px] w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-[200px] w-full items-center justify-center bg-muted">
                      <ServiceMark
                        icon={service.icon}
                        iconImage={service.iconImage}
                        className="h-12 w-12 text-muted-foreground/40"
                      />
                    </div>
                  )}
                  <div className="p-[24px]">
                    <div className="mb-[12px] flex items-center gap-[12px]">
                      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-primary/10">
                        <ServiceMark icon={service.icon} iconImage={service.iconImage} className="h-[20px] w-[20px] text-primary" />
                      </div>
                      <span className="rounded bg-muted px-[8px] py-[4px] font-body text-xs text-muted-foreground">
                        {service.category}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">{service.title}</h3>
                    <RichText value={service.description} className="mt-[8px] [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-muted-foreground" />
                    <span className="mt-[16px] inline-block font-heading text-sm font-semibold text-primary group-hover:text-primary/80">
                      Learn More →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted py-[48px]">
        <div className="container">
          <div className="text-center mb-[32px]">
            <h2 className="font-heading text-2xl font-bold text-foreground">Compare Our Services</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse bg-card rounded-lg overflow-hidden">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-[16px] text-left font-heading text-sm font-semibold text-foreground">Feature</th>
                  <th className="p-[16px] text-center font-heading text-sm font-semibold text-foreground">Physical Exam</th>
                  <th className="p-[16px] text-center font-heading text-sm font-semibold text-foreground">Radiology</th>
                  <th className="p-[16px] text-center font-heading text-sm font-semibold text-foreground">Lab Tests</th>
                  <th className="p-[16px] text-center font-heading text-sm font-semibold text-foreground">Vaccination</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-card" : "bg-muted/50"}>
                    <td className="p-[16px] font-body text-sm text-foreground">{row.feature}</td>
                    {(["physical", "radiology", "laboratory", "vaccination"] as const).map((key) => {
                      const val = row[key];
                      return (
                        <td key={key} className="p-[16px] text-center">
                          {typeof val === "boolean" ? (
                            val ? (
                              <Check className="mx-auto h-5 w-5 text-accent" />
                            ) : (
                              <XIcon className="mx-auto h-5 w-5 text-muted-foreground/40" />
                            )
                          ) : (
                            <span className="font-body text-sm text-foreground">{val}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-[48px]">
        <div className="container max-w-3xl">
          <div className="text-center mb-[32px]">
            <h2 className="font-heading text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="font-heading text-sm font-semibold text-foreground text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed">
                  <RichText value={faq.answer} className="[&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-muted-foreground" />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
