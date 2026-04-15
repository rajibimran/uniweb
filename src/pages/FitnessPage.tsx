import { useEffect, useState } from "react";
import { ShieldCheck, ShieldAlert, AlertTriangle, Dumbbell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { SeoHelmet } from "@/components/seo/SeoHelmet";
import { RichText } from "@/components/content/RichText";
import { fitnessCriteria as defaultFitnessCriteria, type FitnessCriteria } from "@/data/mockData";
import { api, IS_STRAPI_CONFIGURED, type PageHero } from "@/lib/api";

const categoryIcons: Record<string, React.ElementType> = {
  "Infectious Diseases — Must Be Negative / Non-Reactive": ShieldAlert,
  "Non-Infectious Conditions — Must Be Clear": ShieldCheck,
  "Additional Requirements": AlertTriangle,
  "Physical Fitness Requirements": Dumbbell,
};

const defaultFitnessHero: PageHero = {
  page: "fitness",
  title: "Fitness Criteria",
  subtitle: "Health requirements for overseas employment certification. Candidates must meet the following criteria to be certified fit.",
  slides: [
    { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&h=900&fit=crop", alt: "Fitness assessment" },
    { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=900&fit=crop", alt: "Medical screening" },
    { src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1600&h=900&fit=crop", alt: "Health certification" },
  ],
};

const FitnessPage = () => {
  const { pathname } = useLocation();
  const [criteria, setCriteria] = useState<FitnessCriteria[] | null>(IS_STRAPI_CONFIGURED ? null : defaultFitnessCriteria);
  const [hero, setHero] = useState<PageHero | null>(IS_STRAPI_CONFIGURED ? null : defaultFitnessHero);
  const [ready, setReady] = useState(!IS_STRAPI_CONFIGURED);

  useEffect(() => {
    if (!IS_STRAPI_CONFIGURED) return;
    let cancelled = false;
    (async () => {
      const [crit, h] = await Promise.all([
        api.fitnessCriteria.getAll(),
        api.hero.getByPage("fitness", defaultFitnessHero),
      ]);
      if (!cancelled) {
        setCriteria(crit);
        setHero(h);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready || !criteria || !hero) {
    return (
      <Layout>
        <SeoHelmet
          layers={hero?.seo ? [hero.seo] : []}
          fallbackTitle="Fitness Criteria — Unicare Medical, Dhaka"
          fallbackDescription={hero?.subtitle ?? defaultFitnessHero.subtitle}
          pathForCanonical={pathname}
        />
        <section className="relative min-h-[400px] animate-pulse bg-muted" aria-busy="true" aria-label="Loading fitness page" />
        <PageBreadcrumb items={[{ label: "Fitness Criteria" }]} />
        <div className="container max-w-4xl space-y-6 py-[48px]">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-lg border border-border bg-muted" />
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SeoHelmet
        layers={[hero.seo]}
        fallbackTitle="Fitness Criteria — Unicare Medical, Dhaka"
        fallbackDescription={hero.subtitle}
        pathForCanonical={pathname}
      />
      <PageHeroSlider images={hero.slides} title={hero.title} subtitle={hero.subtitle}>
        <div className="mt-[24px] flex justify-center">
          <Link to="/book">
            <Button className="h-[48px] min-w-[200px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-base font-semibold text-accent-foreground shadow-md hover:bg-accent/90">
              Book Appointment
            </Button>
          </Link>
        </div>
      </PageHeroSlider>

      <PageBreadcrumb items={[{ label: "Fitness Criteria" }]} />

      <section className="py-[48px]">
        <div className="container max-w-4xl">
          <div className="mb-[32px] overflow-hidden rounded-lg">
            <img
              src={hero.slides[0]?.src ?? "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&h=350&fit=crop"}
              alt={hero.slides[0]?.alt ?? "Medical professional reviewing health criteria"}
              className="h-[250px] w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="space-y-[32px]">
            {criteria.map((group, i) => {
              const Icon = categoryIcons[group.category] || ShieldCheck;
              return (
                <div key={i} className="rounded-lg border border-border bg-card p-[24px]">
                  <div className="mb-[16px] flex items-start gap-[16px]">
                    <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-[24px] w-[24px] text-primary" />
                    </div>
                    <div>
                      <h2 className="font-heading text-lg font-bold text-foreground">{group.category}</h2>
                      <RichText value={group.description} className="mt-[4px] [&_p]:text-sm [&_p]:text-muted-foreground" />
                    </div>
                  </div>
                  <ul className="space-y-[8px] pl-[64px]">
                    {group.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-[8px]">
                        <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-destructive" />
                        <span className="font-body text-sm text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-[32px] rounded-lg bg-muted p-[24px] text-center">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Note:</span> These are standard GCC fitness criteria. Specific
              requirements may vary by destination country. Please consult our medical team for country-specific guidance.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FitnessPage;
