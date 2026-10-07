import { MetadataRoute } from 'next';
import { googleSpecializations } from '@/components/sections/about/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.webjothishanalyst.site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const mainPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/resume`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const certificatePages: MetadataRoute.Sitemap = googleSpecializations.map((cert) => ({
    url: `${SITE_URL}/certificates/${cert.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const legalPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/privacy-policy`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/terms-and-conditions`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/cookie-policy`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/responsible-disclosure`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/security-policy`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
  ];

  return [...mainPages, ...certificatePages, ...legalPages];
}
