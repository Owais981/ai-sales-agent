/**
 * Legal pages.
 * ---------------------------------------------------------------------------
 * The footer previously linked Privacy Policy, Terms of Service, Cookie Policy
 * and Sitemap all to `href="#"`, on every page — 4 dead links × 12 pages.
 * Neither /privacy nor /privacy-policy existed.
 *
 * That is a compliance exposure before it is an SEO one: a firm claiming HIPAA
 * and PCI-DSS work with no published privacy policy will not clear a bank's
 * vendor due diligence. Missing legal pages are also an explicit negative in
 * Google's Search Quality Rater Guidelines, and this site sits squarely in YMYL
 * territory (financial compliance, health data).
 *
 * ⚠️ CLIENT ACTION REQUIRED: these are engineering-grade drafts written to be
 * accurate about how the site actually behaves. They are NOT legal advice and
 * have not been reviewed by a lawyer. Have counsel review before relying on
 * them, and fill the bracketed placeholders.
 */

export interface LegalPage {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  lastUpdated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}

const CONTACT_LINE =
  'Questions about this policy can be sent to info@novulabs.net, or by post to NovuLabs Technology Pvt Ltd, Islamabad, Pakistan.';

export const legalPages: LegalPage[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    seoTitle: 'Privacy Policy',
    description:
      'How NovuLabs collects, uses and retains personal data from this website and from client engagements, and the rights available to you.',
    lastUpdated: '16 August 2026',
    intro:
      'This policy explains what personal data NovuLabs Technology Pvt Ltd collects through novulabs.net, why we collect it, how long we keep it, and what you can ask us to do with it. It covers the website. Data we process on behalf of clients under a services agreement is governed by that agreement and by the data processing terms within it, not by this policy.',
    sections: [
      {
        heading: 'Who we are',
        body: [
          'NovuLabs Technology Pvt Ltd is a software engineering company headquartered in Islamabad, Pakistan. For the purposes of this policy we are the data controller for personal data collected through this website.',
          'For personal data we process while delivering services to a client, the client is the controller and we act as a processor under the terms of the relevant services agreement.',
        ],
      },
      {
        heading: 'What we collect, and why',
        body: [
          '<strong>Information you give us.</strong> When you submit the contact or consultation form we collect your name, work email address, the service area you selected and the content of your message. We use it solely to respond to your enquiry and to conduct any resulting engagement. If you subscribe to updates we collect your email address for that purpose only.',
          '<strong>Information collected automatically.</strong> Our hosting infrastructure records standard server logs — IP address, user agent, requested URL, timestamp and referring page — which are used to operate the site securely and to diagnose faults.',
          '<strong>What we do not collect.</strong> We do not ask for, and you should not send us, sensitive personal data, financial account details, health information or credentials through this website\'s forms.',
        ],
      },
      {
        heading: 'Legal basis for processing',
        body: [
          'Where the General Data Protection Regulation applies to a visitor, we rely on legitimate interests for responding to business enquiries and for the security logging described above, and on consent for marketing emails. Consent can be withdrawn at any time using the unsubscribe link in any such email or by writing to us.',
        ],
      },
      {
        heading: 'Who we share it with',
        body: [
          'We do not sell personal data and we do not share it for advertising purposes.',
          'We share data with service providers who help us operate: our hosting provider, and the transactional email provider used to deliver form submissions. These providers act on our instructions and are bound by contract.',
          'We will disclose data where we are legally required to do so by a competent authority.',
        ],
      },
      {
        heading: 'International transfers',
        body: [
          'Our infrastructure providers may process data outside Pakistan. Where we transfer personal data internationally we do so under the relevant provider\'s contractual data protection terms. [Client to confirm hosting regions and list them here.]',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'Enquiry correspondence is retained for 24 months from the last contact, unless it becomes part of a client engagement record, in which case it is retained for the period set out in the services agreement. Subscription email addresses are retained until you unsubscribe. Server logs are retained for 90 days.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You can ask us for a copy of the personal data we hold about you, ask us to correct it if it is wrong, ask us to delete it, or object to our processing it. Write to info@novulabs.net and we will respond within 30 days.',
          'If you are in the EU or UK and are not satisfied with our response, you may complain to your national supervisory authority.',
        ],
      },
      {
        heading: 'Security',
        body: [
          'This site is served exclusively over HTTPS. Access to enquiry data is limited to staff who need it to respond. We would rather describe our controls accurately than make broad assurances: if you are evaluating us as a vendor and need detail on our security posture, ask and we will provide it under NDA.',
        ],
      },
      { heading: 'Changes and contact', body: [
        'We will update this page if our practices change, and the date at the top will reflect the most recent revision.',
        CONTACT_LINE,
      ] },
    ],
  },

  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    seoTitle: 'Terms of Service',
    description:
      'The terms governing use of novulabs.net, including intellectual property, acceptable use, and the limits of what this website constitutes.',
    lastUpdated: '16 August 2026',
    intro:
      'These terms govern your use of novulabs.net. They do not govern any services engagement — that is covered by a separate written agreement. If the two ever conflict, the services agreement prevails.',
    sections: [
      {
        heading: 'Acceptance',
        body: ['By using this website you accept these terms. If you do not accept them, please do not use the site.'],
      },
      {
        heading: 'What this website is not',
        body: [
          'Content on this site, including the technical articles, is provided for general information. It is not legal, regulatory, financial, clinical or professional advice, and it is not a substitute for advice on your specific circumstances.',
          'Our articles discuss regulatory frameworks including those administered by the State Bank of Pakistan, the Financial Monitoring Unit and the US Department of Health and Human Services. Regulations change, and our description of them may be out of date by the time you read it. Verify against the primary sources we link before relying on anything here.',
          'Nothing on this site constitutes an offer capable of acceptance. Engagements begin with a written agreement.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'The content, design, code and branding of this website are owned by NovuLabs Technology Pvt Ltd unless otherwise indicated. You may read, quote with attribution, and link to it. You may not reproduce it wholesale or present it as your own.',
          'Third-party names and marks referenced on this site — including Mastercard, Visa, NADRA, RAAST and others — are the property of their respective owners and are used for identification only.',
        ],
      },
      {
        heading: 'Acceptable use',
        body: [
          'Do not attempt to gain unauthorised access to this site or its infrastructure, interfere with its operation, or use it to distribute unlawful or malicious content. Automated access is permitted for search and AI crawlers as described in our robots.txt; other automated access at a rate that degrades service is not.',
        ],
      },
      {
        heading: 'Limitation of liability',
        body: [
          'This website is provided on an "as is" basis. To the fullest extent permitted by applicable law, NovuLabs is not liable for any loss arising from reliance on information published here. Nothing in these terms limits liability that cannot lawfully be limited.',
        ],
      },
      {
        heading: 'Governing law and contact',
        body: [
          'These terms are governed by the laws of Pakistan, and the courts of Islamabad have exclusive jurisdiction over any dispute arising from them.',
          CONTACT_LINE,
        ],
      },
    ],
  },

  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    seoTitle: 'Cookie Policy',
    description:
      'What novulabs.net stores in your browser and why: which cookies are strictly necessary, what is not used, and how to clear them. Actual behaviour, not a template.',
    lastUpdated: '16 August 2026',
    intro:
      'This page describes what novulabs.net stores in your browser. It is written to match what the site actually does — if we add analytics or advertising technology later, this page will be updated before that goes live, not after.',
    sections: [
      {
        heading: 'What a cookie is',
        body: [
          'A cookie is a small text file a website asks your browser to store and send back on later visits. Related technologies — local storage, session storage — work similarly and are covered by this policy.',
        ],
      },
      {
        heading: 'What this site currently uses',
        body: [
          '<strong>Strictly necessary.</strong> Cookies required for the site to function and to protect the contact form against abuse. These cannot be disabled without breaking the site, and they do not track you across other websites.',
          '<strong>Analytics.</strong> [Client to confirm.] If an analytics tool is in use, name it here along with the data it collects, its retention period, and whether IP addresses are anonymised. If none is in use, state that plainly — it is a genuine privacy advantage and worth saying.',
          '<strong>Advertising and cross-site tracking.</strong> None. We do not run advertising technology on this site and do not share visitor data with advertising networks.',
        ],
      },
      {
        heading: 'Third-party resources',
        body: [
          'This site loads some stylesheets and scripts from a public content delivery network. Requesting a file from a CDN discloses your IP address and user agent to that provider as a technical necessity of the request. We are progressively self-hosting these assets, which removes that disclosure and improves page performance at the same time.',
        ],
      },
      {
        heading: 'Controlling cookies',
        body: [
          'Every major browser lets you view, block and delete cookies through its settings. Blocking strictly necessary cookies may prevent parts of this site from working.',
          CONTACT_LINE,
        ],
      },
    ],
  },
];

export function getLegalPage(slug: string): LegalPage | undefined {
  return legalPages.find((p) => p.slug === slug);
}
