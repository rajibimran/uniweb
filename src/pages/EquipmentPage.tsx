import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { SeoHelmet } from "@/components/seo/SeoHelmet";
import { equipmentList as defaultEquipmentList, type EquipmentItem } from "@/data/mockData";
import { api, IS_STRAPI_CONFIGURED, type PageHero } from "@/lib/api";

const defaultEquipmentHero: PageHero = {
  page: "equipment",
  title: "Medical Equipment",
  subtitle: "State-of-the-art medical equipment ensuring precision, speed, and reliability in diagnostics.",
  slides: [
    { src: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1600&h=900&fit=crop", alt: "Advanced laboratory equipment" },
    { src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1600&h=900&fit=crop", alt: "Medical diagnostic devices" },
    { src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1600&h=900&fit=crop", alt: "Digital imaging equipment" },
  ],
};

const EquipmentPage = () => {
  const { pathname } = useLocation();
  const [equipment, setEquipment] = useState<EquipmentItem[] | null>(IS_STRAPI_CONFIGURED ? null : defaultEquipmentList);
  const [hero, setHero] = useState<PageHero | null>(IS_STRAPI_CONFIGURED ? null : defaultEquipmentHero);
  const [ready, setReady] = useState(!IS_STRAPI_CONFIGURED);

  useEffect(() => {
    if (!IS_STRAPI_CONFIGURED) return;
    let cancelled = false;
    (async () => {
      const [eq, h] = await Promise.all([api.equipment.getAll(), api.hero.getByPage("equipment", defaultEquipmentHero)]);
      if (!cancelled) {
        setEquipment(eq);
        setHero(h);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready || !equipment || !hero) {
    return (
      <Layout>
        <SeoHelmet
          layers={hero?.seo ? [hero.seo] : []}
          fallbackTitle="Medical Equipment — Unicare Medical, Dhaka"
          fallbackDescription={hero?.subtitle ?? defaultEquipmentHero.subtitle}
          pathForCanonical={pathname}
        />
        <section className="relative min-h-[400px] animate-pulse bg-muted" aria-busy="true" aria-label="Loading equipment page" />
        <PageBreadcrumb items={[{ label: "Medical Equipment" }]} />
        <div className="container space-y-6 py-[48px]">
          <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-56 animate-pulse rounded-lg border border-border bg-muted" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  const cardItems = equipment.filter((e) => e.image || (e.origin && e.status));
  const cardsToShow = cardItems.length ? cardItems : equipment.slice(0, 4);

  return (
    <Layout>
      <SeoHelmet
        layers={[hero.seo]}
        fallbackTitle="Medical Equipment — Unicare Medical, Dhaka"
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

      <PageBreadcrumb items={[{ label: "Medical Equipment" }]} />

      <section className="py-[48px]">
        <div className="container">
          <div className="mb-[32px] text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground">Key Diagnostic Equipment</h2>
          </div>
          <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-4">
            {cardsToShow.map((eq) => (
              <div key={eq.slNo} className="overflow-hidden rounded-lg border border-border bg-card">
                {eq.image ? (
                  <img
                    src={eq.image}
                    alt={eq.name.split(",")[0]}
                    className="h-[160px] w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-[160px] w-full items-center justify-center bg-muted">
                    <Wrench className="h-10 w-10 text-muted-foreground/40" aria-hidden />
                  </div>
                )}
                <div className="p-[24px]">
                  <h3 className="font-heading text-base font-semibold text-foreground">{eq.name.split(",")[0]}</h3>
                  <p className="mt-[4px] font-body text-xs text-muted-foreground">{eq.model}</p>
                  <div className="mt-[16px] flex items-center justify-between">
                    {eq.origin ? <span className="font-body text-xs text-muted-foreground">Origin: {eq.origin}</span> : <span />}
                    {eq.status ? (
                      <span className="rounded bg-accent/10 px-[8px] py-[2px] font-heading text-xs font-semibold text-accent">
                        {eq.status}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-[48px]">
        <div className="container">
          <div className="mb-[32px] text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground">Complete Equipment List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse overflow-hidden rounded-lg bg-card">
              <thead>
                <tr className="border-b border-border">
                  <th className="w-[60px] p-[16px] text-left font-heading text-sm font-semibold text-foreground">Sl.</th>
                  <th className="p-[16px] text-left font-heading text-sm font-semibold text-foreground">Equipment Name</th>
                  <th className="p-[16px] text-left font-heading text-sm font-semibold text-foreground">Model</th>
                  <th className="w-[80px] p-[16px] text-center font-heading text-sm font-semibold text-foreground">Qty</th>
                </tr>
              </thead>
              <tbody>
                {equipment.map((eq, i) => (
                  <tr key={eq.slNo} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                    <td className="p-[16px] font-body text-sm text-foreground">{eq.slNo}</td>
                    <td className="p-[16px] font-body text-sm text-foreground">{eq.name}</td>
                    <td className="p-[16px] font-body text-sm text-muted-foreground">{eq.model}</td>
                    <td className="p-[16px] text-center font-body text-sm text-foreground">{eq.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EquipmentPage;
