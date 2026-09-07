import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSeoRoutes, getSeoRoute } from "@/lib/seo-routes";

export const revalidate = 3600; // revalidate every hour

export async function generateStaticParams() {
  const routes = await getSeoRoutes();
  return routes.map((route) => ({
    slug: route.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await params;
  const route = await getSeoRoute(p.slug);

  if (!route) {
    return {
      title: "Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.webjothishanalyst.site';
  const canonicalUrl = route.canonicalUrl || `${baseUrl}/${route.slug}`;

  return {
    title: route.seoTitle,
    description: route.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: route.index,
      follow: route.index,
    },
    openGraph: {
      title: route.seoTitle,
      description: route.metaDescription,
      url: canonicalUrl,
    },
    twitter: {
      title: route.seoTitle,
      description: route.metaDescription,
    }
  };
}

export default async function DynamicPortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const route = await getSeoRoute(p.slug);

  if (!route) {
    notFound();
  }

  return null;
}
