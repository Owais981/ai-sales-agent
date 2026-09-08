import { FaqItem } from '../types';
import { faqs as homeFaqs, contactFaqs } from './siteData';
import {
  aboutFaqs,
  solutionsFaqs,
  industriesFaqs,
  portfolioFaqs,
  teamFaqs,
  blogFaqs,
} from './pageFaqs';
import { servicePages } from './servicePages';

/**
 * /faq — the hub.
 * ---------------------------------------------------------------------------
 * The site already answers ~60 questions, but they were scattered across ten
 * pages with no single address. Someone searching "does NovuLabs do X" had no
 * document to land on, and neither did an answer engine.
 *
 * ARCHITECTURE — hub and spoke, deliberately not a copy-paste aggregate.
 *
 * `hubFaqs` below are NEW questions, answered nowhere else on the site. They
 * are the broad orientation questions a buyer asks before they know which
 * service page they need, and this page owns them: it is the only page that
 * emits FAQPage schema for them.
 *
 * `faqDirectory` does NOT restate the answers that live on other pages. It
 * lists their questions as links into the section that owns each one. Copying
 * ~60 answers here would put every Q&A on the site at two URLs and two
 * FAQPage nodes, which splits the signal rather than concentrating it — the
 * page competes with the very pages it is supposed to feed. A directory gives
 * the reader one place to scan, gives every spoke page an inbound contextual
 * link, and leaves each answer with exactly one canonical home.
 *
 * WRITING RULE — answer-first, same as content/pageFaqs.ts. The first sentence
 * is the answer; everything after it qualifies.
 *
 * HONESTY RULE — no pricing beyond what /contact already publishes, no
 * timelines, no team size, no client names, no certification claims.
 */

export const hubFaqs: FaqItem[] = [
  {
    q: 'What does NovuLabs specialise in?',
    a: 'Software for systems a regulator can audit: AML/CFT compliance and transaction monitoring for SBP-regulated financial institutions, HIPAA and HL7 FHIR healthcare platforms, PCI-DSS payment infrastructure, and government integrations. The common constraint across all of them is that the system has to be able to evidence what it did and why, months after the fact, to someone who was not there.',
  },
  {
    q: 'Is NovuLabs a software house in Islamabad?',
    a: 'Yes. NovuLabs is headquartered in Islamabad, Pakistan, and the engineering team works from one place rather than being assembled from contractors per project. The regulatory environment we know in the most depth is Pakistan’s: the State Bank’s AML/CFT framework, the Financial Monitoring Unit’s reporting obligations, and the national identity infrastructure that financial onboarding depends on.',
  },
  {
    q: 'Does NovuLabs build custom enterprise software, or sell products?',
    a: 'Both, and the choice is made per engagement rather than sold in advance. Four platforms (NovuShield, NovuPay, NovuERP and NovuCRM) cover compliance, payments, operations and the customer record, and each can be deployed into infrastructure you control. Where an off-the-shelf product genuinely fits your requirement, we will say so; recommending a custom build against a product that fits sells you maintenance liability at a premium.',
  },
  {
    q: 'Which industries does NovuLabs serve?',
    a: 'Banking and fintech, healthcare, and government, with manufacturing and e-commerce work alongside them. These are not separate practices so much as one practice applied to three regulators: the architecture that satisfies an AML examiner and the architecture that satisfies a HIPAA audit are far more alike than the industry labels suggest.',
  },
  {
    q: 'Can NovuLabs work with our existing engineering team?',
    a: 'Yes, through staff augmentation, co-development, or full delivery. Our engineers adapt to your stack, your sprint ceremonies and your review process rather than importing ours. Which model fits is usually a question about where your bottleneck actually is: a team short on capacity and a team short on a specific domain need different things.',
  },
  {
    q: 'What technologies does NovuLabs work in?',
    a: 'Predominantly Java, Python, TypeScript/Node and React on PostgreSQL, with Kafka for event streams, on AWS, Azure or on-premise infrastructure depending on where the data is allowed to sit. Standards matter more than languages in this work: goAML XML, HL7 FHIR, ISO 8583, PCI-DSS and OAuth2/OIDC shape the design far more than the runtime does.',
  },
  {
    q: 'Does NovuLabs provide support after launch?',
    a: 'Yes, under tiered SLAs running from business-hours support to 24/7 cover with a guaranteed response window, and enterprise clients get a named account manager. Support on a regulated platform is not only incident response: regulatory schemas and reporting formats change, and a system that files to a regulator needs someone tracking those changes on its behalf.',
  },
  {
    q: 'How does an engagement with NovuLabs start?',
    a: 'With a 45-minute discovery call taken by an architect who would be accountable for the technical outcome, not by a salesperson. There is no pre-sales layer here and no commitment attached to the call. A meaningful share of these calls end in a scoping correction rather than a proposal, which is usually the more valuable outcome.',
  },
  {
    q: 'Does NovuLabs work with clients outside Pakistan?',
    a: 'Yes, across the Gulf, the UK and North America. The regulatory depth is deepest in Pakistan, but the engineering discipline transfers directly: HIPAA safeguards, FHIR interoperability and PCI-DSS payment work all follow the same pattern of designing for audit from the first sprint rather than retrofitting it before a review.',
  },
  {
    // This used to restate the About page's own FAQ almost word for word
    // ("Is NovuLabs ISO 27001 or HIPAA certified?"), which is exactly what
    // this file's header comment says hubFaqs should never do — that
    // question already has one canonical home in content/pageFaqs.ts
    // (aboutFaqs), and the directory below already links to it. Replaced
    // with a genuinely new orientation question this hub does not answer
    // anywhere else: which of the 22 dedicated service pages fits a given
    // project.
    q: 'How do I know which NovuLabs service is right for my project?',
    a: 'Start from the problem, not the service list. The seven practice areas on the services page cover the broad categories; the specific pages nested under each one describe a narrower capability, and most of them link sideways to the two or three siblings a related project would also touch. If it is still not obvious after reading one, that is what the discovery call is for: describing the problem to an architect is a faster way to find the right scope than guessing from a page title.',
  },
];

/** One category in the directory. `href` is the section that owns the answers. */
export interface FaqDirectoryGroup {
  title: string;
  /** Why a reader would open this group — one line, not a keyword string. */
  blurb: string;
  href: string;
  items: FaqItem[];
}

/**
 * Derived from the live FAQ sets, never hand-copied. A question added to any
 * source set appears here automatically, so the directory cannot go stale or
 * list a question the destination page no longer answers.
 */
export const faqDirectory: FaqDirectoryGroup[] = [
  {
    title: 'Working with us',
    blurb: 'How engagements start, who you deal with, and what we will tell you not to build.',
    href: '/about#faq',
    items: aboutFaqs,
  },
  {
    title: 'Scope, contracts and NDAs',
    blurb: 'Minimum project size, contract models, and what is protected before the first technical call.',
    href: '/contact#contact-faq',
    items: contactFaqs,
  },
  {
    title: 'Platforms and deployment',
    blurb: 'Choosing between NovuShield, NovuPay, NovuERP and NovuCRM, and where each can be hosted.',
    href: '/solutions#faq',
    items: solutionsFaqs,
  },
  {
    title: 'Regulated industries',
    blurb: 'What AML/CFT, HIPAA and government integration actually demand of a system.',
    href: '/industries#faq',
    items: industriesFaqs,
  },
  {
    title: 'Case studies and references',
    blurb: 'Why clients are unnamed, what the figures mean, and how to get a reference.',
    href: '/portfolio#faq',
    items: portfolioFaqs,
  },
  {
    title: 'The team',
    blurb: 'Who does the work, whether any of it is subcontracted, and talking to an engineer first.',
    href: '/team#faq',
    items: teamFaqs,
  },
  {
    title: 'Our published research',
    blurb: 'Who writes the technical articles, how regulatory claims are sourced, and how current they are.',
    href: '/blog#faq',
    items: blogFaqs,
  },
  {
    title: 'Getting started',
    blurb: 'The short answers on industries, support, compliance and working alongside your team.',
    href: '/#faq',
    items: homeFaqs,
  },
  // One group per service page, so every commercial URL gets an inbound link
  // from the hub rather than only the seven top-level sections above.
  ...servicePages.map((s) => ({
    title: s.navLabel,
    blurb: s.summary.split('. ')[0].replace(/\.$/, '') + '.',
    href: `/services/${s.slug}#faq`,
    items: s.faqs as FaqItem[],
  })),
];

/** Total questions the site answers — rendered on the page, so it must be real. */
export const totalAnsweredQuestions =
  hubFaqs.length + faqDirectory.reduce((n, g) => n + g.items.length, 0);
