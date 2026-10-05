import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/core/config/site.config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_CONFIG.url}/`, changeFrequency: 'monthly', priority: 1 }];
}
