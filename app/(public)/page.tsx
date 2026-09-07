import { Metadata } from "next";
import { getSeoRoute } from "@/lib/seo-routes";

export async function generateMetadata(): Promise<Metadata> {
  const route = await getSeoRoute("home");

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.webjothishanalyst.site';
  const canonicalUrl = `${baseUrl}/`;

  const title = route?.seoTitle || "Home | Jothish Gandham";
  const description = route?.metaDescription || "Welcome to the cybersecurity portfolio of Jothish Gandham.";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
    },
    twitter: {
      title,
      description,
    }
  };
}

export default function Home() {
  return null;
}