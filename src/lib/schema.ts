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
        '@type': 'EducationalOrganization',
        '@id': `${SITE_URL}/#organization`,
        name: ORG_NAME,
        url: SITE_URL,
        foundingDate: '2024',
        description: "Cercle IA forme les professionnels à utiliser l'IA générative avec méthode et discernement. Formations sur mesure pour avocats, médecins, consultants, dirigeants et équipes RH, en Belgique et en France.",
        knowsAbout: [
          'intelligence artificielle générative',
          'formation professionnelle',
          'droit',
          'médecine',
          'conseil',
          'ressources humaines',
          'prompt engineering',
        ],
        founder: {
          '@type': 'Person',
          '@id': `${SITE_URL}/tarik-hennen#person`,
          name: 'Tarik Hennen',
        },
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/images/cercle-ia-logo.png`,
        },
        sameAs: [
          'https://www.linkedin.com/company/cercle-ia',
          'https://www.linkedin.com/newsletters/cercle-ia-7353754146262401025/',
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '19, Avenue des Volontaires',
          addressLocality: 'Bruxelles',
          postalCode: '1160',
          addressCountry: 'BE',
        },
        vatID: 'BE0773.969.928',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '18',
          bestRating: '5',
          worstRating: '1',
        },
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
  offers?: { price: string; priceCurrency: string };
  courseMode?: string;
  startDate?: string;
  timeRequired?: string;
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
    ...(opts.offers && {
      offers: {
        '@type': 'Offer',
        price: opts.offers.price,
        priceCurrency: opts.offers.priceCurrency,
        availability: 'https://schema.org/PreOrder',
      },
    }),
    ...(opts.courseMode && { courseMode: opts.courseMode }),
    ...(opts.startDate && { startDate: opts.startDate }),
    ...(opts.timeRequired && { timeRequired: opts.timeRequired }),
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

export const PERSON_ID = `${SITE_URL}/tarik-hennen#person`;

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Tarik Hennen',
    url: `${SITE_URL}/tarik-hennen`,
    jobTitle: 'Fondateur et formateur IA',
    description: "Ancien avocat, praticien IA depuis 2021, fondateur de Cercle IA. Il forme les juristes, médecins, dirigeants et consultants à utiliser l’IA avec méthode et discernement.",
    image: `${SITE_URL}/images/tarik-hennen-formation.png`,
    worksFor: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: ORG_NAME,
      url: SITE_URL,
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Université de Liège',
        sameAs: 'https://www.uliege.be',
      },
      {
        '@type': 'EducationalOrganization',
        name: "King's College London",
        sameAs: 'https://www.kcl.ac.uk',
      },
    ],
    affiliation: [
      {
        '@type': 'EducationalOrganization',
        name: 'IHECS',
        sameAs: 'https://www.ihecs.be',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'EPHEC',
        sameAs: 'https://www.ephec.be',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'UCLouvain',
        sameAs: 'https://uclouvain.be',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/in/tarikhennen',
    ],
    knowsAbout: [
      'Intelligence artificielle générative',
      'Droit',
      'Stratégie digitale',
      'Formation professionnelle',
      'Prompt engineering',
      'IA et professions réglementées',
    ],
  };
}

export function articleItemListSchema(opts: {
  name: string;
  description: string;
  items: { url: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: opts.name,
    description: opts.description,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}${item.url}`,
    })),
  };
}

export function courseItemListSchema(opts: {
  name: string;
  description: string;
  items: { name: string; description: string; url: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: opts.name,
    description: opts.description,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: item.name,
        description: item.description,
        url: `${SITE_URL}${item.url}`,
        provider: {
          '@type': 'Organization',
          name: ORG_NAME,
          sameAs: SITE_URL,
        },
        inLanguage: 'fr-BE',
      },
    })),
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
      '@id': PERSON_ID,
      name: 'Tarik Hennen',
      url: `${SITE_URL}/tarik-hennen`,
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
