"use client";

import { useEffect, useState } from "react";
import {
  ClipboardList, UserCheck, TestTubes, Stethoscope, ScanLine, FileCheck,
  Download, ChevronDown, ChevronUp, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { SeoHelmet } from "@/components/seo/SeoHelmet";
import { RichText } from "@/components/content/RichText";
import { api, defaultScreeningProcessPageConfig, IS_STRAPI_CONFIGURED, type PageHero } from "@/lib/api";

interface ProcessStep {
  icon: React.ElementType;
  title: string;
  description: string;
  estimatedTime: string;
  details: string[];
}

const defaultProcessHero: PageHero = {
  page: "process",
  title: "Screening Process",
  subtitle: "Your step-by-step guide to the GCC medical screening journey at Unicare Medical.",
  slides: [
  { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=900&fit=crop", alt: "Medical screening process" },
  { src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1600&h=900&fit=crop", alt: "Patient consultation" },
  { src: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&h=900&fit=crop", alt: "Laboratory analysis" },
  ],
};

const ScreeningProcess = () => {
  const { pathname } = useLocation();
  const [hero, setHero] = useState<PageHero | null>(IS_STRAPI_CONFIGURED ? null : defaultProcessHero);
  const [pageConfig, setPageConfig] = useState(IS_STRAPI_CONFIGURED ? null : defaultScreeningProcessPageConfig);
  const [ready, setReady] = useState(!IS_STRAPI_CONFIGURED);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  useEffect(() => {
    if (!IS_STRAPI_CONFIGURED) return;
    let cancelled = false;
    (async () => {
      const [h, cfg] = await Promise.all([api.hero.getByPage("process", defaultProcessHero), api.screeningProcessPage.get()]);
      if (!cancelled) {
        setHero(h);
        setPageConfig(cfg);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  const processSteps: ProcessStep[] = (pageConfig?.steps ?? defaultScreeningProcessPageConfig.steps).map((step) => {
    const key = step.title.toLowerCase();
    let icon: React.ElementType = ClipboardList;
    if (key.includes("sample")) icon = TestTubes;
    else if (key.includes("physical")) icon = Stethoscope;
    else if (key.includes("imaging") || key.includes("diagnostic")) icon = ScanLine;
    else if (key.includes("consultation") || key.includes("review")) icon = UserCheck;
    else if (key.includes("report")) icon = FileCheck;
    return { ...step, icon };
  });

  return (
    <Layout>
      <SeoHelmet
        layers={hero?.seo ? [hero.seo, pageConfig?.seo] : pageConfig?.seo ? [pageConfig.seo] : []}
        fallbackTitle={`${hero?.title ?? "Screening Process"} — Unicare Medical, Dhaka`}
        fallbackDescription={hero?.subtitle ?? "Your step-by-step guide to the GCC medical screening journey at Unicare Medical."}
        pathForCanonical={pathname}
      />
      {!ready ? <section className="relative min-h-[400px] animate-pulse bg-muted" aria-busy="true" aria-label="Loading process page" /> : null}
      <PageHeroSlider
        images={hero?.slides ?? defaultProcessHero.slides}
        title={hero?.title ?? defaultProcessHero.title}
        subtitle={hero?.subtitle ?? defaultProcessHero.subtitle}
      />

      <PageBreadcrumb items={[{ label: "Screening Process" }]} />

      <section className="py-[48px]">
        <div className="container max-w-3xl">
          {/* Download Checklist */}
          <div className="mb-[48px] rounded-lg border border-border bg-card p-[24px] flex flex-col sm:flex-row items-center justify-between gap-[16px]">
            <div className="flex items-center gap-[16px]">
              <img
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=120&h=120&fit=crop"
                alt="Preparation checklist"
                className="h-[80px] w-[80px] rounded-lg object-cover hidden sm:block"
                loading="lazy"
              />
              <div>
                <h2 className="font-heading text-lg font-bold text-foreground">{pageConfig?.checklistTitle ?? defaultScreeningProcessPageConfig.checklistTitle}</h2>
                <RichText
                  value={pageConfig?.checklistDescription ?? defaultScreeningProcessPageConfig.checklistDescription}
                  className="mt-[4px] [&_p]:text-sm [&_p]:text-muted-foreground"
                />
              </div>
            </div>
            <Button className="h-[48px] min-w-[220px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-sm font-semibold text-accent-foreground hover:bg-accent/90 shrink-0">
              <Download className="mr-[8px] h-5 w-5" />
              Download Checklist
            </Button>
          </div>

          {/* Total Time */}
          <div className="flex items-center justify-center gap-[8px] mb-[32px]">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-heading text-sm font-semibold text-foreground">
              {pageConfig?.totalTimeLabel ?? defaultScreeningProcessPageConfig.totalTimeLabel}
            </span>
          </div>

          {/* Timeline */}
          <div className="relative">
            {processSteps.map((step, i) => {
              const isExpanded = expandedStep === i;
              const Icon = step.icon;
              const isLast = i === processSteps.length - 1;

              return (
                <div key={i} className="relative flex gap-[24px]">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => toggleStep(i)}
                      className={cn(
                        "relative z-10 flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        isExpanded
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-primary/40"
                      )}
                      aria-label={`Step ${i + 1}: ${step.title}`}
                    >
                      <Icon className="h-[20px] w-[20px]" />
                    </button>
                    {!isLast && (
                      <div className="w-[2px] flex-1 bg-border min-h-[24px]" />
                    )}
                  </div>

                  <div className={cn("pb-[32px] flex-1", isLast && "pb-0")}>
                    <button
                      onClick={() => toggleStep(i)}
                      className="w-full text-left flex items-start justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-[8px]">
                          <span className="font-heading text-xs font-semibold text-primary">Step {i + 1}</span>
                          <span className="inline-flex items-center gap-[4px] rounded bg-muted px-[8px] py-[2px] font-body text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {step.estimatedTime}
                          </span>
                        </div>
                        <h3 className="mt-[4px] font-heading text-lg font-semibold text-foreground">{step.title}</h3>
                        <RichText value={step.description} className="mt-[4px] [&_p]:text-sm [&_p]:text-muted-foreground" />
                      </div>
                      <div className="ml-[8px] mt-[4px] shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="mt-[16px] rounded-lg border border-border bg-muted/50 p-[16px]">
                        <ul className="space-y-[8px]">
                          {step.details.map((detail, j) => (
                            <li key={j} className="flex items-start gap-[8px]">
                              <div className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-primary" />
                              <span className="font-body text-sm text-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ScreeningProcess;
