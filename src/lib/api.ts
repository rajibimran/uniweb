/**
 * API Service Layer — Strapi Integration Ready
 *
 * Currently returns mock data from @/data/mockData.
 * To integrate Strapi, update STRAPI_BASE_URL and replace
 * the mock fallbacks with fetch calls.
 *
 * Usage:
 *   const articles = await api.blog.getAll();
 *   const news = await api.news.getAll();
 *   const service = await api.services.getBySlug("physical-examination");
 */

// TODO: Replace with your Strapi instance URL
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

// ── Blog ──────────────────────────────────────────
import type { BlogArticle } from "@/pages/Blog";

export const blogApi = {
  getAll: (mockData: BlogArticle[]) => strapiGet<BlogArticle[]>("articles?populate=*&sort=date:desc", mockData),
  getBySlug: (slug: string, mockData: BlogArticle[]) =>
    strapiGet<BlogArticle | undefined>(`articles?filters[slug][$eq]=${slug}&populate=*`, mockData.find((a) => a.slug === slug)),
};

// ── News ──────────────────────────────────────────
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
  getAll: (mockData: NewsPost[]) => strapiGet<NewsPost[]>("news-posts?populate=*&sort=date:desc", mockData),
  getBySlug: (slug: string, mockData: NewsPost[]) =>
    strapiGet<NewsPost | undefined>(`news-posts?filters[slug][$eq]=${slug}&populate=*`, mockData.find((n) => n.slug === slug)),
};

// ── Services ──────────────────────────────────────
import type { ServiceCard, ServiceDetail } from "@/data/mockData";

export const servicesApi = {
  getAll: (mockData: ServiceCard[]) => strapiGet<ServiceCard[]>("services?populate=*", mockData),
  getBySlug: (slug: string, mockData: Record<string, ServiceDetail>) =>
    strapiGet<ServiceDetail | undefined>(`services?filters[slug][$eq]=${slug}&populate=*`, mockData[slug]),
};

// ── Unified API ───────────────────────────────────
export const api = { blog: blogApi, news: newsApi, services: servicesApi };
