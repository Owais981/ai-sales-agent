/**
 * /testimonials — client testimonials.
 * ---------------------------------------------------------------------------
 * ⚠️  EVERY TESTIMONIAL IN THIS FILE IS A PLACEHOLDER. NONE IS A REAL CLIENT.
 *
 * No genuine client testimonial exists anywhere in this repository or on the
 * live site, so none could be consolidated. Rather than ship an empty page or
 * invent quotes and pass them off as real, the page renders these with a
 * visible, unmissable notice saying they are samples — and every record
 * carries `placeholder: true`, which is what drives that notice.
 *
 * WHAT MUST HAPPEN BEFORE THIS PAGE IS TRUE
 *   1. Collect real, attributable feedback. A role and a sector alone
 *      ("Head of Compliance, commercial bank") is enough when an NDA prevents
 *      naming the institution — that is the same convention /portfolio already
 *      uses for unnamed clients, and it is honest.
 *   2. Replace `quote`, `role` and `sector` with the real words. Do not edit a
 *      real quote for flow; a tidied quote is no longer a quotation.
 *   3. Set `placeholder: false` on each replaced record. The sample banner
 *      disappears automatically once no record is a placeholder.
 *   4. Only then consider structured data — see the note in lib/schema.ts and
 *      app/testimonials/page.tsx.
 *
 * WHY THERE IS NO Review / AggregateRating SCHEMA
 * Google's review snippet policy requires reviews that are genuine, collected
 * from real customers, and not written by the business about itself. Marking up
 * placeholder text — or even real testimonials the business solicited and
 * published about itself — as `Review` with a `ratingValue` invites a manual
 * action for spammy structured data. There are no star ratings on this page
 * because nobody has given one. Do not add them to satisfy a validator.
 *
 * The copy below is written in the same voice as the rest of the site and is
 * deliberately specific about engineering, so it is usable as a starting
 * template for the real thing — but it describes no actual engagement.
 */

export interface Testimonial {
  /** The testimonial text. */
  quote: string;
  /** Role of the person quoted. Never a fabricated personal name. */
  role: string;
  /** Organisation descriptor — sector and scale, not a client name. */
  organisation: string;
  /** Which sector grouping this appears under on the page. */
  sector:
    | 'Banking & Fintech'
    | 'Healthcare'
    | 'Government'
    | 'Enterprise Software'
    | 'AI & Automation'
    | 'SaaS';
  /** Service page this engagement maps to — renders as an internal link. */
  relatedService?: { label: string; href: string };
  /** TRUE until replaced with verified client feedback. Drives the page banner. */
  placeholder: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'The value showed up in the first two weeks, before any code: they went through our transaction data and told us our customer records were not resolvable to a single entity, which meant screening would generate noise no matter how good the rules were. Entity resolution became phase one. That reordering saved us a false start we had already budgeted for.',
    role: 'Head of Compliance',
    organisation: 'Commercial bank, SBP-regulated',
    sector: 'Banking & Fintech',
    relatedService: { label: 'AML/CFT compliance software', href: '/services/aml-cft-compliance-software' },
    placeholder: true,
  },
  {
    quote:
      'Our examiner asked why a specific alert closed the way it did, eleven months after the fact. The system produced the rule version, the data as it stood that day and the analyst’s narrative in one export. That single interaction justified the whole approach to our board.',
    role: 'Chief Risk Officer',
    organisation: 'Microfinance institution',
    sector: 'Banking & Fintech',
    relatedService: { label: 'AML/CFT compliance software', href: '/services/aml-cft-compliance-software' },
    placeholder: true,
  },
  {
    quote:
      'We had been quoted for a payment switch by three firms. NovuLabs was the only one that asked what our settlement reconciliation looked like before quoting, and the only one whose estimate did not move afterwards.',
    role: 'Director of Payments',
    organisation: 'Digital wallet operator',
    sector: 'Banking & Fintech',
    relatedService: { label: 'Fintech & payments engineering', href: '/services/fintech-software-development' },
    placeholder: true,
  },
  {
    quote:
      'The FHIR work was done properly rather than as a translation layer bolted on at the end. When we later connected a second hospital group, integration took days instead of the quarter we had planned for.',
    role: 'Chief Medical Information Officer',
    organisation: 'Private hospital network',
    sector: 'Healthcare',
    relatedService: { label: 'Healthcare software development', href: '/services/healthcare-software-development' },
    placeholder: true,
  },
  {
    quote:
      'They were direct that HIPAA has no certification to buy and that our obligations sat with us, not with them. Every other vendor we spoke to let us keep believing otherwise. That was the point we decided.',
    role: 'Head of Information Security',
    organisation: 'Telemedicine provider',
    sector: 'Healthcare',
    relatedService: { label: 'Healthcare software development', href: '/services/healthcare-software-development' },
    placeholder: true,
  },
  {
    quote:
      'Public-sector procurement means the architecture has to survive review by people who will never use it. The documentation they produced alongside the build cleared our security review without a single follow-up round.',
    role: 'Programme Director',
    organisation: 'Federal regulatory agency',
    sector: 'Government',
    relatedService: { label: 'Enterprise software development', href: '/services/enterprise-software-development' },
    placeholder: true,
  },
  {
    quote:
      'The NADRA integration was the part we expected to slip and the part that did not. They had already handled the failure modes we had not thought to ask about, like timeouts, partial matches, and what the citizen sees when verification fails.',
    role: 'Head of Digital Services',
    organisation: 'Provincial government department',
    sector: 'Government',
    relatedService: { label: 'Enterprise software development', href: '/services/enterprise-software-development' },
    placeholder: true,
  },
  {
    quote:
      'We came in wanting a custom ERP. They mapped our processes, found that eighty per cent matched a product we could licence, and scoped a build for only the twenty per cent that was genuinely ours. They talked themselves out of most of the contract.',
    role: 'Chief Operating Officer',
    organisation: 'Manufacturing group',
    sector: 'Enterprise Software',
    relatedService: { label: 'Enterprise software development', href: '/services/enterprise-software-development' },
    placeholder: true,
  },
  {
    quote:
      'Their engineers joined our sprints and used our review process rather than importing their own. Six months in it is genuinely hard to tell from the commit history which half of the team is which.',
    role: 'VP Engineering',
    organisation: 'Enterprise software vendor',
    sector: 'Enterprise Software',
    relatedService: { label: 'Web platform development', href: '/services/web-development' },
    placeholder: true,
  },
  {
    quote:
      'We asked for machine learning on the alert queue. They put a model on prioritisation and kept deterministic rules as the alerts of record, because an examiner needs a reason they can read. It was a better answer than the one we asked for.',
    role: 'Head of Data',
    organisation: 'Financial services group',
    sector: 'AI & Automation',
    relatedService: { label: 'Cloud, AI & automation', href: '/services/cloud-ai-automation' },
    placeholder: true,
  },
  {
    quote:
      'Multi-tenancy was designed for on day one instead of retrofitted at customer forty. We have onboarded institutional tenants with their own data residency requirements without touching the core.',
    role: 'Founder & CTO',
    organisation: 'B2B SaaS platform',
    sector: 'SaaS',
    relatedService: { label: 'Web platform development', href: '/services/web-development' },
    placeholder: true,
  },
  {
    quote:
      'Support after launch is the part most vendors treat as an afterthought. When the reporting schema changed, they had already tracked it and shipped the update before our compliance team raised the ticket.',
    role: 'Head of Platform',
    organisation: 'Regulated SaaS provider',
    sector: 'SaaS',
    relatedService: { label: 'Cloud, AI & automation', href: '/services/cloud-ai-automation' },
    placeholder: true,
  },
];

/** True while any record is still a sample. Drives the on-page notice. */
export const hasPlaceholderTestimonials = testimonials.some((t) => t.placeholder);

/** Sector groupings, in the order they render. */
export const testimonialSectors = [
  'Banking & Fintech',
  'Healthcare',
  'Government',
  'Enterprise Software',
  'AI & Automation',
  'SaaS',
] as const;

/**
 * "Why clients choose NovuLabs" — the differentiators, stated as method rather
 * than as outcome. Each one is something the site can show elsewhere, which is
 * why each carries an internal link: an unlinked claim is just an assertion.
 */
export const whyClientsChoose: {
  title: string;
  icon: string;
  color: string;
  body: string;
  link?: { label: string; href: string };
}[] = [
  {
    title: 'Engineering expertise',
    icon: 'bi-cpu',
    color: 'i-t',
    body:
      'The person who takes your first call is an architect who would be accountable for the technical outcome. There is no pre-sales layer, so nothing is promised in a meeting that engineering has not agreed to.',
    link: { label: 'Meet the team', href: '/team' },
  },
  {
    title: 'Security-first development',
    icon: 'bi-shield-check',
    color: 'i-b',
    body:
      'Threat modelling, least-privilege data access and audit trails are designed in the first sprint rather than added before a security review. Retrofitting them is how projects lose a quarter.',
    link: { label: 'How we work', href: '/about#faq' },
  },
  {
    title: 'Enterprise scalability',
    icon: 'bi-diagram-3',
    color: 'i-v',
    body:
      'Systems are designed around which record is authoritative and where it lives, so growth is an infrastructure question rather than a re-platforming one. Multi-tenancy and data residency are decided up front.',
    link: { label: 'Platform architecture', href: '/solutions' },
  },
  {
    title: 'Regulatory depth',
    icon: 'bi-file-earmark-check',
    color: 'i-o',
    body:
      'AML/CFT under the SBP and FMU frameworks, HIPAA and HL7 FHIR, PCI-DSS and scheme certification. Building for an examiner is a different discipline from building for a user, and it is the one we practise.',
    link: { label: 'Industries we serve', href: '/industries' },
  },
  {
    title: 'Clear communication',
    icon: 'bi-chat-square-text',
    color: 'i-c',
    body:
      'We say what we do not know, and we say when a requirement would be better met by a product you can licence. A meaningful share of our discovery calls end in a scoping correction rather than a proposal.',
    link: { label: 'Common questions', href: '/faq' },
  },
  {
    title: 'Long-term support',
    icon: 'bi-headset',
    color: 'i-p',
    body:
      'Tiered SLAs from business hours to 24/7 cover, with a named account manager for enterprise clients. On a regulated platform that also means tracking schema and reporting changes on your behalf.',
    link: { label: 'Talk to us', href: '/contact' },
  },
];
