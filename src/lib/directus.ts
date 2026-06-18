export const DIRECTUS_URL = import.meta.env.DIRECTUS_URL ?? '';
const DIRECTUS_TOKEN = import.meta.env.DIRECTUS_TOKEN ?? '';
const PREFIX = import.meta.env.COLLECTION_PREFIX ?? '';

// ─── Articles ──────────────────────────────────────────────────────────────

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
  image: string | null;
  image_alt: string | null;
  status: 'published' | 'draft';
}

// ─── Testimonials ──────────────────────────────────────────────────────────

export interface DirectusTestimonial {
  id: number;
  pull: string;
  body: string | null;
  name: string;
  role: string | null;
  org: string | null;
  initials: string;
  pages: string[] | null;
}

// ─── FAQs ──────────────────────────────────────────────────────────────────

export interface DirectusFaq {
  id: number;
  page: string | null;
  question: string;
  answer: string;
}

// ─── Formations ────────────────────────────────────────────────────────────

export interface DirectusFormation {
  id: number;
  slug: string;
  title: string;
  tag: string | null;
  desc: string;
  href: string;
}

// ─── Page home (singleton) ─────────────────────────────────────────────────

export interface DirectusPageHome {
  seo_title: string;
  seo_description: string;
  og_image_alt: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_title_muted: string;
  hero_description: string;
  hero_cta_primary: string;
  hero_cta_primary_href: string;
  hero_cta_secondary: string;
  hero_logos_label: string;
  hero_diagram: { centralLabel: string; professions: string[]; outputs: string[] };
  features_eyebrow: string;
  features_title: string;
  features_cards: Array<{ icon: string; title: string; desc: string }>;
  formations_eyebrow: string;
  formations_title: string;
  formations_cta_label: string;
  bootcamp_tag: string;
  bootcamp_meta: string;
  bootcamp_title: string;
  bootcamp_desc: string;
  bootcamp_cta_waitlist: string;
  bootcamp_cta_program: string;
  bootcamp_session_label: string;
  bootcamp_session_date: string;
  usps_eyebrow: string;
  usps_items: Array<{ n: string; title: string; desc: string }>;
  trainer_eyebrow: string;
  trainer_name: string;
  trainer_bio: string;
  trainer_quote: string;
  trainer_cta: string;
  trainer_cta_href: string;
  trainer_stats: Array<{ number: string; label: string }>;
  testimonials_eyebrow: string;
  testimonials_title: string;
  resources_eyebrow: string;
  resources_title: string;
  resources_items: Array<{ href: string; title: string; desc: string; cta: string }>;
  cta_badge: string;
  cta_title: string;
  cta_description: string;
  cta_primary: string;
  cta_primary_href: string;
  cta_secondary: string;
}

// ─── Page about (singleton) ────────────────────────────────────────────────

export interface DirectusPageAbout {
  seo_title: string;
  seo_description: string;
  og_image_alt: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
  hero_italic: string;
  hero_cta_primary: string;
  hero_stats: Array<{ value: string; label: string }>;
  probleme_title: string;
  pour_qui_eyebrow: string;
  pour_qui_title: string;
  pour_qui_cards: Array<{ title: string; desc: string }>;
  approche_eyebrow: string;
  approche_title: string;
  approche_items: Array<{ num: string; title: string; desc: string }>;
  formations_eyebrow: string;
  formations_title: string;
  formations_sessions_ouvertes: { label: string; items: string[] };
  formations_sur_mesure: { label: string; items: string[] };
  testimonials_eyebrow: string;
  testimonials_title: string;
  formateur_eyebrow: string;
  formateur_title: string;
  cta_eyebrow: string;
  cta_title: string;
  cta_primary: string;
  cta_primary_href: string;
}

// ─── Page contact (singleton) ──────────────────────────────────────────────

export interface DirectusPageContact {
  seo_title: string;
  seo_description: string;
  og_image_alt: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
  form_title: string;
  form_submit_label: string;
  form_fields: {
    prenom: { label: string; placeholder: string };
    nom: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    organisation: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  infos_adresse: string;
  infos_legal: string;
  infos_pour_qui: string[];
  pas_encore_pret_title: string;
  pas_encore_pret_cards: Array<{ title: string; href: string }>;
}

// ─── Fetch helper ──────────────────────────────────────────────────────────

const ARTICLE_FIELDS =
  'id,slug,title,description,pub_date,updated_date,category,tags,image,image_alt,status';

async function directusFetch(path: string, token: string = DIRECTUS_TOKEN): Promise<any> {
  if (!DIRECTUS_URL) return { data: null };
  try {
    const res = await fetch(`${DIRECTUS_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      console.warn(`Directus ${res.status} on ${path} — returning empty`);
      return { data: null };
    }
    return res.json();
  } catch (err) {
    console.warn(`Directus fetch error on ${path}:`, err);
    return { data: null };
  }
}

function toArray<T>(data: any): T[] {
  return Array.isArray(data) ? data : [];
}

function toSingleton<T>(data: any): T | null {
  if (!data || Array.isArray(data)) return null;
  if (typeof data === 'object' && Object.keys(data).length === 0) return null;
  return data as T;
}

// ─── Articles ──────────────────────────────────────────────────────────────

export async function getArticles(): Promise<DirectusArticle[]> {
  const res = await directusFetch(
    `/items/${PREFIX}articles?filter[status][_eq]=published&sort=-pub_date&fields=${ARTICLE_FIELDS}`,
  );
  return toArray<DirectusArticle>(res.data);
}

export async function getArticleBySlug(slug: string): Promise<DirectusArticle | null> {
  const res = await directusFetch(
    `/items/${PREFIX}articles?filter[slug][_eq]=${encodeURIComponent(slug)}&filter[status][_eq]=published&limit=1&fields=*`,
  );
  return toArray<DirectusArticle>(res.data)[0] ?? null;
}

export async function getDraftBySlug(
  slug: string,
  previewToken: string,
): Promise<DirectusArticle | null> {
  const res = await directusFetch(
    `/items/${PREFIX}articles?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1&fields=*`,
    previewToken,
  );
  return toArray<DirectusArticle>(res.data)[0] ?? null;
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

// ─── Collections ───────────────────────────────────────────────────────────

export async function getTestimonials(page: string): Promise<DirectusTestimonial[]> {
  const res = await directusFetch(
    `/items/${PREFIX}testimonials?filter[status][_eq]=published&sort=sort`,
  );
  return toArray<DirectusTestimonial>(res.data).filter(
    (t) => t.pages?.includes(page) ?? false,
  );
}

export async function getFaqs(page: string): Promise<DirectusFaq[]> {
  const res = await directusFetch(
    `/items/${PREFIX}faqs?filter[status][_eq]=published&filter[page][_eq]=${encodeURIComponent(page)}&sort=sort`,
  );
  return toArray<DirectusFaq>(res.data);
}

export async function getFormations(): Promise<DirectusFormation[]> {
  const res = await directusFetch(
    `/items/${PREFIX}formations?filter[status][_eq]=published&sort=sort`,
  );
  return toArray<DirectusFormation>(res.data);
}

// ─── Singletons ────────────────────────────────────────────────────────────

export async function getPageHome(): Promise<DirectusPageHome | null> {
  const res = await directusFetch(`/items/${PREFIX}page_home`);
  return toSingleton<DirectusPageHome>(res.data);
}

export async function getPageAbout(): Promise<DirectusPageAbout | null> {
  const res = await directusFetch(`/items/${PREFIX}page_about`);
  return toSingleton<DirectusPageAbout>(res.data);
}

export async function getPageContact(): Promise<DirectusPageContact | null> {
  const res = await directusFetch(`/items/${PREFIX}page_contact`);
  return toSingleton<DirectusPageContact>(res.data);
}
