import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/layout/PageBreadcrumb";
import { SeoHelmet } from "@/components/seo/SeoHelmet";
import { RichText } from "@/components/content/RichText";
import { PostCommentsSection } from "@/components/comments/PostCommentsSection";
import { newsPosts as defaultNewsPosts } from "@/data/newsData";
import { useStrapiLayout } from "@/contexts/StrapiLayoutContext";
import { api, formatPageTitle, IS_STRAPI_CONFIGURED, USE_LOCAL_MOCK_HYDRATION, type NewsPost } from "@/lib/api";

const NewsPostPage = () => {
  const { pathname } = useLocation();
  const { siteConfig } = useStrapiLayout();
  const siteName = siteConfig.siteName?.trim() || "Site";
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<NewsPost | null | undefined>(() => {
    if (!slug) return null;
    if (USE_LOCAL_MOCK_HYDRATION) return defaultNewsPosts.find((p) => p.slug === slug) ?? null;
    if (!IS_STRAPI_CONFIGURED) return null;
    return undefined;
  });

  useEffect(() => {
    if (!slug) return;
    if (!IS_STRAPI_CONFIGURED) {
      setPost(USE_LOCAL_MOCK_HYDRATION ? (defaultNewsPosts.find((p) => p.slug === slug) ?? null) : null);
      return;
    }
    let cancelled = false;
    (async () => {
      const row = await api.news.getBySlug(slug, defaultNewsPosts);
      if (!cancelled) setPost(row ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (IS_STRAPI_CONFIGURED && post === undefined) {
    return (
      <Layout>
        <section className="min-h-[420px] animate-pulse bg-muted" aria-busy="true" aria-label="Loading news post" />
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <SeoHelmet layers={[]} fallbackTitle={formatPageTitle("News post not found", siteName)} pathForCanonical={pathname} />
        <div className="container py-[64px] text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground">News Post Not Found</h1>
          <p className="mt-[8px] font-body text-base text-muted-foreground">The news item you requested could not be found.</p>
          <Link to="/news" className="mt-[24px] inline-block font-heading text-sm font-semibold text-primary">
            Back to News
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SeoHelmet
        layers={[post.seo]}
        fallbackTitle={formatPageTitle(post.title, siteName)}
        fallbackDescription={post.excerpt}
        pathForCanonical={pathname}
      />
      <PageBreadcrumb items={[{ label: "News", href: "/news" }, { label: post.title }]} />
      <article className="py-[48px]">
        <div className="container max-w-4xl">
          <img src={post.image} alt={post.title} className="h-[360px] w-full rounded-lg object-cover" loading="eager" />
          <div className="mt-[20px] flex flex-wrap items-center gap-[12px]">
            {post.category ? (
              <span className="rounded bg-primary/10 px-[8px] py-[4px] font-heading text-xs font-semibold text-primary">
                {post.category}
              </span>
            ) : null}
            <span className="flex items-center gap-[4px] font-body text-xs text-muted-foreground">
              <CalendarDays className="h-3 w-3" />
              {post.date}
            </span>
            {post.readMinutes != null ? (
              <span className="font-body text-xs text-muted-foreground">{post.readMinutes} min read</span>
            ) : null}
          </div>
          {post.author ? (
            <div className="mt-[12px] flex items-center gap-[12px]">
              {post.author.avatarUrl ? (
                <img src={post.author.avatarUrl} alt="" className="h-10 w-10 rounded-full object-cover" loading="lazy" />
              ) : null}
              <p className="font-body text-sm text-muted-foreground">
                By <span className="font-medium text-foreground">{post.author.name}</span>
              </p>
            </div>
          ) : null}
          <h1 className="mt-[12px] font-heading text-3xl font-bold text-foreground">{post.title}</h1>
          <div className="mt-[16px]">
            <RichText value={post.content?.trim() ? post.content : post.excerpt} />
          </div>
          <PostCommentsSection postType="news-post" slug={post.slug} commentsOpen={post.commentsOpen !== false} />
        </div>
      </article>
    </Layout>
  );
};

export default NewsPostPage;
