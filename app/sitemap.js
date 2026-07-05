import { site, subBrands } from '@/lib/content';

export default function sitemap() {
  const now = new Date();
  const routes = ['', '/about', '/services', '/industries', '/portfolio', '/contact'].map((path) => ({
    url: `${site.domain}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));

  const brandRoutes = subBrands.map((b) => ({
    url: `${site.domain}/services/${b.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...routes, ...brandRoutes];
}
