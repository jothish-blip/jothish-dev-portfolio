import { MetadataRoute } from 'next';

const SITE_URL = 'https://www.webjothishanalyst.site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/ops',
          '/ops/',
          '/admin',
          '/admin/',
          '/api/',
          '/auth',
          '/auth/',
          '/login',
          '/login/',
          '/mfa',
          '/mfa/',
          '/internal',
          '/internal/',
        ],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Amazonbot',
          'cohere-ai',
          'Bytespider',
          'CCBot',
        ],
        allow: '/',
        disallow: [
          '/ops',
          '/ops/',
          '/admin',
          '/admin/',
          '/api/',
          '/auth',
          '/auth/',
          '/login',
          '/login/',
          '/mfa',
          '/mfa/',
          '/internal',
          '/internal/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
