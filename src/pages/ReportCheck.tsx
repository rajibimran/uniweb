"use client";

import { useEffect, useState } from "react";
import { Loader2, FileDown, ShieldCheck, AlertCircle } from "lucide-react";
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
  subtitle: "Enter your Patient ID and registered phone number to access your medical report.",
  slides: [
  { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=900&fit=crop", alt: "Medical report analysis" },
  { src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1600&h=900&fit=crop", alt: "Health records management" },
  ],
  ctaButtons: [
    { label: "Book Appointment", href: "/book", variant: "primary" },
    { label: "Contact", href: "/contact", variant: "secondary" },
  ],
};

interface ReportResult {
  patientName: string;
  reportDate: string;
  status: string;
  reportId: string;
}

const ReportCheck = () => {
  const { pathname } = useLocation();
  const { siteConfig } = useStrapiLayout();
  const siteName = siteConfig.siteName?.trim() || "Site";
  const [hero, setHero] = useState<PageHero | null>(() =>
    USE_LOCAL_MOCK_HYDRATION ? defaultReportHero : IS_STRAPI_CONFIGURED ? null : createEmptyPageHero("reports")
  );
  const [pageConfig, setPageConfig] = useState(() =>
    USE_LOCAL_MOCK_HYDRATION ? defaultReportPageConfig : IS_STRAPI_CONFIGURED ? null : getEmptyReportPageConfig()
  );
  const [patientId, setPatientId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<{ patientId?: string; phone?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<ReportResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  /** Strapi: PDF was found and download triggered. */
  const [portalDownloadStarted, setPortalDownloadStarted] = useState(false);

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

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    const trimmedId = patientId.trim();
    const phoneDigits = phoneNumber.replace(/\D/g, "");

    if (!trimmedId) newErrors.patientId = "Patient ID is required";
    else if (trimmedId.length < 4 || trimmedId.length > 20) newErrors.patientId = "Enter a valid Patient ID";

    if (!phoneDigits) newErrors.phone = "Phone number is required";
    else if (phoneDigits.length < 10) newErrors.phone = "Enter a valid phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReport(null);
    setNotFound(false);
    setPortalDownloadStarted(false);

    if (!validate()) return;

    setIsLoading(true);
    try {
      if (IS_STRAPI_CONFIGURED) {
        const res = await api.labReportFiles.download(patientId, phoneNumber);
        if (!res.ok) {
          // Same message for wrong credentials, missing file, or server errors (no leaking details).
          setNotFound(true);
          return;
        }
        const url = URL.createObjectURL(res.blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = res.filename || `report-${patientId.trim().replace(/\W/g, "_")}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setPortalDownloadStarted(true);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (patientId.trim().toLowerCase() === "notfound") {
        setNotFound(true);
      } else {
        const demo = pageConfig ?? (USE_LOCAL_MOCK_HYDRATION ? defaultReportPageConfig : getEmptyReportPageConfig());
        setReport({
          patientName: demo.samplePatientName,
          reportDate: demo.sampleReportDate,
          status: demo.sampleStatus,
          reportId: `RPT-${patientId.trim().toUpperCase()}-2026`,
        });
      }
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
        fallbackDescription={hero?.subtitle ?? "Enter your Patient ID and registered phone number to access your medical report."}
        pathForCanonical={pathname}
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
          <div className="w-full max-w-md">
            <div className="flex items-center justify-center gap-[8px] mb-[24px]">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <span className="font-body text-xs text-muted-foreground">Secure & Encrypted Connection</span>
            </div>

            <div className="rounded-lg border border-border bg-card p-[32px] shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
              <h2 className="font-heading text-xl font-bold text-foreground text-center mb-[24px]">
                Report Portal
              </h2>

              <form onSubmit={handleSubmit} className="space-y-[16px]">
                <div>
                  <Label htmlFor="patientId" className="font-heading text-sm font-semibold text-foreground mb-[4px] block">
                    Patient ID or Passport Number *
                  </Label>
                  <Input
                    id="patientId"
                    value={patientId}
                    onChange={(e) => {
                      setPatientId(e.target.value);
                      setErrors((p) => ({ ...p, patientId: undefined }));
                      setNotFound(false);
                      setPortalDownloadStarted(false);
                    }}
                    placeholder="e.g., BGD-AO-02001"
                    className={cn("h-[44px] font-body text-sm", errors.patientId && "border-destructive")}
                    maxLength={20}
                  />
                  {errors.patientId && <p className="mt-[4px] font-body text-xs text-destructive">{errors.patientId}</p>}
                </div>

                <div>
                  <Label htmlFor="reportPhone" className="font-heading text-sm font-semibold text-foreground mb-[4px] block">
                    Registered Phone Number *
                  </Label>
                  <Input
                    id="reportPhone"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(formatPhone(e.target.value));
                      setErrors((p) => ({ ...p, phone: undefined }));
                      setNotFound(false);
                      setPortalDownloadStarted(false);
                    }}
                    placeholder="01XX-XXX-XXXX"
                    className={cn("h-[44px] font-body text-sm", errors.phone && "border-destructive")}
                  />
                  {errors.phone && <p className="mt-[4px] font-body text-xs text-destructive">{errors.phone}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-[48px] rounded-[4px] bg-primary px-[24px] py-[12px] font-heading text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-[8px] h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Check Report"
                  )}
                </Button>
              </form>

              {notFound && (
                <div className="mt-[24px] flex items-start gap-[12px] rounded-lg border border-destructive/30 bg-destructive/5 p-[16px]">
                  <AlertCircle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
                  <div>
                    <p className="font-heading text-sm font-semibold text-destructive">Report Not Found</p>
                    <p className="mt-[4px] font-body text-xs text-muted-foreground">
                      Please check your Patient ID and phone number, or contact our reception for assistance.
                    </p>
                  </div>
                </div>
              )}

              {portalDownloadStarted && (
                <div className="mt-[24px] rounded-lg border border-accent/30 bg-accent/5 p-[24px]">
                  <div className="flex items-center gap-[8px] mb-[12px]">
                    <ShieldCheck className="h-5 w-5 text-accent" />
                    <span className="font-heading text-sm font-semibold text-accent">Report found</span>
                  </div>
                  <p className="font-body text-sm text-foreground mb-[12px]">
                    Your PDF download should start automatically. If it did not, check your browser&apos;s download bar
                    or permissions.
                  </p>
                  <div className="flex items-center gap-[8px] font-body text-xs text-muted-foreground">
                    <FileDown className="h-4 w-4 shrink-0" />
                    <span>Use the same passport / patient ID and phone you entered if you need to download again.</span>
                  </div>
                </div>
              )}

              {report && (
                <div className="mt-[24px] rounded-lg border border-accent/30 bg-accent/5 p-[24px]">
                  <div className="flex items-center gap-[8px] mb-[16px]">
                    <ShieldCheck className="h-5 w-5 text-accent" />
                    <span className="font-heading text-sm font-semibold text-accent">Report Found</span>
                  </div>
                  <div className="space-y-[8px] mb-[16px]">
                    <p className="font-body text-sm text-foreground">
                      <span className="font-semibold">Patient:</span> {report.patientName}
                    </p>
                    <p className="font-body text-sm text-foreground">
                      <span className="font-semibold">Report ID:</span> {report.reportId}
                    </p>
                    <p className="font-body text-sm text-foreground">
                      <span className="font-semibold">Date:</span> {report.reportDate}
                    </p>
                    <p className="font-body text-sm text-foreground">
                      <span className="font-semibold">Status:</span>{" "}
                      <span className="text-accent font-semibold">{report.status}</span>
                    </p>
                  </div>
                  <Button className="w-full h-[48px] rounded-[4px] bg-accent px-[24px] py-[12px] font-heading text-sm font-semibold text-accent-foreground hover:bg-accent/90">
                    <FileDown className="mr-[8px] h-5 w-5" />
                    Download PDF Report
                  </Button>
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
