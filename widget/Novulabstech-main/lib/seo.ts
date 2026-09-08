/**
 * Central SEO configuration.
 * ---------------------------------------------------------------------------
 * Every canonical URL, schema entity and sitemap entry is derived from here so
 * the site can never again drift out of sync (which is what caused the
 * blog-posts-canonicalise-to-homepage bug).
 *
 * ⚠️  CLIENT ACTION REQUIRED — the values marked TODO below are placeholders.
 *     Replace them with verified facts before deploying to production. Publishing
 *     unverifiable claims is an E-E-A-T liability, especially in YMYL verticals
 *     (financial compliance, healthcare data) where NovuLabs operates.
 */

export const SITE_URL = 'https://www.novulabs.net';
export const SITE_NAME = 'NovuLabs';
export const LEGAL_NAME = 'NovuLabs Technology Pvt Ltd';

/** Canonical URL builder. Always absolute, always www, never a trailing slash
 *  (except the root). Use this everywhere instead of hand-writing URLs. */
export function canonical(path = '/'): string {
  if (path === '/' || path === '') return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`.replace(/\/$/, '');
}

/** Absolute URL for images/OG assets. */
export function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

// ---------------------------------------------------------------------------
// Organisation facts — single source of truth for schema, footer and contact
// ---------------------------------------------------------------------------
export const ORG = {
  name: LEGAL_NAME,
  shortName: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl('/logo.png'),

  // TODO(client): confirm the real founding year. /about currently claims 2015
  // while the footer and all blog dates say 2026, and no third-party footprint
  // corroborates 2015. A false founding claim is worse than a younger one.
  foundingDate: '2015',

  email: 'info@novulabs.net',

  // Sourced from the verified Google Business Profile, which published this
  // number while the website published none — the contact page told people to
  // "call us directly" with nothing to call. NAP consistency requires the same
  // number in both places, so this is now the GBP number in E.164 format.
  //
  // TODO(client): this is a mobile line. An Islamabad landline
  // ('+92-51-XXXXXXX') reads as more established to enterprise and government
  // buyers and strengthens GBP verification. Keep the mobile as secondary if it
  // is the one that actually gets answered.
  telephone: '+92 326 8292152',

  address: {
    // Also taken from the verified GBP, which carried a street address the site
    // had never published. The direction of that gap was the opposite of the
    // usual one, and it left LocalBusiness schema unable to validate.
    streetAddress: 'I-10/4, I-10',
    addressLocality: 'Islamabad',
    addressRegion: 'Islamabad Capital Territory',
    // TODO(client): still unknown — absent from both the website and the GBP.
    // LocalBusiness will validate without it but the address is weaker for
    // map-pack matching. Left null rather than guessed.
    postalCode: null as string | null,
    addressCountry: 'PK',
  },

  /** Opening hours, matching what /contact publishes. The GBP currently says
   *  "Open 24 hours" Mon–Sat, which contradicts this; the 24/7 line on the site
   *  is an enterprise SLA term for existing customers, not opening hours.
   *  Mismatched hours invite user-submitted corrections on Google. */
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },

  /** Entity corroboration for AI search (ChatGPT, Perplexity, AI Overviews).
   *  Add Crunchbase, Clutch, GitHub and Google Business Profile as they go live —
   *  each additional verified profile increases citation confidence. */
  sameAs: [
    'https://www.linkedin.com/company/novu-labs/',
    'https://www.facebook.com/profile.php?id=61592003789179',
    'https://www.instagram.com/novu_labs',
  ],

  areaServed: ['PK', 'AE', 'GB', 'US', 'SA'],

  knowsAbout: [
    'AML/CFT compliance software',
    'goAML XML schema integration',
    'STR and CTR regulatory reporting',
    'FMU Pakistan reporting requirements',
    'Transaction monitoring system development',
    'PEP and sanctions screening',
    'Core banking platform engineering',
    'PCI-DSS payment gateway development',
    'RAAST instant payment integration',
    'HIPAA-compliant software engineering',
    'HL7 FHIR interoperability',
    'Electronic health record systems',
    'NADRA and FBR API integration',
    'Enterprise ERP and CRM development',
    'Multi-tenant SaaS architecture',
  ],
} as const;

// ---------------------------------------------------------------------------
// Title helpers — enforce the 50–60 character SERP budget
// ---------------------------------------------------------------------------
/** Length of the title as it will actually render, i.e. including the
 *  ` | NovuLabs` suffix appended by the root layout template. */
export const BRAND_SUFFIX_LENGTH = ' | NovuLabs'.length; // 11

/** Dev-time guard: warns if a page title will exceed the SERP render budget.
 *  Never throws — a title warning must not break a build. */
export function assertTitleBudget(title: string, route: string): string {
  if (process.env.NODE_ENV === 'development') {
    const rendered = title.length + BRAND_SUFFIX_LENGTH;
    if (rendered > 60) {
      // eslint-disable-next-line no-console
      console.warn(
        `[seo] Title for ${route} renders at ${rendered} chars (budget 60): "${title} | NovuLabs"`
      );
    }
    if (/\|\s*NovuLabs/i.test(title)) {
      // eslint-disable-next-line no-console
      console.warn(
        `[seo] Title for ${route} already contains the brand — the layout template will duplicate it.`
      );
    }
  }
  return title;
}
