import { MetadataRoute } from 'next';
import { projects } from '@/lib/projects/projectData';
import { googleSpecializations } from '@/components/sections/about/data';
import { getSeoRoutes } from '@/lib/seo-routes';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.webjothishanalyst.site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seoRoutes = await getSeoRoutes();
  
  const dynamicPages: MetadataRoute.Sitemap = seoRoutes
    .filter(route => route.index)
    .map(route => ({
      url: `${SITE_URL}/${route.slug === 'home' ? '' : route.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: route.slug === 'home' ? 1 : 0.8,
    }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/Resume`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/cookie-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/responsible-disclosure`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/security-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const certificatePages: MetadataRoute.Sitemap = googleSpecializations.map((cert) => ({
    url: `${SITE_URL}/certificates/${cert.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...dynamicPages, ...staticPages, ...projectPages, ...certificatePages];
}
