import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { SeoHelmet } from "@/components/seo/SeoHelmet";
import { api, defaultPrivacyPageConfig, IS_STRAPI_CONFIGURED } from "@/lib/api";

const Privacy = () => {
  const { pathname } = useLocation();
  const [pageConfig, setPageConfig] = useState(IS_STRAPI_CONFIGURED ? null : defaultPrivacyPageConfig);

  useEffect(() => {
    if (!IS_STRAPI_CONFIGURED) return;
    let cancelled = false;
    (async () => {
      const cfg = await api.privacyPage.get();
      if (!cancelled) setPageConfig(cfg);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Layout>
      <SeoHelmet
        layers={pageConfig?.seo ? [pageConfig.seo] : []}
        fallbackTitle={`${pageConfig?.title ?? "Privacy Policy"} — Unicare Medical, Dhaka`}
        fallbackDescription="How Unicare Medical Services collects, uses, and protects your personal and medical information."
        pathForCanonical={pathname}
      />
      <div className="bg-primary py-[48px]">
        <div className="container text-center">
          <h1 className="font-heading text-3xl font-extrabold text-primary-foreground sm:text-4xl">{pageConfig?.title ?? "Privacy Policy"}</h1>
        </div>
      </div>
      <PageBreadcrumb items={[{ label: "Privacy Policy" }]} />
      <section className="py-[48px]">
        <div className="container max-w-3xl prose prose-sm">
          <div className="space-y-[24px] font-body text-sm text-muted-foreground leading-relaxed">
            <p>At Unicare Medical Services, we are committed to protecting the privacy and confidentiality of your personal and medical information.</p>
            {(pageConfig?.sections ?? defaultPrivacyPageConfig.sections).map((section) => (
              <div key={section.heading}>
                <h2 className="font-heading text-lg font-bold text-foreground">{section.heading}</h2>
                <p>{section.body}</p>
              </div>
            ))}
            <h2 className="font-heading text-lg font-bold text-foreground">Contact</h2>
            <p>For privacy-related inquiries, contact us at <a href="mailto:unicaremedicalbd@gmail.com" className="text-primary hover:underline">unicaremedicalbd@gmail.com</a>.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
