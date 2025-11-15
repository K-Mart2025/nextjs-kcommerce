// app/sitemap.ts
import { apiUrl } from '@/data/config';
import type { MetadataRoute } from 'next';

/* ---------- 1.  STATIC ROUTES (pages that always exist) ---------- */
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: 'https://www.kmarthabana.run.place',                    lastModified: new Date(), changeFrequency: 'daily',   priority: 1 },
  { url: 'https://www.kmarthabana.run.place/about',              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: 'https://www.kmarthabana.run.place/delivery',           lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
  { url: 'https://www.kmarthabana.run.place/disclaimer',         lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  { url: 'https://www.kmarthabana.run.place/returns',            lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  { url: 'https://www.kmarthabana.run.place/product/section',    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
]

/* ---------- 2.  DYNAMIC PRODUCT ROUTES ---------- */
async function getProductSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${apiUrl}/products/slugs`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('slugs fetch failed');
    const data = await res.json();
    return Array.isArray(data?.result) ? data.result : [];
  } catch {
    return [];
  }
}

/* ---------- 3.  BUILD THE FULL SITEMAP ---------- */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProductSlugs()

  const productEntries: MetadataRoute.Sitemap = slugs.map(slug => ({
    url: `https://www.kmarthabana.run.place/product/${slug}`,
    lastModified: new Date(),              // you can return a product.updatedAt here
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [...STATIC_ROUTES, ...productEntries]
}