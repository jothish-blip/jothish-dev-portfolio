import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export type SEORouteConfig = {
  id: string;
  slug: string;
  displayName: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  index: boolean;
};

export const defaultSeoRoutes: SEORouteConfig[] = [
  {
    id: 'hero',
    slug: 'home',
    displayName: 'Home',
    seoTitle: 'Home | Jothish Gandham',
    metaDescription: 'Welcome to the cybersecurity portfolio of Jothish Gandham.',
    index: true,
  },
  {
    id: 'about',
    slug: 'about',
    displayName: 'About',
    seoTitle: 'About | Jothish Gandham',
    metaDescription: 'Learn more about Jothish Gandham, a passionate Cybersecurity Analyst.',
    index: true,
  },
  {
    id: 'projects',
    slug: 'projects',
    displayName: 'Projects',
    seoTitle: 'Projects | Jothish Gandham',
    metaDescription: 'Explore hands-on cybersecurity projects, SIEM investigations, and SOC simulations.',
    index: true,
  },
  {
    id: 'skills',
    slug: 'skills',
    displayName: 'Skills',
    seoTitle: 'Skills | Jothish Gandham',
    metaDescription: 'Technical skills arsenal spanning defensive security, networking, and automation.',
    index: true,
  },
  {
    id: 'terminal',
    slug: 'terminal',
    displayName: 'Terminal',
    seoTitle: 'Terminal | Jothish Gandham',
    metaDescription: 'Interactive workstation terminal showcasing CLI operations.',
    index: true,
  },
  {
    id: 'contact',
    slug: 'contact',
    displayName: 'Contact',
    seoTitle: 'Contact | Jothish Gandham',
    metaDescription: 'Get in touch with Jothish Gandham for SOC analyst opportunities.',
    index: true,
  }
];

export async function getSeoRoutes(): Promise<SEORouteConfig[]> {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return defaultSeoRoutes;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('portfolio_settings')
      .select('value')
      .eq('key', 'seo_routes')
      .single();

    if (error || !data || !data.value) {
      return defaultSeoRoutes;
    }

    return data.value as SEORouteConfig[];
  } catch {
    return defaultSeoRoutes;
  }
}

export async function getSeoRoute(slug: string): Promise<SEORouteConfig | null> {
  const routes = await getSeoRoutes();
  return routes.find((r) => r.slug === slug) || null;
}
