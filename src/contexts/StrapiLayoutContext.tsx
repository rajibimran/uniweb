import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { FooterLink, NavItem } from "@/data/mockData";
import {
  certificationBadges as defaultCerts,
  footerQuickLinks as defaultQuickLinks,
  footerServices as defaultFooterServices,
  navItems as defaultNavItems,
} from "@/data/mockData";
import { api, defaultSiteConfig, IS_STRAPI_CONFIGURED, type CertificationBadge, type SiteConfig } from "@/lib/api";

export interface StrapiLayoutValue {
  layoutReady: boolean;
  siteConfig: SiteConfig;
  navItems: NavItem[];
  footerQuickLinks: FooterLink[];
  footerServiceLinks: FooterLink[];
  certifications: CertificationBadge[];
}

const StrapiLayoutContext = createContext<StrapiLayoutValue | null>(null);

export function StrapiLayoutProvider({ children }: { children: ReactNode }) {
  const [layoutReady, setLayoutReady] = useState(!IS_STRAPI_CONFIGURED);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [navItems, setNavItems] = useState<NavItem[]>(defaultNavItems);
  const [footerQuickLinks, setFooterQuickLinks] = useState<FooterLink[]>(defaultQuickLinks);
  const [footerServiceLinks, setFooterServiceLinks] = useState<FooterLink[]>(defaultFooterServices);
  const [certifications, setCertifications] = useState<CertificationBadge[]>(defaultCerts);

  useEffect(() => {
    if (!IS_STRAPI_CONFIGURED) return;
    let cancelled = false;
    (async () => {
      try {
        const [sc, nav, fq, fs, certs] = await Promise.all([
          api.siteConfig.get(),
          api.navigation.getAll(),
          api.footer.getQuickLinks(),
          api.footer.getServiceLinks(),
          api.certifications.getAll(),
        ]);
        if (!cancelled) {
          setSiteConfig(sc);
          setNavItems(nav);
          setFooterQuickLinks(fq);
          setFooterServiceLinks(fs);
          setCertifications(certs);
        }
      } finally {
        if (!cancelled) setLayoutReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      layoutReady,
      siteConfig,
      navItems,
      footerQuickLinks,
      footerServiceLinks,
      certifications,
    }),
    [layoutReady, siteConfig, navItems, footerQuickLinks, footerServiceLinks, certifications]
  );

  return <StrapiLayoutContext.Provider value={value}>{children}</StrapiLayoutContext.Provider>;
}

export function useStrapiLayout(): StrapiLayoutValue {
  const ctx = useContext(StrapiLayoutContext);
  if (!ctx) {
    throw new Error("useStrapiLayout must be used within StrapiLayoutProvider");
  }
  return ctx;
}
