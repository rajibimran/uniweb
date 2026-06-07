"use client";

import { useEffect, useState } from "react";
import { Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHeroSlider from "@/components/PageHeroSlider";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { SeoHelmet } from "@/components/seo/SeoHelmet";
import { useStrapiLayout } from "@/contexts/StrapiLayoutContext";
import {
  api,
  createEmptyPageHero,
  defaultReportPageConfig,
  formatPageTitle,
  getEmptyReportPageConfig,
  IS_STRAPI_CONFIGURED,
  USE_LOCAL_MOCK_HYDRATION,
  type PageHero,
} from "@/lib/api";

const defaultReportHero: PageHero = {
  page: "reports",
  title: "Check Your Report",
  subtitle: "Enter your passport number to view your medical report.",
  slides: [
    { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=900&fit=crop", alt: "Medical report analysis" },
    { src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1600&h=900&fit=crop", alt: "Health records management" },
  ],
  ctaButtons: [
    { label: "Book Appointment", href: "/book", variant: "primary" },
    { label: "Contact", href: "/contact", variant: "secondary" },
  ],
};

const ReportCheck = () => {
  const { pathname } = useLocation();
  const { siteConfig } = useStrapiLayout();
  const siteName = siteConfig.siteName?.trim() || "Site";
  const [hero, setHero] = useState<PageHero | null>(() =>
    USE_LOCAL_MOCK_HYDRATION ? defaultReportHero : IS_STRAPI_CONFIGURED ? null : createEmptyPageHero("reports"),
  );
  const [pageConfig, setPageConfig] = useState(() =>
    USE_LOCAL_MOCK_HYDRATION ? defaultReportPageConfig : IS_STRAPI_CONFIGURED ? null : getEmptyReportPageConfig(),
  );
  const [passportNumber, setPassportNumber] = useState("");
  const [passportError, setPassportError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!IS_STRAPI_CONFIGURED) return;
    let cancelled = false;
    (async () => {
      const [h, cfg] = await Promise.all([api.hero.getByPage("reports", defaultReportHero), api.reportPage.get()]);
      if (!cancelled) {
        setHero(h);
        setPageConfig(cfg);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const validate = (): boolean => {
    const normalized = passportNumber.trim().toUpperCase().replace(/\s+/g, "");
    if (!normalized) {
      setPassportError("Passport number is required");
      return false;
    }
    if (normalized.length < 4 || normalized.length > 64) {
      setPassportError("Enter a valid passport number");
      return false;
    }
    setPassportError(undefined);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotFound(false);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }

    if (!validate()) return;

    setIsLoading(true);
    try {
      if (IS_STRAPI_CONFIGURED) {
        const res = await api.labReportFiles.reportByPassport(passportNumber);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        setPdfUrl(URL.createObjectURL(res.blob));
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 800));
      setNotFound(passportNumber.trim().toLowerCase() === "notfound");
    } catch {
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  const loading = IS_STRAPI_CONFIGURED && (hero === null || pageConfig === null);
  const supportPhone = pageConfig?.supportPhone?.trim() ?? "";

  return (
    <Layout>
      <SeoHelmet
        layers={hero?.seo ? [hero.seo] : []}
        fallbackTitle={formatPageTitle(hero?.title?.trim() || "Check Report", siteName)}
        fallbackDescription={hero?.subtitle ?? "Enter your passport number to view your medical report."}
        fallbackOgImage={hero?.slides?.[0]?.src}
        fallbackOgImageAlt={hero?.slides?.[0]?.alt}
        pathForCanonical={pathname}
        autoJsonLd={{ kind: "webpage", pageName: hero?.title?.trim() || "Check Report" }}
      />
      {loading ? (
        <section className="relative min-h-[400px] animate-pulse bg-muted" aria-busy="true" aria-label="Loading report page" />
      ) : (
        <>
          <PageHeroSlider
            images={hero?.slides ?? []}
            fallbackCtaButtons={hero?.ctaButtons}
            title={hero?.title ?? ""}
            subtitle={hero?.subtitle}
          />

          <PageBreadcrumb items={[{ label: "Report Search" }]} />

          <section className="py-[64px]">
            <div className="container flex justify-center">
              <div className="w-full max-w-3xl">
                <div className="flex items-center justify-center gap-[8px] mb-[24px]">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  <span className="font-body text-xs text-muted-foreground">Secure & Encrypted Connection</span>
                </div>

                <div className="rounded-lg border border-border bg-card p-[32px] shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
                  <h2 className="font-heading text-xl font-bold text-foreground text-center mb-[24px]">Report Portal</h2>

                  <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-[16px]">
                    <div>
                      <Label htmlFor="passportNumber" className="font-heading text-sm font-semibold text-foreground mb-[4px] block">
                        Passport Number *
                      </Label>
                      <Input
                        id="passportNumber"
                        value={passportNumber}
                        onChange={(e) => {
                          setPassportNumber(e.target.value.toUpperCase());
                          setPassportError(undefined);
                          setNotFound(false);
                          if (pdfUrl) {
                            URL.revokeObjectURL(pdfUrl);
                            setPdfUrl(null);
                          }
                        }}
                        placeholder="e.g., A12345678"
                        className={cn("h-[44px] font-body text-sm uppercase", passportError && "border-destructive")}
                        maxLength={64}
                        autoComplete="off"
                      />
                      {passportError && <p className="mt-[4px] font-body text-xs text-destructive">{passportError}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-[48px] rounded-[4px] bg-primary px-[24px] py-[12px] font-heading text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-[8px] h-4 w-4 animate-spin" />
                          Checking...
                        </>
                      ) : (
                        "Check Report"
                      )}
                    </Button>
                  </form>

                  {notFound && (
                    <div className="mx-auto mt-[24px] max-w-md flex items-start gap-[12px] rounded-lg border border-destructive/30 bg-destructive/5 p-[16px]">
                      <AlertCircle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
                      <div>
                        <p className="font-heading text-sm font-semibold text-destructive">Report Not Found</p>
                        <p className="mt-[4px] font-body text-xs text-muted-foreground">
                          No report matches that passport number. Please check the number or contact our reception for assistance.
                        </p>
                      </div>
                    </div>
                  )}

                  {pdfUrl && (
                    <div className="mt-[24px]">
                      <div className="mb-[12px] flex items-center gap-[8px]">
                        <ShieldCheck className="h-5 w-5 text-accent" />
                        <span className="font-heading text-sm font-semibold text-accent">Report found</span>
                      </div>
                      <iframe
                        title="Medical report PDF"
                        src={pdfUrl}
                        className="h-[min(75vh,720px)] w-full rounded-lg border border-border bg-muted"
                      />
                    </div>
                  )}
                </div>

                <p className="mt-[16px] text-center font-body text-xs text-muted-foreground">
                  {supportPhone ? (
                    <>
                      If you experience issues, please call <span className="font-semibold">{supportPhone}</span> or visit our reception.
                    </>
                  ) : (
                    <>If you experience issues, please visit our reception.</>
                  )}
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
};

export default ReportCheck;
