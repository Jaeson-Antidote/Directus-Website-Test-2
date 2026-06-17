export const DIRECTUS_URL = import.meta.env.DIRECTUS_URL ?? '';
const DIRECTUS_TOKEN = import.meta.env.DIRECTUS_TOKEN ?? '';

export interface DirectusArticle {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  pub_date: string;
  updated_date: string | null;
  category: string | null;
  tags: string[] | null;
  image: string | null; // Directus file UUID
  image_alt: string | null;
  status: 'published' | 'draft';
}

const ARTICLE_FIELDS =
  'id,slug,title,description,pub_date,updated_date,category,tags,image,image_alt,status';

async function directusFetch(path: string, token: string = DIRECTUS_TOKEN): Promise<any> {
  if (!DIRECTUS_URL) return { data: [] };
  try {
    const res = await fetch(`${DIRECTUS_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      console.warn(`Directus ${res.status} on ${path} — returning empty`);
      return { data: [] };
    }
    return res.json();
  } catch (err) {
    console.warn(`Directus fetch error on ${path}:`, err);
    return { data: [] };
  }
}

export async function getArticles(): Promise<DirectusArticle[]> {
  const data = await directusFetch(
    `/items/articles?filter[status][_eq]=published&sort=-pub_date&fields=${ARTICLE_FIELDS}`,
  );
  return data.data ?? [];
}

export async function getArticleBySlug(slug: string): Promise<DirectusArticle | null> {
  const data = await directusFetch(
    `/items/articles?filter[slug][_eq]=${encodeURIComponent(slug)}&filter[status][_eq]=published&limit=1&fields=*`,
  );
  return data.data?.[0] ?? null;
}

export async function getDraftBySlug(
  slug: string,
  previewToken: string,
): Promise<DirectusArticle | null> {
  const data = await directusFetch(
    `/items/articles?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1&fields=*`,
    previewToken,
  );
  return data.data?.[0] ?? null;
}

export function articleImageUrl(
  article: DirectusArticle,
  width = 748,
  height = 420,
): string | undefined {
  if (!article.image) return undefined;
  const url = new URL(`/assets/${article.image}`, DIRECTUS_URL);
  url.searchParams.set('width', String(width));
  url.searchParams.set('height', String(height));
  url.searchParams.set('format', 'webp');
  url.searchParams.set('fit', 'cover');
  return url.toString();
}
