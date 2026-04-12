/**
 * API Service Layer — Strapi Integration Ready
 *
 * Currently returns mock data from @/data/mockData and @/data/newsData.
 * To integrate Strapi:
 *   1. Set VITE_STRAPI_URL in your .env file
 *   2. Create matching content types in Strapi
 *   3. The mock fallbacks auto-disable once Strapi is connected
 *
 * Usage:
 *   const articles = await api.blog.getAll();
 *   const news = await api.news.getAll();
 *   const service = await api.services.getBySlug("physical-examination");
 *   const siteConfig = await api.siteConfig.get();
 */

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || "";

interface StrapiResponse<T> {
  data: T;
  meta?: { pagination?: { page: number; pageSize: number; pageCount: number; total: number } };
}

async function strapiGet<T>(endpoint: string, fallback: T): Promise<T> {
  if (!STRAPI_BASE_URL) return fallback;

  try {
    const res = await fetch(`${STRAPI_BASE_URL}/api/${endpoint}`);
    if (!res.ok) throw new Error(`Strapi ${res.status}`);
    const json: StrapiResponse<T> = await res.json();
    return json.data;
  } catch (err) {
    console.warn(`[api] Strapi unavailable, using mock data for ${endpoint}`, err);
    return fallback;
  }
}

// ── Site Config (Global settings: logo, site name, contact info, etc.) ──
export interface SiteConfig {
  siteName: string;
  tagline: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  googleMapsEmbed: string;
  socialLinks: { facebook?: string; instagram?: string; linkedin?: string };
}

const defaultSiteConfig: SiteConfig = {
  siteName: "Unicare Medical Services",
  tagline: "GCC Approved Medical Center",
  logo: "https://unicaremedicalbd.co/assets/img/logo_unicare.png",
  phone: "+88 02 48316027",
  email: "unicaremedicalbd@gmail.com",
  address: "13/1, New Eskaton Road (2nd Floor), Moghbazar, Dhaka",
  workingHours: "Sat–Thu: 8:00 AM – 8:00 PM",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0!2d90.4!3d23.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzAwLjAiTiA5MMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sbd!4v1",
  socialLinks: { facebook: "https://facebook.com", instagram: "https://instagram.com", linkedin: "https://linkedin.com" },
};

export const siteConfigApi = {
  get: () => strapiGet<SiteConfig>("site-config?populate=*", defaultSiteConfig),
};

// ── Navigation ──
import type { NavItem } from "@/data/mockData";
import { navItems as defaultNavItems } from "@/data/mockData";

export const navigationApi = {
  getAll: () => strapiGet<NavItem[]>("navigation?populate=deep", defaultNavItems),
};

// ── Hero Sections ──
export interface HeroSlide {
  src: string;
  alt: string;
}

export interface PageHero {
  page: string;
  title: string;
  subtitle: string;
  slides: HeroSlide[];
  ctaButtons?: { label: string; href: string; variant: "primary" | "secondary" }[];
}

export const heroApi = {
  getByPage: (page: string, fallback: PageHero) =>
    strapiGet<PageHero>(`heroes?filters[page][$eq]=${page}&populate=*`, fallback),
};

// ── Services ──
import type { ServiceCard, ServiceDetail } from "@/data/mockData";
import { services as defaultServices, serviceDetails as defaultServiceDetails } from "@/data/mockData";

export const servicesApi = {
  getAll: () => strapiGet<ServiceCard[]>("services?populate=*", defaultServices),
  getBySlug: (slug: string) =>
    strapiGet<ServiceDetail | undefined>(
      `services?filters[slug][$eq]=${slug}&populate=deep`,
      defaultServiceDetails[slug]
    ),
};

// ── Blog ──
export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  content?: string;
}

export const blogApi = {
  getAll: (mockData: BlogArticle[]) =>
    strapiGet<BlogArticle[]>("articles?populate=*&sort=date:desc", mockData),
  getBySlug: (slug: string, mockData: BlogArticle[]) =>
    strapiGet<BlogArticle | undefined>(
      `articles?filters[slug][$eq]=${slug}&populate=*`,
      mockData.find((a) => a.slug === slug)
    ),
};

// ── News ──
export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  content?: string;
}

export const newsApi = {
  getAll: (mockData: NewsPost[]) =>
    strapiGet<NewsPost[]>("news-posts?populate=*&sort=date:desc", mockData),
  getBySlug: (slug: string, mockData: NewsPost[]) =>
    strapiGet<NewsPost | undefined>(
      `news-posts?filters[slug][$eq]=${slug}&populate=*`,
      mockData.find((n) => n.slug === slug)
    ),
};

// ── Country Guidelines ──
export interface CountryGuideline {
  id: string;
  name: string;
  flag: string;
  processingTime: string;
  approvalNote: string;
  expertTip: string;
  mandatoryTests: string;
  rejectionCriteria: string;
  specialRules: string;
  visaCategories: string;
}

export const countryGuidelinesApi = {
  getAll: (mockData: CountryGuideline[]) =>
    strapiGet<CountryGuideline[]>("country-guidelines?populate=*", mockData),
};

// ── GCC Countries ──
export interface GCCCountry {
  name: string;
  flag: string;
}

export const gccCountriesApi = {
  getAll: (mockData: GCCCountry[]) =>
    strapiGet<GCCCountry[]>("gcc-countries?populate=*", mockData),
};

// ── Equipment ──
import type { EquipmentItem } from "@/data/mockData";
import { equipmentList as defaultEquipment } from "@/data/mockData";

export const equipmentApi = {
  getAll: () => strapiGet<EquipmentItem[]>("equipment-items?populate=*", defaultEquipment),
};

// ── Fitness Criteria ──
import type { FitnessCriteria } from "@/data/mockData";
import { fitnessCriteria as defaultFitnessCriteria } from "@/data/mockData";

export const fitnessCriteriaApi = {
  getAll: () => strapiGet<FitnessCriteria[]>("fitness-criteria?populate=*", defaultFitnessCriteria),
};

// ── Stats ──
import type { StatItem } from "@/data/mockData";
import { stats as defaultStats } from "@/data/mockData";

export const statsApi = {
  getAll: () => strapiGet<StatItem[]>("stats?populate=*", defaultStats),
};

// ── Testimonials ──
import type { Testimonial } from "@/data/mockData";
import { testimonials as defaultTestimonials } from "@/data/mockData";

export const testimonialsApi = {
  getAll: () => strapiGet<Testimonial[]>("testimonials?populate=*", defaultTestimonials),
};

// ── Service Packages ──
import type { ServicePackage } from "@/data/mockData";
import { servicePackages as defaultPackages } from "@/data/mockData";

export const servicePackagesApi = {
  getAll: () => strapiGet<ServicePackage[]>("service-packages?populate=*", defaultPackages),
};

// ── FAQs ──
import type { FAQItem } from "@/data/mockData";
import { serviceFAQs as defaultFAQs } from "@/data/mockData";

export const faqsApi = {
  getAll: () => strapiGet<FAQItem[]>("faqs?populate=*", defaultFAQs),
};

// ── Certifications ──
import { certificationLogos as defaultCerts } from "@/data/mockData";

export const certificationsApi = {
  getAll: () => strapiGet<string[]>("certifications?populate=*", defaultCerts),
};

// ── Footer Links ──
import type { FooterLink } from "@/data/mockData";
import { footerQuickLinks as defaultQuickLinks, footerServices as defaultFooterServices } from "@/data/mockData";

export const footerApi = {
  getQuickLinks: () => strapiGet<FooterLink[]>("footer-quick-links?populate=*", defaultQuickLinks),
  getServiceLinks: () => strapiGet<FooterLink[]>("footer-service-links?populate=*", defaultFooterServices),
};

// ── Gallery ──
import { facilityImages as defaultGallery } from "@/data/mockData";

export const galleryApi = {
  getAll: () => strapiGet<{ src: string; alt: string }[]>("gallery-images?populate=*", defaultGallery),
};

// ── About Page Content ──
export interface AboutPageContent {
  missionTitle: string;
  missionText: string;
  missionImage: string;
  centerTitle: string;
  centerText: string;
  centerImage: string;
  values: { img: string; alt: string; title: string; desc: string }[];
}

export const aboutApi = {
  get: (fallback: AboutPageContent) =>
    strapiGet<AboutPageContent>("about-page?populate=deep", fallback),
};

// ── Unified API ───────────────────────────────────
export const api = {
  siteConfig: siteConfigApi,
  navigation: navigationApi,
  hero: heroApi,
  services: servicesApi,
  blog: blogApi,
  news: newsApi,
  countryGuidelines: countryGuidelinesApi,
  gccCountries: gccCountriesApi,
  equipment: equipmentApi,
  fitnessCriteria: fitnessCriteriaApi,
  stats: statsApi,
  testimonials: testimonialsApi,
  servicePackages: servicePackagesApi,
  faqs: faqsApi,
  certifications: certificationsApi,
  footer: footerApi,
  gallery: galleryApi,
  about: aboutApi,
};
