const SITE_URL = 'https://lecercle.ai';
const ORG_NAME = 'Cercle IA';

export function homepageGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: ORG_NAME,
        description: 'Formations IA pour professionnels — avocats, médecins, consultants, dirigeants.',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'fr-BE',
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: ORG_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/images/cercle-ia-logo.png`,
        },
        sameAs: ['https://www.linkedin.com/company/cercle-ia'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '19, Avenue des Volontaires',
          addressLocality: 'Bruxelles',
          postalCode: '1160',
          addressCountry: 'BE',
        },
        vatID: 'BE0773.969.928',
      },
    ],
  };
}

export function breadcrumb(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: SITE_URL,
      },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}${item.href}`,
      })),
    ],
  };
}

export function courseSchema(opts: {
  name: string;
  description: string;
  url: string;
  provider?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.url}`,
    provider: {
      '@type': 'Organization',
      name: opts.provider ?? ORG_NAME,
      sameAs: SITE_URL,
    },
    inLanguage: 'fr-BE',
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tarik Hennen',
    url: `${SITE_URL}/a-propos`,
    jobTitle: 'Fondateur, Cercle IA',
    worksFor: {
      '@type': 'Organization',
      name: ORG_NAME,
    },
    sameAs: [
      'https://www.linkedin.com/in/tarikhennen',
    ],
    knowsAbout: ['Intelligence Artificielle', 'Droit', 'Stratégie digitale', 'Formation professionnelle'],
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    url: `${SITE_URL}${opts.url}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    image: opts.image ? `${SITE_URL}${opts.image}` : undefined,
    author: {
      '@type': 'Person',
      name: 'Tarik Hennen',
      url: `${SITE_URL}/a-propos`,
    },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/cercle-ia-logo.png`,
      },
    },
    inLanguage: 'fr-BE',
  };
}
