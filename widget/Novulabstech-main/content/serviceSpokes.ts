import { FaqItem } from '../types';

/**
 * 22 service spoke pages.
 * ---------------------------------------------------------------------------
 * WHERE "22" COMES FROM
 *
 * The homepage lists 22 service cards (content/siteData.ts, `services`). Until
 * now every one of those cards linked straight to /contact with no page in
 * between explaining what the service actually involves — a visitor had to
 * commit to a conversation before reading a single sentence about the work.
 *
 * WHY THESE AREN'T 22 INDEPENDENT PAGES
 *
 * Several of the 22 cards are not separate business lines. "Mastercard /
 * Visa", "Payment Gateways" and "Financial Software" are all facets of the one
 * fintech practice that content/servicePages.ts already covers in depth at
 * /services/fintech-software-development. Writing 22 full pages that each
 * restate "we build fintech software" from a slightly different angle would
 * be keyword cannibalisation: several pages competing for the same search
 * intent, diluting all of them rather than ranking any one clearly.
 *
 * So this file is the spoke layer of a hub-and-spoke structure. Each of the 7
 * pages in servicePages.ts stays exactly as it is (the pillar: broad,
 * long-form, owns the category-level search intent). Each entry below is a
 * spoke: a narrower, more specific capability nested under one pillar via
 * `parentSlug`, targeting a distinct enough search intent that it earns its
 * own page without duplicating the pillar's content. A few examples of the
 * narrowing:
 *
 *   - "Enterprise Software" (the card) becomes "Legacy System Modernisation"
 *     (the page) — the pillar already owns the broad ERP/CRM/SaaS story;
 *     modernising an existing system is a distinct enough problem, mentioned
 *     but never expanded on in the pillar's own summary, to deserve its own
 *     page.
 *   - "Healthcare Software" becomes "EHR & Clinical Systems Development" —
 *     distinct from "Medical Billing", which gets its own page because
 *     revenue-cycle work is a genuinely different buyer and problem than
 *     clinical software.
 *   - "AML Systems" and "CFT Compliance" become three narrower pages —
 *     sanctions/PEP screening, transaction monitoring, and goAML/FMU
 *     reporting — because those are three different subsystems with three
 *     different technical concerns, not one topic said three ways.
 *
 * Every spoke still traces back to one of the original 22 cards. None of this
 * invents a new service; it gives each real capability a search intent
 * specific enough to actually rank for, and routes internal link equity from
 * the spoke up to the pillar and sideways to its siblings.
 *
 * CONTENT RULES — same as every other content file in this codebase:
 *   - No invented pricing, timelines, team size, client names or project
 *     counts. Where a buyer would ask for a number, the FAQ explains what
 *     determines it instead of making one up.
 *   - No technology or standard is named here unless it already appears in
 *     content/servicePages.ts `stack` for the parent pillar, or in
 *     lib/seo.ts `knowsAbout`. This file does not claim new expertise.
 *   - `relatedCaseStudies` and `relatedPosts` only reference content that
 *     actually exists in content/caseStudies.ts and content/blogPosts.ts, and
 *     only where the connection is real, not padding.
 */

export interface ServiceSpokeFaq extends FaqItem {}

export interface ServiceSpoke {
  slug: string;
  /** Slug of the parent pillar in content/servicePages.ts. */
  parentSlug: string;
  /** Short label for cards, nav and breadcrumbs. */
  navLabel: string;
  /** H1. Names the specific capability, not the parent category. */
  h1: string;
  /** <title> without the brand suffix; layout appends " | NovuLabs". */
  seoTitle: string;
  /** Meta description, 140–165 characters. */
  description: string;
  /** One sentence, used on hub and pillar "related" cards. */
  summary: string;
  /** Bootstrap icon class — reused from the matching homepage card. */
  icon: string;
  /** Intro paragraph(s), before any heading. */
  intro: string[];
  /** "What We Offer" — rendered as H3 subsections. */
  offerings: { title: string; body: string }[];
  /** "How We Help" — the business problems this solves, as paragraphs. */
  howWeHelp: string[];
  /** "Our Approach" — method, as paragraphs. */
  approach: string[];
  /** Subset of the parent pillar's real stack. */
  technologies: string[];
  /** Subset of content/siteData.ts `industries` titles that genuinely apply. */
  industries: string[];
  faqs: ServiceSpokeFaq[];
  /** Sibling spoke slugs worth cross-linking. */
  relatedSpokes: string[];
  /** Slugs from content/caseStudies.ts. */
  relatedCaseStudies: string[];
  /** Slugs from content/blogPosts.ts. */
  relatedPosts: string[];
}

export const serviceSpokes: ServiceSpoke[] = [
  // ===========================================================================
  // PILLAR: web-development
  // ===========================================================================
  {
    slug: 'corporate-website-development',
    parentSlug: 'web-development',
    navLabel: 'Website Development',
    h1: 'Corporate Website Development',
    seoTitle: 'Corporate Website Development Services',
    description:
      'Corporate and marketing website development built server-rendered and content-led, distinct from portal or web-app engineering. Fast, accessible, easy to update.',
    summary: 'Marketing and corporate sites built to load fast, read cleanly and rank, not just look finished in a demo.',
    icon: 'bi-globe',
    intro: [
      'A corporate website is a different engineering problem than a customer portal or an admin console. It is read far more than it is used, most of its visitors arrive from a search result rather than a login screen, and its job is to load fast, explain the business clearly, and hand off cleanly to a contact form or a sales conversation.',
      'This page covers that specific work: marketing sites, corporate sites and content-led public sites. Portals, dashboards and authenticated web applications are a related but different service, covered on the parent web platform page linked below.',
    ],
    offerings: [
      { title: 'Content-first architecture', body: 'Pages structured around what a visitor is trying to find, with a content model that a non-technical team can update without touching code.' },
      { title: 'Technical SEO built in', body: 'Semantic HTML, correct heading structure, clean URLs, sitemap and metadata handled at the framework level rather than bolted on with a plugin afterwards.' },
      { title: 'Performance as a requirement, not a goal', body: 'Server-rendered pages, optimised images and minimal client-side JavaScript, because a slow corporate site loses visitors before they read a word.' },
      { title: 'Design system handoff', body: 'A component library the team can extend, so a new landing page or campaign site does not mean starting from a blank file.' },
    ],
    howWeHelp: [
      'Most corporate sites we are asked to rebuild are not broken, they are slow, hard to update, or built on a stack the original agency stopped supporting. The fix is rarely a redesign; it is usually a rebuild on infrastructure the client actually controls.',
      'The second common request is a site that was built to look good in a pitch and never accounted for how search engines or screen readers actually parse a page. We build for both from the first commit rather than retrofitting accessibility and SEO once traffic depends on it.',
    ],
    approach: [
      'We start from the pages that carry commercial weight (home, services, contact) and the information architecture that connects them, before touching visual design. A fast site with a confusing structure still loses visitors.',
      'Server-side rendering by default. Client-side JavaScript is added only where a real interaction needs it, not as a framework default.',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    industries: ['Banking & Fintech', 'Healthcare & MedTech', 'Manufacturing & Logistics'],
    faqs: [
      { q: 'How is this different from your web platform development service?', a: 'This page covers marketing and corporate sites: content-led, public, largely read rather than logged into. The web platform service covers portals, admin consoles and applications with authentication and workflow behind them. Many projects need both, built on the same stack so they share components.' },
      { q: 'Can you work with our existing brand and content, or do we need a full redesign?', a: 'Most rebuilds keep the existing brand and reuse existing copy where it works. A rebuild is usually about the engineering underneath: speed, structure and how easy the site is to maintain, not the visual identity.' },
      { q: 'Will our content team be able to update the site without a developer?', a: 'Yes, that is a specific requirement we design for. The content model is built so routine updates, like a new page or a changed price, do not need an engineering ticket.' },
      { q: 'Do you handle the SEO migration if we are moving from an existing site?', a: 'Yes. Redirect mapping, preserving indexed URLs where they are valuable, and verifying the new site’s sitemap and canonical tags are part of a migration, not an afterthought.' },
    ],
    relatedSpokes: ['api-development-integration', 'custom-saas-development'],
    relatedCaseStudies: [],
    relatedPosts: [],
  },

  // ===========================================================================
  // PILLAR: enterprise-software-development
  // ===========================================================================
  {
    slug: 'legacy-system-modernization',
    parentSlug: 'enterprise-software-development',
    navLabel: 'Legacy System Modernization',
    h1: 'Legacy System Modernization',
    seoTitle: 'Legacy System Modernization Services',
    description:
      'Modernizing legacy enterprise systems: migrating aging platforms, replacing unsupported stacks, and untangling business logic without stopping the business.',
    summary: 'Replacing or re-platforming an aging system that the business depends on but nobody wants to touch anymore.',
    icon: 'bi-cpu-fill',
    intro: [
      'Most organisations do not decide to modernise a system because it stopped working. They decide because the vendor stopped supporting it, the one engineer who understood it left, or every new feature now takes three times as long as it should. The system still runs; the risk is that it keeps running exactly until the day it cannot be fixed.',
      'This work sits underneath our broader enterprise software practice, specifically for organisations replacing or re-platforming something that already exists rather than building from a blank page.',
    ],
    offerings: [
      { title: 'System and data audit', body: 'Mapping what the current system actually does, including the undocumented business logic and workarounds that accumulate over a decade, before deciding what to keep.' },
      { title: 'Incremental migration paths', body: 'Running the old and new systems side by side where the business cannot tolerate downtime, with a defined cutover rather than a single high-risk switch.' },
      { title: 'Data migration and reconciliation', body: 'Moving historical data with validation that the new system’s records reconcile against the old, not just that the migration script completed.' },
      { title: 'Integration continuity', body: 'Keeping every system that depends on the one being replaced working throughout the migration, not just on the day it goes live.' },
    ],
    howWeHelp: [
      'The risk in legacy modernisation is rarely the new system. It is everything built around the old one over the years: reports that read a database directly, a batch job nobody remembers the purpose of, an integration held together by a script on someone’s laptop. We spend real time finding those before writing new code.',
      'A second recurring problem is that "modernise" gets treated as "rebuild everything." Often the better answer is replacing the parts that are genuinely failing and leaving what still works alone, which is cheaper and lower risk than a full rewrite.',
    ],
    approach: [
      'We audit before we propose. A modernisation plan written before anyone has read the existing system’s actual behaviour is a guess, and the client usually already has one of those from a previous vendor.',
      'Where possible, we run new and old in parallel against the same data, so the comparison is a fact rather than an assumption at cutover.',
    ],
    technologies: ['.NET', 'Java', 'React', 'Node.js', 'PostgreSQL', 'Azure', 'AWS', 'Kubernetes'],
    industries: ['Banking & Fintech', 'Manufacturing & Logistics', 'Government & Public Sector'],
    faqs: [
      { q: 'How do you decide what to rebuild versus what to leave alone?', a: 'By what is actually failing: unsupported dependencies, a vendor that no longer exists, or a bottleneck that blocks new work. A system that is inconvenient but stable is a lower priority than one that is an active operational risk.' },
      { q: 'Can this be done without stopping the business that depends on the old system?', a: 'In most cases yes, through a phased cutover where old and new run in parallel for a defined period. Whether zero-downtime migration is realistic depends on how tightly the current system is coupled to everything around it, which is part of the audit.' },
      { q: 'What happens to our historical data?', a: 'It migrates with reconciliation, meaning we verify the new system’s records match the old ones for a sample and for edge cases, not only that the transfer script ran without an error.' },
      { q: 'How long does a legacy migration usually take?', a: 'It depends far more on how well the current system is documented and how many other systems integrate with it than on the size of the new build. We scope this after the audit rather than before it.' },
    ],
    relatedSpokes: ['erp-software-development', 'custom-saas-development', 'api-development-integration'],
    relatedCaseStudies: ['omnierp-manufacturing-suite'],
    relatedPosts: ['why-custom-saas-outperforms-off-the-shelf-erp'],
  },
  {
    slug: 'erp-software-development',
    parentSlug: 'enterprise-software-development',
    navLabel: 'ERP Systems',
    h1: 'ERP Software Development',
    seoTitle: 'ERP Software Development Services',
    description:
      'Custom ERP development covering finance, HR, procurement and supply chain in one system, built around how your organisation actually operates, not a template.',
    summary: 'ERP built around your actual processes, for organisations where an off-the-shelf module list stops fitting.',
    icon: 'bi-diagram-3-fill',
    intro: [
      'Off-the-shelf ERP works well for organisations whose processes look like the software vendor’s template. It works less well for a manufacturer with a specific production workflow, or an organisation whose finance and procurement processes exist for a genuine regulatory or operational reason that the standard module cannot express.',
      'We build ERP systems around the process, not the other way round, integrating finance, HR, procurement and supply chain data into one authoritative system rather than reconciling spreadsheets between departments.',
    ],
    offerings: [
      { title: 'Process-first design', body: 'Modelling the actual approval chains, cost centres and stock movements your organisation uses, instead of mapping your process onto a generic module set.' },
      { title: 'Finance and procurement integration', body: 'Purchase orders, invoicing, budgeting and cost tracking that share one ledger, so finance is not reconciling three exports at month end.' },
      { title: 'Supply chain and inventory', body: 'Stock levels, warehouse movement and supplier data kept current across every location that touches inventory.' },
      { title: 'Reporting built for decisions', body: 'Dashboards scoped to what a specific role actually needs to act on, not a data dump labelled "reports".' },
    ],
    howWeHelp: [
      'The recurring problem we see is departments that have each built their own workaround: a finance spreadsheet, a separate procurement tool, a warehouse system that does not talk to either. None of them is wrong individually, but nobody has a single, current view of the business.',
      'A custom ERP is not always the right answer to that problem. Where a mature product genuinely covers the requirement, we say so before proposing a build. Custom ERP earns its cost when the process itself is the competitive advantage, not when it is a commodity workflow with a specific product already built for it.',
    ],
    approach: [
      'We map the current process with the people who actually run it, not just the department head who describes how it is supposed to work.',
      'Modules ship in an order that delivers value early, usually finance and procurement first since they touch the most departments, rather than building the whole system before anyone can use any of it.',
    ],
    technologies: ['.NET', 'Java', 'PostgreSQL', 'SQL Server', 'Azure', 'AWS'],
    industries: ['Manufacturing & Logistics', 'Government & Public Sector', 'Banking & Fintech'],
    faqs: [
      { q: 'When does custom ERP make sense instead of an established product like SAP or Odoo?', a: 'When your process is genuinely different from what the standard modules assume, not when it is merely inconvenient to change your process to fit them. If the honest answer is that your workflow could adapt to a mature product, that is usually the cheaper and lower-risk path, and we will say so.' },
      { q: 'Can a new ERP integrate with systems we are keeping, like an existing accounting platform?', a: 'Yes, that is typically part of the scope rather than an exception. Most ERP rollouts replace some systems and integrate with others; deciding which is which is part of the initial process mapping.' },
      { q: 'How do you handle data migration from spreadsheets or an old ERP?', a: 'With validation against the source, checking that totals, historical records and edge cases reconcile, not just that a bulk import completed without an error message.' },
      { q: 'Do you roll out every module at once or in phases?', a: 'Phases, generally. Rolling out finance and procurement first tends to deliver value earliest and lets the team validate the system on real data before the harder integrations, like supply chain, go live.' },
    ],
    relatedSpokes: ['crm-software-development', 'legacy-system-modernization', 'custom-saas-development'],
    relatedCaseStudies: ['omnierp-manufacturing-suite'],
    relatedPosts: ['why-custom-saas-outperforms-off-the-shelf-erp'],
  },
  {
    slug: 'crm-software-development',
    parentSlug: 'enterprise-software-development',
    navLabel: 'CRM Systems',
    h1: 'CRM Software Development',
    seoTitle: 'Custom CRM Software Development',
    description:
      'Custom CRM development for sales and relationship processes that off-the-shelf CRM cannot express: lead scoring, pipeline logic and omnichannel data in one record.',
    summary: 'A CRM built around your sales and relationship process, when a general-purpose CRM makes you adapt to it instead.',
    icon: 'bi-people-fill',
    intro: [
      'General-purpose CRM platforms are built to fit as many sales processes as possible, which means every organisation ends up customising pipeline stages, fields and automations until the underlying platform is barely visible. At a certain point, the customisation itself becomes the maintenance burden.',
      'A custom CRM makes sense once your relationship data, lead scoring logic, or pipeline structure has outgrown what the platform’s configuration options can express without workarounds.',
    ],
    offerings: [
      { title: 'Pipeline and process modelling', body: 'Sales or relationship stages that match how deals or cases actually move through your organisation, including the branches and exceptions a generic pipeline flattens.' },
      { title: 'Lead scoring and prioritisation', body: 'Scoring logic built around signals that are genuinely predictive for your business, not a default weighting borrowed from an unrelated industry.' },
      { title: 'Omnichannel record unification', body: 'Email, calls, meetings and support interactions attached to one customer record instead of scattered across the tools each team happens to use.' },
      { title: 'Analytics and forecasting', body: 'Pipeline and conversion reporting built on your actual stage definitions, so the numbers mean what leadership thinks they mean.' },
    ],
    howWeHelp: [
      'The most common trigger for a custom CRM is a sales or account management process that a platform’s configuration cannot represent without a workaround the team routes around within a quarter. Once reps are keeping a "real" pipeline in a spreadsheet alongside the CRM, the CRM has stopped doing its job.',
      'We also build CRM systems for organisations whose relationship data has to integrate tightly with an internal system, like a core banking platform or a case management tool, where a general CRM’s integration options are too shallow.',
    ],
    approach: [
      'We start with how deals or relationships actually move through your organisation today, including the exceptions and manual overrides, before designing the pipeline logic.',
      'Where the data already lives in another system you are keeping, we integrate rather than duplicate, so the CRM is not a second, slightly different copy of the truth.',
    ],
    technologies: ['.NET', 'Java', 'React', 'Node.js', 'PostgreSQL'],
    industries: ['Banking & Fintech', 'Healthcare & MedTech', 'E-Commerce & Retail'],
    faqs: [
      { q: 'Why build a CRM instead of customising Salesforce or HubSpot?', a: 'Configuration on an established platform is usually the right first move and the lower-cost one. Custom development becomes worthwhile when the customisation has hit a ceiling: the platform’s data model, automation limits or integration depth cannot express what your process actually needs.' },
      { q: 'Can a custom CRM integrate with our existing marketing or support tools?', a: 'Yes, and for most builds that integration is a core requirement rather than an add-on, since a CRM that does not connect to email, calendars and support is only half the record.' },
      { q: 'How do you handle lead scoring if we do not have a defined model yet?', a: 'We work from the signals your team already treats as meaningful, like deal size, engagement history or account industry, and build a scoring model you can adjust as you gather more outcome data rather than shipping a black box.' },
      { q: 'What happens to our existing CRM data during a migration?', a: 'It migrates with field-level mapping and reconciliation against the source system, so historical deal history and contact records carry over rather than starting from zero.' },
    ],
    relatedSpokes: ['erp-software-development', 'custom-saas-development'],
    relatedCaseStudies: ['novucrm-intelligence-suite'],
    relatedPosts: [],
  },
  {
    slug: 'government-portal-development',
    parentSlug: 'enterprise-software-development',
    navLabel: 'Government Portals',
    h1: 'Government Portal Development',
    seoTitle: 'Government Portal Development Services',
    description:
      'Government-grade portal development: identity verification, tax filing and digital signatures built to the audit standard public-sector contracts require.',
    summary: 'Public-sector portals built for the security, availability and audit trail a government contract requires.',
    icon: 'bi-buildings-fill',
    intro: [
      'A government portal is judged differently than a commercial one. Availability, security and auditability are contractual requirements rather than quality goals, and the system has to hold up under a security review from people who will never use it day to day, not just a user acceptance test.',
      'We build national identity, tax filing, and citizen-service portals with that review in mind from the architecture stage, including the identity and digital-signature infrastructure they depend on.',
    ],
    offerings: [
      { title: 'National identity integration', body: 'CNIC and biometric verification flows built for real failure modes: partial matches, timeouts and what a citizen sees when verification fails, not just the success path.' },
      { title: 'Digital signatures and e-seals', body: 'PKI-based signing for documents and filings that need to be legally attributable, with the key management that a government audit will ask about.' },
      { title: 'Tax and revenue filing', body: 'Filing portals that integrate directly with the relevant revenue authority’s systems rather than exporting data for manual submission.' },
      { title: 'Citizen service workflows', body: 'Application, approval and status-tracking flows designed for a wide range of technical literacy and connectivity, not just for a power user.' },
    ],
    howWeHelp: [
      'Government procurement usually asks for evidence up front: security architecture, data-handling documentation, and audit trails, before the first line of code is written for the public-facing part of the system. We treat that documentation as part of the deliverable, not paperwork produced after the fact to pass review.',
      'The technical risk in these systems is rarely the visible portal. It is the identity verification and signature infrastructure underneath it, where a wrong assumption about network reliability or a citizen’s documentation shows up as a support burden at scale.',
    ],
    approach: [
      'Security and data-handling architecture are designed against the review the system will actually face, not against a generic checklist, which means understanding the specific procurement’s requirements before writing code.',
      'We design the failure paths (a biometric mismatch, a network timeout, an expired document) as carefully as the success path, because in a citizen-facing government system those failures are common, not edge cases.',
    ],
    technologies: ['.NET', 'Java', 'PostgreSQL', 'Azure', 'AWS', 'Kubernetes'],
    industries: ['Government & Public Sector'],
    faqs: [
      { q: 'What identity verification do you support for government portals?', a: 'CNIC and biometric verification against national identity infrastructure, including handling partial matches and verification failures gracefully rather than only building the happy path.' },
      { q: 'How do you handle the security review process for government contracts?', a: 'By producing the security and data-handling documentation the review will ask for as part of the build, not retrofitted afterwards, and by designing the architecture against the specific procurement’s requirements from the outset.' },
      { q: 'Can this integrate with an existing government system we cannot modify?', a: 'Usually yes, through the APIs or file interfaces that system already exposes. Where a legacy government system has a limited integration surface, we design around that constraint rather than assuming it can change.' },
      { q: 'What happens when a citizen’s biometric or document verification fails?', a: 'That path gets designed as carefully as the successful one: a clear explanation of what failed, a fallback verification route where the process allows one, and a support path that does not require a citizen to already understand the system.' },
    ],
    relatedSpokes: ['api-development-integration', 'erp-software-development'],
    relatedCaseStudies: ['natid-verification-portal', 'taxlink-revenue-portal'],
    relatedPosts: ['nadra-ekyc-cnic-verification-integration-guide'],
  },
  {
    slug: 'api-development-integration',
    parentSlug: 'enterprise-software-development',
    navLabel: 'API Development',
    h1: 'API Development and Integration',
    seoTitle: 'API Development & Integration Services',
    description:
      'RESTful and GraphQL API development for enterprise systems, plus integration work connecting existing platforms that were never designed to talk to each other.',
    summary: 'APIs and integrations that connect the systems your organisation already runs, built with the security a shared endpoint needs.',
    icon: 'bi-plug-fill',
    intro: [
      'Most enterprise problems that look like "we need a new system" are actually integration problems: two platforms that hold overlapping data and never agreed on which one is authoritative. Building an API is the easy part; deciding what the API actually represents, and securing it properly, is where the real work is.',
      'We design and build APIs for new systems and integration layers connecting existing ones, whether that means a public developer-facing API or an internal service boundary nobody outside the organisation will ever see.',
    ],
    offerings: [
      { title: 'API design', body: 'RESTful and GraphQL APIs designed around the resources and operations a consumer actually needs, with versioning that lets the underlying system change without breaking every integration.' },
      { title: 'Authentication and access control', body: 'Rate limiting, scoped access tokens and audit logging appropriate to what the API exposes, from a public developer portal to an internal-only service.' },
      { title: 'Legacy system integration', body: 'Building an API layer in front of a system that was never designed to expose one, so it can participate in newer architecture without a rewrite.' },
      { title: 'Documentation and developer experience', body: 'Documentation that a third-party or internal developer can actually integrate against without a support ticket for every question.' },
    ],
    howWeHelp: [
      'A recurring pattern: two systems both hold customer or transaction data, both are considered "the source of truth" by different teams, and nobody has designed which one actually owns which field. An integration project that skips that question ships a synchronisation bug instead of a solution.',
      'We also build API layers specifically so a legacy system can be modernised incrementally, rather than needing to be replaced all at once before anything new can be built on top of it.',
    ],
    approach: [
      'We define data ownership before writing integration code: which system is authoritative for which field, and what happens when two systems disagree.',
      'API contracts are versioned from the first release, so a breaking change in one system does not silently break every consumer of its API.',
    ],
    technologies: ['Node.js', 'Java', '.NET', 'PostgreSQL', 'Kafka'],
    industries: ['Banking & Fintech', 'Healthcare & MedTech', 'Manufacturing & Logistics'],
    faqs: [
      { q: 'Do you build public developer-facing APIs or only internal ones?', a: 'Both. The security, versioning and documentation requirements differ significantly between a public API third parties will integrate against and an internal service boundary, and we scope for the actual audience rather than treating every API the same way.' },
      { q: 'Can you build an API in front of a system we cannot modify?', a: 'Yes, that is a common request, particularly for legacy systems that were never designed with an API in mind. The integration layer sits in front of the existing system rather than requiring changes to it.' },
      { q: 'How do you decide which system owns which data when two platforms overlap?', a: 'By mapping the actual data flow with the teams that use each system, then defining ownership explicitly rather than assuming it. This is usually the first and most important step in any integration project, before any code is written.' },
      { q: 'What happens when we need to change the API later without breaking existing integrations?', a: 'Versioning is built in from the first release specifically so this is possible. A new version can ship alongside the old one, giving existing integrations time to migrate rather than breaking on deployment.' },
    ],
    relatedSpokes: ['legacy-system-modernization', 'financial-messaging-schema-integration', 'corporate-website-development'],
    relatedCaseStudies: [],
    relatedPosts: [],
  },
  {
    slug: 'custom-saas-development',
    parentSlug: 'enterprise-software-development',
    navLabel: 'Custom SaaS Platforms',
    h1: 'Custom SaaS Platform Development',
    seoTitle: 'Custom SaaS Development Services',
    description:
      'Multi-tenant SaaS development with subscription billing and tenant isolation designed in from the start, not retrofitted after the first paying customer.',
    summary: 'Multi-tenant SaaS built with tenant isolation and billing designed in from day one, not bolted on after customer one.',
    icon: 'bi-layers-fill',
    intro: [
      'Multi-tenancy is a decision that is expensive to change after the fact. How tenant data is isolated, how billing ties to usage, and whether a customer can white-label the product all shape the database schema and the deployment model from the first release, not just the marketing page.',
      'We build SaaS platforms with those decisions made deliberately at the start: data isolation strategy, subscription and billing logic, and the deployment model for tenants that need dedicated infrastructure.',
    ],
    offerings: [
      { title: 'Tenant isolation architecture', body: 'A data isolation model, shared schema, separate schema, or fully separate infrastructure, chosen based on your actual compliance and scale requirements rather than defaulted.' },
      { title: 'Subscription and billing', body: 'Usage-based, seat-based or tiered billing logic integrated with the product itself, so plan limits and metering are enforced where the feature actually lives.' },
      { title: 'White-labelling and customisation', body: 'Tenant-level branding and configuration that does not require a code branch per customer to maintain.' },
      { title: 'Onboarding and admin tooling', body: 'Internal tools for provisioning, supporting and monitoring tenants, which is usually the part a first SaaS build underinvests in and regrets within a year.' },
    ],
    howWeHelp: [
      'The most expensive SaaS mistake we see is a data model built for a single customer, then adapted tenant by tenant as new customers arrive. Every adaptation makes the next one harder, and eventually a genuine multi-tenant rebuild becomes unavoidable while the business is still running on the old system.',
      'We also build the internal tooling most teams defer, provisioning, support access and usage monitoring, because a SaaS platform without it means every customer issue becomes an engineering escalation.',
    ],
    approach: [
      'Tenant isolation strategy is decided against your actual regulatory and scale requirements before the schema is designed, since retrofitting isolation later usually means a migration with the business already live.',
      'Billing logic lives close to the feature it governs, so a plan limit is enforced in the same place the feature is implemented, not in a separate system that can drift out of sync.',
    ],
    technologies: ['Node.js', 'React', 'TypeScript', 'PostgreSQL', 'Kubernetes', 'AWS'],
    industries: ['Banking & Fintech', 'Healthcare & MedTech', 'E-Commerce & Retail'],
    faqs: [
      { q: 'What tenant isolation model is right for us: shared schema or separate infrastructure?', a: 'It depends on your compliance requirements and the size of your largest customers. A shared schema with row-level isolation is usually cheaper to run and sufficient for most SaaS products; regulated or enterprise customers sometimes require dedicated infrastructure, which we design for where genuinely needed rather than by default.' },
      { q: 'Can you migrate an existing single-tenant application to multi-tenant?', a: 'Yes, though the scope depends heavily on how the current data model assumes a single customer. This is usually a larger project than it first appears, and we scope it after reviewing the existing schema.' },
      { q: 'How is billing handled: is that something you build or integrate?', a: 'Both are options depending on complexity. Simple subscription tiers often integrate cleanly with a payment processor’s billing product; usage-based or seat-based billing with plan enforcement inside the product usually needs custom logic tied to the feature itself.' },
      { q: 'Do you build the admin tools for managing tenants, or just the customer-facing product?', a: 'Both, and we treat the admin side as a first-class part of the build. Tenant provisioning, support access and usage visibility are what let your team run the platform without every issue becoming an engineering ticket.' },
    ],
    relatedSpokes: ['legacy-system-modernization', 'erp-software-development'],
    relatedCaseStudies: [],
    relatedPosts: ['why-custom-saas-outperforms-off-the-shelf-erp'],
  },

  // ===========================================================================
  // PILLAR: fintech-software-development
  // ===========================================================================
  {
    slug: 'core-banking-software-development',
    parentSlug: 'fintech-software-development',
    navLabel: 'Financial Software',
    h1: 'Core Banking Software Development',
    seoTitle: 'Core Banking Software Development',
    description:
      'Core banking platform development and modernization: account management, ledgers and lending systems engineered alongside your existing core, not a full replacement.',
    summary: 'Core banking and lending platform engineering, usually alongside an existing core rather than replacing it outright.',
    icon: 'bi-bank',
    intro: [
      'Most institutions do not replace their core banking system outright; the risk and cost of a full replacement is rarely justified when the actual need is a specific capability the existing core cannot support. Our core banking work usually means building alongside an incumbent core, at the transaction event and customer record level.',
      'This covers account management, ledger systems, digital wallets and lending platforms, whether that is a new capability layered on an existing core or a modernised replacement for one part of it.',
    ],
    offerings: [
      { title: 'Account and ledger systems', body: 'Double-entry ledger design and account management built for audit correctness, since a banking ledger has to be provably right, not just functionally correct.' },
      { title: 'Digital wallets and lending platforms', body: 'Wallet balance and transaction management, and lending origination and servicing systems, built to integrate with an existing core rather than assume a greenfield environment.' },
      { title: 'Core-adjacent integration', body: 'A transaction event stream your core can emit into, where the core itself cannot be modified, so new capability does not require touching the system of record.' },
      { title: 'Regulatory reporting hooks', body: 'Ledger and transaction data structured so it can feed AML, tax and prudential reporting without a separate reconciliation step.' },
    ],
    howWeHelp: [
      'The central question in almost every core banking engagement is whether the existing core can emit an immutable transaction event stream. Where it can, we integrate at that level and build new capability without touching the core. Where it cannot, that gap becomes the first thing we build, because everything downstream depends on it.',
      'We do not default to "replace the core." A full core replacement is a multi-year, high-risk undertaking that is justified far less often than vendors selling core replacements suggest, and we say so when a narrower, integration-based approach solves the actual problem.',
    ],
    approach: [
      'We assess the existing core’s integration surface before proposing an architecture: what it can emit, what it can accept, and where the gaps are.',
      'New ledger or account logic is designed to reconcile against the core’s own records continuously, not just at go-live, since a ledger discrepancy discovered months later is far more expensive to trace.',
    ],
    technologies: ['Node.js', 'Java', 'Go', 'PostgreSQL', 'Kafka', 'ISO 8583', 'ISO 20022'],
    industries: ['Banking & Fintech'],
    faqs: [
      { q: 'Do you replace our existing core banking system or work alongside it?', a: 'Alongside it in most cases. Full core replacement is a significant undertaking that is only justified when the existing core genuinely cannot support what the institution needs, and we assess that honestly rather than defaulting to a replacement.' },
      { q: 'What if our current core cannot emit a real-time transaction feed?', a: 'That becomes the first thing we build: an event stream or polling layer that gives new systems a reliable view of transactions without modifying the core itself.' },
      { q: 'How do you ensure a new ledger reconciles with our existing books?', a: 'Through continuous reconciliation against the core’s own records rather than a one-time validation at launch, so any discrepancy surfaces immediately instead of months later.' },
      { q: 'Can this support both digital wallets and traditional lending products?', a: 'Yes, both are built on the same underlying account and ledger architecture, which is more efficient than treating them as unrelated systems.' },
    ],
    relatedSpokes: ['payment-gateway-development', 'mastercard-visa-integration', 'transaction-monitoring-software-development'],
    relatedCaseStudies: ['corebanking-aml-suite', 'finsync-digital-wallet'],
    relatedPosts: ['raast-integration-guide-instant-payments-pakistan'],
  },
  {
    slug: 'payment-gateway-development',
    parentSlug: 'fintech-software-development',
    navLabel: 'Payment Gateways',
    h1: 'Payment Gateway Development',
    seoTitle: 'PCI-DSS Payment Gateway Development',
    description:
      'Payment gateway development engineered to PCI-DSS requirements: card processing, local rail connectivity and settlement reconciliation for licensed institutions.',
    summary: 'Payment gateway and switching infrastructure engineered to PCI-DSS, connecting card networks and local payment rails.',
    icon: 'bi-credit-card-2-front',
    intro: [
      'A payment gateway sits at the point where a transaction can fail expensively and publicly, so the engineering discipline around it is different from most software: every state has to be recoverable, every failure mode has to be handled explicitly, and the system has to be built to PCI-DSS requirements from the start rather than audited into compliance afterwards.',
      'We build payment gateways and switching infrastructure that connect card networks and local payment rails, for licensed institutions and EMIs that need infrastructure they control rather than a black-box processor.',
    ],
    offerings: [
      { title: 'Card processing and switching', body: 'Transaction routing and switching built on ISO 8583 and ISO 20022 messaging, handling authorisation, capture and reversal with the state machine correctness a payment flow requires.' },
      { title: 'Local rail connectivity', body: 'Integration with RAAST and 1LINK for institutions operating in Pakistan, or the equivalent local instant-payment infrastructure elsewhere.' },
      { title: 'Settlement and reconciliation', body: 'Reconciliation logic that catches a mismatch between what was authorised, what settled, and what the ledger records, since that gap is where payment systems quietly lose money.' },
      { title: 'PCI-DSS-aligned architecture', body: 'Tokenisation, scoped access and audit logging designed to the requirements a PCI-DSS assessment will test, engineered in rather than retrofitted before an audit.' },
    ],
    howWeHelp: [
      'The failure mode we design against most carefully is the partial transaction: authorisation succeeds, capture fails, and the system is left in a state where money has moved but the ledger disagrees about how much or to whom. Most payment outages we are called in to fix trace back to a state this was never designed for.',
      'We also build for reconciliation from day one rather than adding it once a discrepancy is discovered. A gateway that cannot prove its own numbers match the network’s is not something a bank can put its name behind.',
    ],
    approach: [
      'Every transaction state, authorised, captured, reversed, failed, timed out, is modelled explicitly before implementation, because the states nobody designs for are the ones that cause incidents.',
      'PCI-DSS scope is defined early: which components touch card data, and how to minimise that surface, since a smaller scope is both more secure and cheaper to audit.',
    ],
    technologies: ['Node.js', 'Java', 'Go', 'PostgreSQL', 'Kafka', 'ISO 8583', 'ISO 20022', 'RAAST', '1LINK', 'PCI-DSS'],
    industries: ['Banking & Fintech', 'E-Commerce & Retail'],
    faqs: [
      { q: 'Does NovuLabs hold PCI-DSS certification?', a: 'No, and that distinction matters: PCI-DSS certification is held by the institution operating the payment environment, not by the development vendor building it. We engineer to PCI-DSS requirements; the certification itself belongs to whoever runs the certified environment.' },
      { q: 'Can you integrate with RAAST or 1LINK for a Pakistani institution?', a: 'Yes, that connectivity is a core part of this work for institutions operating locally, alongside card network integration for organisations that also need Mastercard or Visa connectivity.' },
      { q: 'How do you handle a transaction that fails partway through processing?', a: 'By modelling every intermediate state explicitly before implementation, so a failure at any point has a defined, recoverable outcome rather than leaving the ledger and the network settlement disagreeing about what happened.' },
      { q: 'What happens during reconciliation if our ledger and the network settlement do not match?', a: 'The reconciliation process is built to surface that discrepancy immediately with enough detail to investigate it, rather than requiring someone to notice a shortfall days later during a manual review.' },
    ],
    relatedSpokes: ['mastercard-visa-integration', 'core-banking-software-development'],
    relatedCaseStudies: ['tranzaxis-payment-gateway', 'finsync-digital-wallet'],
    relatedPosts: ['raast-integration-guide-instant-payments-pakistan'],
  },
  {
    slug: 'mastercard-visa-integration',
    parentSlug: 'fintech-software-development',
    navLabel: 'Mastercard / Visa Integration',
    h1: 'Mastercard and Visa Integration',
    seoTitle: 'Mastercard & Visa Integration Services',
    description:
      'Card scheme integration for issuing and acquiring, including MDES and VTS tokenization, taken through scheme certification with the operating institution.',
    summary: 'Card scheme issuing and acquiring integration, including tokenization, taken through certification with the institution that operates it.',
    icon: 'bi-patch-check-fill',
    intro: [
      'Integrating with Mastercard and Visa is not a single API call; it is a certification process the scheme runs against the institution operating the platform, covering issuing, acquiring, and tokenisation depending on what the institution offers. We build the technical integration and support the institution through that certification process.',
      'This work is scheme-specific and detail-heavy: message formats, tokenisation flows and the specific test cases each network requires before granting production access.',
    ],
    offerings: [
      { title: 'Issuing integration', body: 'Card issuing flows including provisioning, authorisation and lifecycle management for institutions issuing Mastercard or Visa cards.' },
      { title: 'Acquiring integration', body: 'Merchant acquiring connectivity for institutions processing card payments on the acceptance side.' },
      { title: 'Tokenisation: MDES and VTS', body: 'Mastercard Digital Enablement Service and Visa Token Service integration for tokenised card credentials in digital wallets and card-on-file scenarios.' },
      { title: 'Certification support', body: 'Preparing the technical documentation and test evidence the scheme requires, and supporting the institution through its own certification process.' },
    ],
    howWeHelp: [
      'Scheme certification fails most often on detail: a message field formatted slightly wrong, a test case the integration was not built to handle, a tokenisation flow that works for the common path but not the specific edge case the scheme tests for. We build against the scheme’s actual specification and test cases, not a simplified interpretation of them.',
      'We are precise about who holds what here. Scheme certification is issued to the institution operating the platform, not to us as the development vendor. Our role is building the integration correctly and supporting the institution’s own certification process, and we do not represent that differently.',
    ],
    approach: [
      'We work from the scheme’s current technical specification rather than a prior integration, since Mastercard and Visa update requirements and a stale reference is a common source of certification failures.',
      'Test cases are run against the scheme’s own certification suite before submission, so issues surface internally rather than during the formal certification cycle.',
    ],
    technologies: ['Node.js', 'Java', 'Go', 'PostgreSQL', 'Kafka', 'ISO 8583', 'PCI-DSS'],
    industries: ['Banking & Fintech'],
    faqs: [
      { q: 'Is NovuLabs Mastercard or Visa certified?', a: 'No, and this is precise rather than a technicality: scheme certification is issued to the institution operating the platform, not to the firm that built it. We engineer the integration and support the institution through its own certification with the scheme.' },
      { q: 'What is the difference between MDES and VTS?', a: 'MDES is Mastercard’s tokenisation service and VTS is Visa’s equivalent. Both replace a stored card number with a token for digital wallet and card-on-file use, and which one (or both) you need depends on which schemes your cards are issued on.' },
      { q: 'How long does scheme certification typically take?', a: 'It depends on the scheme, the specific certification track, and how many rounds of test-case failures occur before the submission passes. We do not quote a fixed timeline because it is genuinely outside our control; our part is building the integration to minimise avoidable failures.' },
      { q: 'Do you support both issuing and acquiring, or just one?', a: 'Both, depending on what the institution offers. Issuing and acquiring are different integration paths with different requirements, and we scope for whichever, or both, applies to your business.' },
    ],
    relatedSpokes: ['payment-gateway-development', 'core-banking-software-development'],
    relatedCaseStudies: ['tranzaxis-payment-gateway', 'finsync-digital-wallet'],
    relatedPosts: [],
  },

  // ===========================================================================
  // PILLAR: aml-cft-compliance-software
  // ===========================================================================
  {
    slug: 'aml-case-management-risk-scoring',
    parentSlug: 'aml-cft-compliance-software',
    navLabel: 'AML Case Management',
    h1: 'AML Case Management and Risk Scoring',
    seoTitle: 'AML Case Management Software',
    description:
      'AML case management and risk scoring software: the analyst-facing workflow, investigation tooling and audit trail behind an alert, not just the detection engine.',
    summary: 'The analyst-facing side of AML: case workflow, risk scoring and the audit trail an examiner reviews months later.',
    icon: 'bi-shield-lock-fill',
    intro: [
      'An alert is not a decision. Between a transaction monitoring system flagging something and a filed STR or a cleared case, there is a workflow: an analyst investigates, a risk score gets applied or adjusted, a decision gets made, and all of it has to be reconstructable by an examiner who was not there when it happened.',
      'This is that layer: risk scoring, case assignment, investigation tooling and the audit trail, separate from the detection engine covered on the transaction monitoring page and the alerting logic itself.',
    ],
    offerings: [
      { title: 'Risk scoring engine', body: 'Customer and transaction risk scoring based on factors your compliance team defines, adjustable as risk typologies change without a code deployment.' },
      { title: 'Case management workflow', body: 'Alert assignment, investigation notes, escalation paths and disposition, built around how your compliance team actually works rather than a generic ticketing system relabelled for AML.' },
      { title: 'Audit trail and evidence packs', body: 'Every decision, the data behind it, the analyst who made it, and the reasoning, retained in a form an examiner can review without reconstructing it after the fact.' },
      { title: 'Regulatory reporting handoff', body: 'Cases that result in an STR or CTR flow directly into the goAML reporting pipeline (see the dedicated page) rather than requiring re-entry.' },
    ],
    howWeHelp: [
      'The problem we see most often is a monitoring system that generates alerts well but has no real workflow behind it: a spreadsheet tracking case status, disposition reasoning kept in someone’s notes, no consistent record of why a case was cleared. That works until an examination, and then it is the single biggest source of findings.',
      'Case management also has to survive staff turnover. If the reasoning behind a decision only exists in one analyst’s memory, the institution has a gap the moment that analyst leaves, regardless of how good the original decision was.',
    ],
    approach: [
      'We design the case record so it stands on its own for an examiner: the alert, the data reviewed, the decision, and the reasoning, without requiring anyone to explain it verbally.',
      'Risk scoring logic is kept configurable by the compliance team, not locked inside code that requires an engineering change for every typology update.',
    ],
    technologies: ['Python', 'Java', 'PostgreSQL', 'Kafka'],
    industries: ['Banking & Fintech'],
    faqs: [
      { q: 'How is this different from your transaction monitoring service?', a: 'Transaction monitoring is the detection engine that generates alerts from transaction patterns. This is what happens after an alert exists: assigning it, investigating it, scoring risk, and recording the decision. Most institutions need both, and they integrate directly.' },
      { q: 'Can compliance staff adjust risk scoring without engineering involvement?', a: 'Yes, that is a deliberate design goal. Risk typologies change faster than most institutions can get an engineering change deployed, so scoring rules are built to be configurable by the compliance team.' },
      { q: 'What does the audit trail actually capture?', a: 'The alert, the data the analyst reviewed, the decision made, the reasoning recorded, and who made it, retained in a form that reconstructs the full picture for an examiner without requiring anyone to explain it after the fact.' },
      { q: 'Does this integrate with our existing transaction monitoring system?', a: 'In most cases yes, through the alert data the monitoring system already generates. Where we also build the monitoring engine, the two are designed together; where we are adding case management to an existing monitoring system, we integrate against its alert output.' },
    ],
    relatedSpokes: ['transaction-monitoring-software-development', 'sanctions-pep-screening-software', 'goaml-fmu-reporting-integration'],
    relatedCaseStudies: ['corebanking-aml-suite'],
    relatedPosts: ['navigating-aml-cft-regulations-pakistan-2026'],
  },
  {
    slug: 'sanctions-pep-screening-software',
    parentSlug: 'aml-cft-compliance-software',
    navLabel: 'Sanctions & PEP Screening',
    h1: 'Sanctions and PEP Screening Software',
    seoTitle: 'Sanctions & PEP Screening Software',
    description:
      'Sanctions and PEP screening software for onboarding and ongoing monitoring: name matching against OFAC and NACTA lists, tuned to reduce false positives.',
    summary: 'Name-matching and screening against sanctions and PEP lists, tuned so analysts are not drowning in false positives.',
    icon: 'bi-flag-fill',
    intro: [
      'Screening a customer against a sanctions or politically-exposed-persons list sounds like a lookup. In practice it is a fuzzy-matching problem: names transliterate differently across languages, dates of birth are sometimes missing, and a screening engine tuned too loosely buries analysts in false positives while one tuned too tight misses genuine matches.',
      'We build screening systems for onboarding and ongoing monitoring against OFAC, NACTA and equivalent sanctions and PEP data sources, tuned for your actual customer base rather than a generic default.',
    ],
    offerings: [
      { title: 'Name matching and fuzzy logic', body: 'Matching algorithms tuned for the transliteration and formatting variance in your actual customer data, not a naive exact-match or an untuned fuzzy match that floods analysts.' },
      { title: 'Onboarding and ongoing screening', body: 'Screening at customer onboarding and on a recurring basis against updated lists, since a customer who was clean at onboarding is not guaranteed to stay that way.' },
      { title: 'List management', body: 'Ingesting and updating sanctions and PEP list data from your chosen data provider, with the screening engine checked against known test cases after every update.' },
      { title: 'False positive tuning', body: 'Continuous tuning based on real dispositions, so the screening engine gets more accurate as your analysts confirm or reject matches, not static from launch.' },
    ],
    howWeHelp: [
      'The operational cost most institutions underestimate is analyst time spent clearing false positives. A screening engine that is technically working but poorly tuned can generate ten false alerts for every genuine one, which either burns out the compliance team or, worse, trains them to clear alerts without reading them properly.',
      'We treat tuning as ongoing work, not a one-time calibration. As your customer base and the sanctions lists themselves change, the matching thresholds that worked at launch drift, and we build the tooling to monitor and adjust that over time.',
    ],
    approach: [
      'We tune matching thresholds against your actual customer data’s naming conventions, not a generic benchmark, since transliteration patterns vary significantly by region and language.',
      'Every list update runs against a set of known test cases before going live, so a data provider’s format change does not silently break matching.',
    ],
    technologies: ['Python', 'Java', 'PostgreSQL', 'OFAC', 'NACTA'],
    industries: ['Banking & Fintech'],
    faqs: [
      { q: 'What sanctions and PEP lists do you screen against?', a: 'OFAC and NACTA are the two most common for institutions operating in or transacting with Pakistan and the US; the specific list set depends on your regulatory obligations and correspondent banking relationships, and we integrate the data sources your compliance programme requires.' },
      { q: 'How do you reduce false positives without missing genuine matches?', a: 'By tuning the matching algorithm against your actual customer data and continuously adjusting based on real analyst dispositions, rather than shipping a fixed threshold and leaving it untouched.' },
      { q: 'Do you screen at onboarding only, or ongoing as well?', a: 'Both, in most implementations. Onboarding screening alone misses customers who become sanctioned or politically exposed after the relationship starts, so ongoing rescreening against updated lists is standard.' },
      { q: 'Can this integrate with our case management system?', a: 'Yes, a screening match should flow into case management as a case an analyst can investigate and disposition, rather than sitting in a separate system the compliance team has to check manually.' },
    ],
    relatedSpokes: ['transaction-monitoring-software-development', 'aml-case-management-risk-scoring'],
    relatedCaseStudies: ['corebanking-aml-suite'],
    relatedPosts: ['navigating-aml-cft-regulations-pakistan-2026'],
  },
  {
    slug: 'transaction-monitoring-software-development',
    parentSlug: 'aml-cft-compliance-software',
    navLabel: 'Transaction Monitoring',
    h1: 'Transaction Monitoring Software Development',
    seoTitle: 'Transaction Monitoring Software Development',
    description:
      'Real-time transaction monitoring systems combining deterministic rules with model-assisted prioritization, designed so every alert has an explainable reason.',
    summary: 'Real-time monitoring built on rules an examiner can follow, with machine learning prioritizing the analyst queue rather than deciding it.',
    icon: 'bi-activity',
    intro: [
      'Transaction monitoring is the detection layer of an AML programme: watching transaction patterns in real time or near real time and generating alerts when something matches a defined typology. The engineering challenge is scale (monitoring millions of transactions) combined with precision (not burying analysts in noise).',
      'We build monitoring engines around deterministic rules, since every alert needs an explainable reason for an examiner, with machine learning used to prioritise the analyst queue rather than replacing the rules that generate alerts.',
    ],
    offerings: [
      { title: 'Rule engine design', body: 'Deterministic detection rules built around your institution’s actual risk typologies, structured so a rule’s logic can be explained to an examiner in plain language.' },
      { title: 'Real-time and batch monitoring', body: 'Streaming detection for time-sensitive typologies and batch analysis for patterns that only become visible over a longer window, depending on what each typology actually requires.' },
      { title: 'ML-assisted prioritisation', body: 'A model that ranks the alert queue by likely relevance, improving analyst throughput without making an unexplainable model output the reason a case was opened or closed.' },
      { title: 'Threshold tuning and backtesting', body: 'Rules tested against historical transaction data before going live, so a new rule’s alert volume and accuracy are known quantities, not a surprise in production.' },
    ],
    howWeHelp: [
      'The tension in every transaction monitoring build is between catching genuine suspicious activity and generating so many alerts that analysts cannot meaningfully review them. We resolve that with rules first, since a rule’s logic is auditable, and machine learning applied to prioritisation, since that keeps a human-explainable reason behind every alert of record.',
      'Scale is the other real engineering problem: monitoring transactions in real time across a large institution is a streaming data problem as much as a compliance one, and the architecture has to handle both correctly.',
    ],
    approach: [
      'New rules are backtested against historical data before deployment, so we know their alert volume and rough accuracy before analysts see a single live alert from them.',
      'Machine learning sits on top of the rule engine as a prioritisation layer, never as the sole reason an alert exists, so every case an examiner reviews has a rule they can trace.',
    ],
    technologies: ['Python', 'Java', 'PostgreSQL', 'Kafka', 'goAML XML'],
    industries: ['Banking & Fintech'],
    faqs: [
      { q: 'Do you use machine learning for transaction monitoring?', a: 'Alongside deterministic rules, not instead of them. Rules produce the alerts of record because every decision needs an explainable reason for an examiner. A model can prioritise the analyst queue, which improves throughput without making an unexplainable artefact load-bearing for compliance.' },
      { q: 'How do you test a new detection rule before it goes live?', a: 'By backtesting it against historical transaction data first, so the alert volume and rough accuracy are known before analysts see a live alert. A rule that generates an unmanageable volume gets tuned before deployment, not discovered after.' },
      { q: 'Can this handle real-time monitoring at scale?', a: 'Yes, the architecture is built as a streaming system for typologies that need real-time detection, with batch processing for patterns that only emerge over a longer window. Which approach applies depends on the specific typology.' },
      { q: 'How does this connect to case management and reporting?', a: 'An alert generated here flows into the case management and risk scoring layer for investigation, and a case that results in a filing goes to the goAML reporting pipeline. All three are designed to connect rather than requiring manual handoff.' },
    ],
    relatedSpokes: ['aml-case-management-risk-scoring', 'sanctions-pep-screening-software', 'goaml-fmu-reporting-integration'],
    relatedCaseStudies: ['corebanking-aml-suite'],
    relatedPosts: ['navigating-aml-cft-regulations-pakistan-2026'],
  },
  {
    slug: 'financial-messaging-schema-integration',
    parentSlug: 'aml-cft-compliance-software',
    navLabel: 'XML Schema Integration',
    h1: 'Financial Messaging Schema Integration',
    seoTitle: 'Financial Messaging Schema Integration',
    description:
      'ISO 20022, SWIFT and goAML XML schema integration for regulatory reporting and financial messaging: validated internally before anything reaches a regulator.',
    summary: 'ISO 20022, SWIFT and goAML XML integration, validated against the schema before anything is submitted to a regulator or network.',
    icon: 'bi-filetype-xml',
    intro: [
      'Financial and regulatory messaging runs on strict schemas: ISO 20022 for payments messaging, SWIFT XML for correspondent banking, goAML XML for AML reporting to Pakistan’s Financial Monitoring Unit. Getting the schema wrong does not fail gracefully; it means a rejected submission, a bounced payment, or a compliance filing that has to be corrected and resubmitted.',
      'We build the integration layer that generates, validates and submits these messages, checking conformance against the schema in your own environment before anything reaches the regulator or the network.',
    ],
    offerings: [
      { title: 'goAML XML generation and validation', body: 'STR and CTR submissions generated as goAML-conformant XML and validated against the schema internally before filing, so rejections are caught before submission, not after.' },
      { title: 'ISO 20022 and SWIFT messaging', body: 'Payment and correspondent banking message generation and parsing built to the current schema version, for institutions integrating with SWIFT or ISO 20022-based payment rails.' },
      { title: 'HL7 FHIR for healthcare messaging', body: 'Where a client’s integration needs extend into healthcare interoperability, the same schema-validation discipline applies to HL7 FHIR messaging.' },
      { title: 'Schema versioning and change management', body: 'Monitoring for schema updates from the relevant authority and updating the integration before an outdated schema causes rejected submissions.' },
    ],
    howWeHelp: [
      'Most schema rejection issues we are called in to fix trace back to a subtle mismatch: a field format that changed in a schema update nobody tracked, an edge case the original integration never tested, or a validation step that was skipped to save time and now costs far more in rejected filings.',
      'We validate internally against the schema before anything is submitted externally, which sounds obvious but is the step most integrations under time pressure skip. The cost of catching a rejection internally is minutes; the cost of catching it after submission to FMU or a payment network is a compliance or operational incident.',
    ],
    approach: [
      'We build a validation step into your environment that checks conformance before submission, so schema errors are caught internally rather than discovered as rejections.',
      'Schema updates are monitored proactively rather than discovered when a submission starts failing, since regulatory and network schemas do change.',
    ],
    technologies: ['Python', 'Java', 'goAML XML', 'ISO 20022'],
    industries: ['Banking & Fintech', 'Healthcare & MedTech'],
    faqs: [
      { q: 'Do you integrate directly with the FMU goAML portal?', a: 'Yes. We generate goAML-conformant XML for STR and CTR submissions and validate it against the schema in your own environment before anything reaches FMU, so schema rejections are caught internally rather than after filing.' },
      { q: 'What happens if the goAML or ISO 20022 schema changes?', a: 'We monitor for schema updates from the relevant authority and update the integration proactively, so a schema change does not surface as a batch of rejected submissions before anyone notices.' },
      { q: 'Can you validate messages before they are submitted, or only build the generation logic?', a: 'Validation is built in as a required step before submission, not an optional extra. The integration checks conformance against the current schema internally, which is the whole point of building this layer rather than submitting blind.' },
      { q: 'Does this work for SWIFT and ISO 20022 as well as goAML?', a: 'Yes, the underlying discipline (schema-accurate generation, internal validation before submission, proactive update monitoring) applies across goAML, ISO 20022, SWIFT XML and HL7 FHIR, depending on which messaging standard your integration needs.' },
    ],
    relatedSpokes: ['goaml-fmu-reporting-integration', 'transaction-monitoring-software-development', 'api-development-integration'],
    relatedCaseStudies: ['corebanking-aml-suite'],
    relatedPosts: ['goaml-xml-integration-str-ctr-reporting-pakistan'],
  },
  {
    slug: 'goaml-fmu-reporting-integration',
    parentSlug: 'aml-cft-compliance-software',
    navLabel: 'FMU Pakistan Reporting',
    h1: 'goAML and FMU Regulatory Reporting Integration',
    seoTitle: 'goAML & FMU Reporting Integration',
    description:
      'goAML integration and FMU Pakistan regulatory reporting: STR and CTR filing pipelines built for the Anti-Money Laundering Act 2010 and SBP requirements.',
    summary: 'STR and CTR filing pipelines built directly for goAML and Pakistan’s Financial Monitoring Unit reporting obligations.',
    icon: 'bi-bank2',
    intro: [
      'Institutions regulated under Pakistan’s Anti-Money Laundering Act 2010 report suspicious and currency transactions to the Financial Monitoring Unit through the goAML system. That reporting obligation touches case management, schema-accurate XML generation, and the submission workflow itself, and a gap in any part of that chain becomes a compliance finding.',
      'This page covers the FMU reporting pipeline specifically: taking a case decision through to a correctly filed STR or CTR. The XML schema work behind it is covered on the messaging integration page linked below.',
    ],
    offerings: [
      { title: 'STR and CTR filing pipeline', body: 'A pipeline from case disposition to goAML submission, so a decision to file does not require manual re-entry into a separate portal.' },
      { title: 'FMU and SBP compliance alignment', body: 'Reporting logic built against the specific obligations of the Anti-Money Laundering Act 2010 and SBP’s regulatory framework, not a generic AML reporting template.' },
      { title: 'Filing audit trail', body: 'A record of every filing, what triggered it, who approved it, and its submission status, retained for examination.' },
      { title: 'Narrative quality support', body: 'Structured case data that supports writing a filing narrative with the detail an examiner expects, rather than a generic template narrative.' },
    ],
    howWeHelp: [
      'The gap we most often find in existing reporting processes is the manual step between a compliance decision and the actual goAML filing: someone re-entering case data into the portal by hand, with no system-level record connecting the two. That is both an operational burden and an audit weakness, since it is hard to prove the filing accurately reflects the case.',
      'We build the pipeline so a filing decision flows through to goAML with the case data intact, and the filing itself is retained alongside the case record it came from, so an examiner can trace the full chain.',
    ],
    approach: [
      'We map your current reporting workflow, including the manual steps, before automating any of it, so we automate the actual obligation rather than a simplified version of it.',
      'Filing generation reuses the schema validation from the messaging integration work, so a filing that reaches FMU has already been checked against the goAML schema internally.',
    ],
    technologies: ['Python', 'Java', 'PostgreSQL', 'goAML XML', 'FMU', 'SBP'],
    industries: ['Banking & Fintech'],
    faqs: [
      { q: 'Do you handle both STR and CTR filings?', a: 'Yes, both suspicious transaction reports and currency transaction reports are covered, built against the specific thresholds and requirements SBP and the Anti-Money Laundering Act 2010 set for each.' },
      { q: 'Can this connect directly to our case management system?', a: 'Yes, that connection is the point: a filing decision made in case management should flow through to goAML submission without manual re-entry, with the audit trail connecting the two.' },
      { q: 'What regulatory framework does this align to?', a: 'Primarily the SBP AML/CFT/CPF regulatory framework and FMU reporting obligations under the Anti-Money Laundering Act 2010, aligned to the FATF Recommendations. Correspondent banking relationships sometimes bring additional sanctions obligations, which we also build to where relevant.' },
      { q: 'How do you support writing the filing narrative itself?', a: 'By structuring the underlying case data so the detail an examiner expects (what was observed, why it was flagged, what was reviewed) is already organised, rather than requiring an analyst to reconstruct it from scattered notes at filing time.' },
    ],
    relatedSpokes: ['financial-messaging-schema-integration', 'aml-case-management-risk-scoring'],
    relatedCaseStudies: ['corebanking-aml-suite'],
    relatedPosts: ['goaml-xml-integration-str-ctr-reporting-pakistan', 'navigating-aml-cft-regulations-pakistan-2026'],
  },

  // ===========================================================================
  // PILLAR: healthcare-software-development
  // ===========================================================================
  {
    slug: 'ehr-clinical-software-development',
    parentSlug: 'healthcare-software-development',
    navLabel: 'Healthcare Software',
    h1: 'EHR and Clinical Systems Development',
    seoTitle: 'EHR & Clinical Software Development',
    description:
      'Electronic health record and clinical systems development built to HL7 FHIR interoperability and the HIPAA Security Rule, including telemedicine integration.',
    summary: 'Electronic health record and clinical software built for real HL7 FHIR interoperability, not a translation layer bolted on at the end.',
    icon: 'bi-heart-pulse-fill',
    intro: [
      'An EHR is only as useful as its ability to exchange data with the rest of a patient’s care: labs, pharmacy, referring providers, and eventually other hospital systems. Building interoperability as a genuine architectural principle rather than a translation layer added at the end determines whether that data exchange is fast or painful for years afterward.',
      'We build EHR and clinical systems, including telemedicine integration, to the HIPAA Security Rule and to HL7 FHIR interoperability, distinct from the revenue-cycle and billing work covered on the medical billing page.',
    ],
    offerings: [
      { title: 'Electronic health records', body: 'Patient record systems built around clinical workflow, structured so the data model supports HL7 FHIR exchange natively rather than requiring a mapping layer bolted on afterward.' },
      { title: 'Telemedicine platforms', body: 'Video consultation and virtual care workflows integrated with the patient record, built on WebRTC for real-time video without a third-party platform dependency.' },
      { title: 'HL7 FHIR and HL7 v2 integration', body: 'Interoperability with labs, pharmacy systems, and other providers using the HL7 standards actually deployed across most healthcare infrastructure today.' },
      { title: 'Clinical terminology support', body: 'LOINC and SNOMED CT coding where clinical data needs to be structured for interoperability and analytics, not stored as free text.' },
    ],
    howWeHelp: [
      'The interoperability problem shows up later than most clinical software decisions: a system built without FHIR in mind works fine in isolation, then costs significantly more to integrate the first time a lab or referring provider needs to exchange data with it. We design the data model for that exchange from the start.',
      'We also build telemedicine as an integrated part of the clinical record rather than a separate video product bolted alongside it, so a consultation is documented in the same patient history as an in-person visit.',
    ],
    approach: [
      'HL7 FHIR resource modelling happens at the data architecture stage, not as a mapping exercise after the schema is already fixed.',
      'We build to the HIPAA Security Rule’s actual technical safeguards, not a generic security checklist, since healthcare data has specific access-control and audit requirements the rule defines.',
    ],
    technologies: ['.NET Core', 'HL7 FHIR', 'HL7 v2', 'Angular', 'React', 'PostgreSQL', 'WebRTC', 'LOINC', 'SNOMED CT'],
    industries: ['Healthcare & MedTech'],
    faqs: [
      { q: 'Is NovuLabs HIPAA certified?', a: 'HIPAA has no certification regime at all; organisations attest to compliance rather than being certified by a registrar. We build to the HIPAA Security Rule’s technical safeguards, and we are precise about that being an engineering standard we follow, not a certificate we hold.' },
      { q: 'Do you build telemedicine as a separate product or integrated with the EHR?', a: 'Integrated, by default. A telemedicine consultation is a clinical encounter and belongs in the same patient record as any other visit, rather than living in a separate video platform disconnected from the chart.' },
      { q: 'What HL7 standards do you support?', a: 'Both HL7 FHIR, the current interoperability standard, and HL7 v2, which remains widely deployed across existing healthcare infrastructure. Most integration work in practice has to support both, since the systems on the other end of an exchange are not all on FHIR yet.' },
      { q: 'Can this integrate with a hospital’s existing lab or pharmacy systems?', a: 'That is the specific problem FHIR and HL7 v2 integration solve, and it is designed in from the start rather than added once the first integration request arrives.' },
    ],
    relatedSpokes: ['medical-billing-software-development'],
    relatedCaseStudies: ['medicore-ehr-platform', 'carepulse-telemedicine-app'],
    relatedPosts: ['scaling-healthcare-software-hipaa-hl7-fhir'],
  },
  {
    slug: 'medical-billing-software-development',
    parentSlug: 'healthcare-software-development',
    navLabel: 'Medical Billing',
    h1: 'Medical Billing Software Development',
    seoTitle: 'Medical Billing Software Development',
    description:
      'Medical billing and revenue cycle software with ICD-10/CPT coding, claim management and payer integration, built alongside or separate from a clinical EHR.',
    summary: 'Revenue-cycle software: ICD-10/CPT coding, claim management and payer integration, distinct from the clinical record itself.',
    icon: 'bi-clipboard2-pulse-fill',
    intro: [
      'Medical billing is a different problem from clinical documentation, even though the two are closely related and often need to share data. Billing software has its own domain: coding accuracy, claim submission, payer-specific rules, and denial management, and it is worth engineering as its own system rather than an afterthought bolted onto an EHR.',
      'We build billing and revenue-cycle systems with ICD-10 and CPT coding, claim management and payer integration, either alongside a clinical system we are also building or integrated with an EHR the provider already runs.',
    ],
    offerings: [
      { title: 'Coding and claim generation', body: 'ICD-10 and CPT coding support built into the claim generation workflow, reducing the manual coding errors that cause the majority of claim denials.' },
      { title: 'Payer integration', body: 'Claim submission and eligibility verification integrated with the specific payers a provider works with, since payer rules and formats vary and a generic integration handles none of them well.' },
      { title: 'Denial management', body: 'Tracking and workflow for denied claims, since recovering revenue from a denial requires a process, not just a resubmission button.' },
      { title: 'Reporting for revenue-cycle visibility', body: 'Reporting scoped to what a billing team and practice management actually need to act on: days in accounts receivable, denial rates by payer, and collection performance.' },
    ],
    howWeHelp: [
      'The recurring pattern behind billing software problems is claim denials from coding errors or payer-rule mismatches that could have been caught before submission. Building coding validation and payer-specific rule checks into the claim generation step, rather than discovering the error after a denial, is most of the value here.',
      'We also design for the reality that a provider often needs billing to integrate with an EHR built by a different vendor, sometimes years earlier. That integration work is usually the actual scope, not the billing logic itself.',
    ],
    approach: [
      'Claim validation happens before submission, checking coding accuracy and payer-specific rules, so denials are prevented rather than managed after the fact.',
      'Where billing needs to integrate with an existing EHR, we build against that system’s actual data export capability rather than assuming an ideal integration surface.',
    ],
    technologies: ['.NET Core', 'React', 'PostgreSQL'],
    industries: ['Healthcare & MedTech'],
    faqs: [
      { q: 'Can this integrate with our existing EHR from a different vendor?', a: 'In most cases yes, through whatever data export or API the existing EHR supports. The integration surface varies significantly by vendor, so we scope this specifically after reviewing what your current system can actually expose.' },
      { q: 'How do you reduce claim denials from coding errors?', a: 'By validating ICD-10 and CPT coding and payer-specific submission rules before the claim is submitted, catching the errors that would otherwise come back as a denial weeks later.' },
      { q: 'Do you handle claims for multiple payers with different requirements?', a: 'Yes, payer-specific submission rules and formats are built into the integration for each payer a practice actually works with, rather than a one-size-fits-all submission format that fails silently for some payers.' },
      { q: 'Is this HIPAA-aligned given it handles patient billing data?', a: 'Yes, the same HIPAA Security Rule technical safeguards that apply to clinical data apply here, since billing data includes protected health information.' },
    ],
    relatedSpokes: ['ehr-clinical-software-development'],
    relatedCaseStudies: ['medicore-ehr-platform'],
    relatedPosts: ['scaling-healthcare-software-hipaa-hl7-fhir'],
  },

  // ===========================================================================
  // PILLAR: mobile-app-development
  // ===========================================================================
  {
    slug: 'cross-platform-app-development',
    parentSlug: 'mobile-app-development',
    navLabel: 'Cross-Platform Apps',
    h1: 'Cross-Platform Mobile App Development',
    seoTitle: 'Cross-Platform App Development Services',
    description:
      'Cross-platform mobile app development with Flutter and React Native, for products that need one codebase across iOS and Android without native rework.',
    summary: 'One codebase across iOS and Android with Flutter or React Native, for products where native-per-platform is not worth the duplicated cost.',
    icon: 'bi-phone-fill',
    intro: [
      'Cross-platform development is the right default for most mobile products: one codebase targeting both iOS and Android, which means one team, one release cycle, and roughly half the ongoing maintenance of building and keeping two native codebases in sync. It stops being the right default when an app needs deep platform-specific capability that a cross-platform framework cannot expose cleanly, which is when native development, covered on the iOS and Android pages, is the better call.',
      'This page covers Flutter and React Native development specifically. We will tell you honestly which approach fits your product before proposing either.',
    ],
    offerings: [
      { title: 'Flutter development', body: 'Single-codebase apps with native-compiled performance, well suited to products where UI consistency across platforms matters as much as native feel.' },
      { title: 'React Native development', body: 'Cross-platform apps sharing code with a React-based web product where one exists, useful when a team already has React expertise in-house.' },
      { title: 'Offline-first architecture', body: 'Local data persistence and sync logic for field or connectivity-constrained environments, so the app remains usable when the network is not.' },
      { title: 'Push notifications and background sync', body: 'Notification infrastructure via Firebase and background data sync that behaves correctly across both platforms’ different lifecycle rules.' },
    ],
    howWeHelp: [
      'The decision between cross-platform and native is a real engineering trade-off, and we make it honestly rather than defaulting to whichever framework we most recently used. Cross-platform wins when time-to-market and one shared codebase outweigh needing the newest platform-specific APIs on day one.',
      'A recurring problem we solve within cross-platform apps specifically is connectivity: field operations, wallet apps used in low-signal areas, or telemedicine access in regions with unreliable networks all need an offline-first design, not just error handling for a dropped connection.',
    ],
    approach: [
      'We assess whether cross-platform genuinely fits before proposing it, including what platform-specific capability the product might need later, not just what it needs at launch.',
      'For connectivity-sensitive products, offline behaviour is designed from the data layer up, not added as a fallback once the online-only version is built.',
    ],
    technologies: ['Flutter', 'React Native', 'Firebase', 'WebRTC'],
    industries: ['Banking & Fintech', 'Healthcare & MedTech', 'E-Commerce & Retail'],
    faqs: [
      { q: 'Should we build cross-platform or native for our app?', a: 'It depends on what the app needs to do and how much platform-specific capability matters. Cross-platform is usually right for most business apps; native makes more sense when you need the newest platform APIs immediately or truly platform-specific performance. We will tell you which fits before proposing either.' },
      { q: 'Flutter or React Native, which do you recommend?', a: 'It depends on your existing team and product. React Native is a strong fit if you already have React expertise or a React web product to share code with; Flutter tends to give more consistent UI behaviour across platforms out of the box. We make this call based on your specific situation, not a default preference.' },
      { q: 'Can the app work reliably in areas with poor connectivity?', a: 'Yes, that is a design requirement we build for specifically, with local data persistence and sync logic, rather than an app that simply shows an error when the connection drops.' },
      { q: 'Can we start cross-platform and move to native later if we need to?', a: 'In some cases, yes, particularly if the initial architecture anticipates it. It is worth raising this possibility during initial scoping so the app is not built in a way that makes a later native migration harder than it needs to be.' },
    ],
    relatedSpokes: ['ios-app-development', 'android-app-development'],
    relatedCaseStudies: ['finsync-digital-wallet', 'carepulse-telemedicine-app'],
    relatedPosts: [],
  },
  {
    slug: 'ios-app-development',
    parentSlug: 'mobile-app-development',
    navLabel: 'iOS Development',
    h1: 'Native iOS App Development',
    seoTitle: 'Native iOS App Development Services',
    description:
      'Native iOS app development in Swift and SwiftUI, for apps that need platform-specific performance, App Store approval discipline, and deep iOS API access.',
    summary: 'Native Swift and SwiftUI development for apps that need the platform’s full capability, not a cross-platform approximation of it.',
    icon: 'bi-apple',
    intro: [
      'Native iOS development makes sense when an app depends on platform-specific capability a cross-platform framework cannot expose well: deep hardware integration, the newest iOS APIs on release day, or performance requirements where a compiled cross-platform layer introduces measurable overhead.',
      'We build in Swift and SwiftUI, with the App Store approval process, Apple’s review guidelines and platform conventions treated as part of the build, not an afterthought at submission time.',
    ],
    offerings: [
      { title: 'Swift and SwiftUI development', body: 'Native apps built with current Apple frameworks, giving full access to platform capability and the performance characteristics of a compiled native app.' },
      { title: 'App Store submission readiness', body: 'Building against Apple’s current review guidelines throughout development, so submission is a formality rather than a round of rejections and rework.' },
      { title: 'Platform-specific integration', body: 'Deep integration with iOS-specific capability such as biometric authentication, push notifications and background processing, built the way the platform expects rather than through a compatibility layer.' },
      { title: 'Performance engineering', body: 'Profiling and optimisation for the specific performance and battery characteristics iOS users and Apple’s review process both expect.' },
    ],
    howWeHelp: [
      'App Store rejections are a common, avoidable cost. Most of them trace back to guideline violations that were knowable during development, not surprises. We build against the current guidelines from the start rather than treating submission as the first point they get checked.',
      'For apps handling sensitive data (financial transactions, health records), native development also gives more direct control over how the platform’s security features (Keychain, biometric authentication, secure enclave) are used, which matters more than it does for a lower-stakes consumer app.',
    ],
    approach: [
      'We track Apple’s current App Store review guidelines throughout the build, not just at submission, since a guideline violation discovered late can mean rework close to launch.',
      'Platform-specific features are implemented the way iOS expects them to work, following Apple’s human interface guidelines, rather than adapting a cross-platform pattern to fit.',
    ],
    technologies: ['Swift', 'Firebase', 'WebRTC'],
    industries: ['Banking & Fintech', 'Healthcare & MedTech'],
    faqs: [
      { q: 'When should we build native iOS instead of cross-platform?', a: 'When the app genuinely needs platform-specific capability, the newest iOS APIs immediately on release, or performance headroom a cross-platform layer would cost. If neither applies, cross-platform is usually the more efficient choice, and we will say so.' },
      { q: 'How do you avoid App Store rejections?', a: 'By building against Apple’s current review guidelines throughout development rather than only checking them at submission, so the app is compliant by the time it is ready to submit, not after a rejection reveals a problem.' },
      { q: 'Do you handle biometric authentication and secure data storage?', a: 'Yes, using iOS’s native security capabilities like Keychain and biometric authentication as the platform intends, which is particularly relevant for financial and healthcare apps handling sensitive data.' },
      { q: 'Can a native iOS app share a backend with an Android or web app?', a: 'Yes, the backend and API layer are typically shared across platforms regardless of whether the client apps are native or cross-platform. Native development affects the client only, not the server architecture.' },
    ],
    relatedSpokes: ['android-app-development', 'cross-platform-app-development'],
    relatedCaseStudies: ['finsync-digital-wallet'],
    relatedPosts: [],
  },
  {
    slug: 'android-app-development',
    parentSlug: 'mobile-app-development',
    navLabel: 'Android Development',
    h1: 'Native Android App Development',
    seoTitle: 'Native Android App Development Services',
    description:
      'Native Android app development in Kotlin for a diverse device ecosystem, including enterprise Google Play deployment and platform-specific integration.',
    summary: 'Kotlin-first native development built for the range of devices and OS versions an Android product actually has to run on.',
    icon: 'bi-android2',
    intro: [
      'Android’s device diversity is the real engineering challenge native Android development solves: a product built for a flagship phone on the latest OS version behaves differently on a mid-range device three OS versions behind, and both are real users. That diversity is also why native development sometimes pays off over cross-platform, when an app needs to run well across genuinely varied hardware.',
      'We build Kotlin-first native Android apps, including enterprise deployment through Google Play, with device and OS-version diversity treated as a design constraint from the start.',
    ],
    offerings: [
      { title: 'Kotlin-first native development', body: 'Native apps built in Kotlin, giving full access to current Android APIs and the performance profile of a compiled native application.' },
      { title: 'Device and OS-version testing', body: 'Testing across the range of devices and Android versions your actual user base runs, not just the newest flagship device on the newest OS.' },
      { title: 'Enterprise Play Store deployment', body: 'Managed deployment for enterprise and internal-distribution apps, including the specific requirements of Google Play’s enterprise and managed-device programmes.' },
      { title: 'Platform-specific integration', body: 'Deep integration with Android-specific capability, including background processing and notification behaviour that varies meaningfully across manufacturer OS customisations.' },
    ],
    howWeHelp: [
      'The most common Android production issue is a feature that worked in testing on a flagship device and behaves differently, or fails, on a mid-range device running a manufacturer’s customised OS build. Android’s fragmentation is real and it shows up specifically in background processing, notifications and battery-optimisation behaviour that varies by manufacturer.',
      'For enterprise or field-operations apps specifically, we also design for devices that are older or lower-spec than a typical consumer flagship, since that is often the actual hardware fleet an organisation is deploying to.',
    ],
    approach: [
      'We test against the actual device and OS-version range your users have, not just the newest available hardware, since that is where fragmentation-related bugs actually surface.',
      'Background processing and notification logic is built and tested against the manufacturer-specific OS behaviour (particularly aggressive battery optimisation on some Android skins) that causes the most Android-specific production issues.',
    ],
    technologies: ['Kotlin', 'Firebase', 'WebRTC'],
    industries: ['Banking & Fintech', 'Manufacturing & Logistics', 'Healthcare & MedTech'],
    faqs: [
      { q: 'How do you handle Android device fragmentation?', a: 'By testing against the actual range of devices and OS versions your user base runs rather than only the newest flagship hardware, since manufacturer-specific OS customisations, particularly around battery optimisation, are where most fragmentation bugs surface.' },
      { q: 'Do you support enterprise deployment outside the public Play Store?', a: 'Yes, including managed deployment through Google Play’s enterprise programmes for apps distributed internally rather than to the public.' },
      { q: 'When does native Android make more sense than cross-platform?', a: 'When device diversity or platform-specific behaviour (background processing, deep hardware integration, manufacturer-specific OS quirks) genuinely needs to be handled at the native level. For most business apps without that constraint, cross-platform is the more efficient choice.' },
      { q: 'Can this integrate with the same backend as an iOS or web app?', a: 'Yes, the backend and API layer are shared across platforms regardless of client technology. Choosing native Android affects the client application only.' },
    ],
    relatedSpokes: ['ios-app-development', 'cross-platform-app-development'],
    relatedCaseStudies: [],
    relatedPosts: [],
  },

  // ===========================================================================
  // PILLAR: cloud-ai-automation
  // ===========================================================================
  {
    slug: 'cloud-migration-services',
    parentSlug: 'cloud-ai-automation',
    navLabel: 'Cloud Solutions',
    h1: 'Cloud Migration and Infrastructure Services',
    seoTitle: 'Cloud Migration Services',
    description:
      'Cloud migration and infrastructure engineering on AWS, Azure and GCP: architecture, migration planning and managed Kubernetes infrastructure for enterprises.',
    summary: 'Cloud migration and infrastructure architecture on AWS, Azure or GCP, planned around your actual data residency and uptime constraints.',
    icon: 'bi-cloud-fill',
    intro: [
      'Cloud migration is rarely just "move the servers." It usually means re-architecting for how a cloud platform actually wants to run software: managed services instead of self-hosted equivalents, infrastructure defined as code instead of manually configured, and a cost model that behaves very differently from a fixed-cost data centre if the architecture is not designed for it.',
      'We plan and execute cloud migrations on AWS, Azure and GCP, and build the Kubernetes platform infrastructure underneath applications that need it, distinct from the applied AI and automation work covered on the AI development page.',
    ],
    offerings: [
      { title: 'Migration planning and execution', body: 'A migration plan that accounts for data residency requirements, downtime tolerance and dependency order, not just a lift-and-shift of existing servers.' },
      { title: 'Kubernetes platform engineering', body: 'Container orchestration infrastructure built for the specific reliability and scaling requirements of your workload, using Terraform for infrastructure as code.' },
      { title: 'Multi-cloud and hybrid architecture', body: 'Architecture for organisations with genuine data residency or vendor-diversification requirements, rather than defaulting to a single provider.' },
      { title: 'Observability and monitoring', body: 'Monitoring and alerting via Prometheus and Grafana built in from the start, since a cloud migration without observability just moves an existing blind spot to a new environment.' },
    ],
    howWeHelp: [
      'The migration risk we spend the most time on is data residency and compliance, particularly for regulated institutions where certain data cannot leave a specific jurisdiction. That constraint shapes the entire architecture, not just where the servers physically sit.',
      'Cost is the other common surprise. Cloud infrastructure that mirrors an on-premise architecture too literally often costs more than expected, because cloud pricing rewards a different design pattern (managed services, autoscaling, and workload-appropriate instance types) than a straight lift-and-shift assumes.',
    ],
    approach: [
      'Migration planning starts with data residency, compliance and downtime constraints, since those determine what "migrated" actually has to mean for your organisation before any infrastructure work begins.',
      'Infrastructure is defined as code from the start using Terraform, so the environment is reproducible and auditable rather than manually configured and undocumented.',
    ],
    technologies: ['AWS', 'Azure', 'Kubernetes', 'Terraform', 'Docker', 'Prometheus', 'Grafana'],
    industries: ['Banking & Fintech', 'Healthcare & MedTech', 'Manufacturing & Logistics'],
    faqs: [
      { q: 'Can you migrate infrastructure with strict data residency requirements?', a: 'Yes, that constraint is treated as a primary design input rather than an afterthought. For regulated institutions where data cannot leave a specific jurisdiction, the architecture is planned around that requirement from the start, including which cloud regions and services are viable.' },
      { q: 'Which cloud provider do you recommend: AWS, Azure or GCP?', a: 'It depends on your existing infrastructure, compliance requirements and what your team already knows. We do not default to one provider; the choice follows from your actual constraints, and multi-cloud or hybrid architecture is sometimes the right answer.' },
      { q: 'How do you avoid unexpected cloud costs after migration?', a: 'By architecting for how the cloud provider’s pricing actually works (managed services, autoscaling, right-sized instances) rather than mirroring an on-premise setup, which is the most common cause of a migration costing more than projected.' },
      { q: 'Do you set up monitoring and alerting as part of a migration?', a: 'Yes, observability is built in during the migration itself, not added afterward. A migrated environment without monitoring just relocates an existing blind spot rather than resolving it.' },
    ],
    relatedSpokes: ['ai-development-services', 'legacy-system-modernization'],
    relatedCaseStudies: [],
    relatedPosts: [],
  },
  {
    slug: 'ai-development-services',
    parentSlug: 'cloud-ai-automation',
    navLabel: 'AI Automation',
    h1: 'AI Development and Automation Services',
    seoTitle: 'AI Development Services',
    description:
      'Applied AI development: machine learning pipelines, NLP and document processing, and predictive analytics, scoped to problems where a model output is auditable.',
    summary: 'Applied ML, NLP and document processing built for problems where the model’s output needs to be explainable, not a generic AI feature bolted on.',
    icon: 'bi-robot',
    intro: [
      'Applied AI work in regulated or high-stakes environments has a specific constraint most generic AI development does not: a model’s output often has to be explainable, or at minimum bounded, because someone downstream (an examiner, a clinician, an auditor) needs to understand why the system made a recommendation.',
      'We build machine learning pipelines, NLP and document processing, and predictive analytics with that constraint designed in, distinct from the infrastructure and cloud platform work covered on the cloud migration page.',
    ],
    offerings: [
      { title: 'Document processing and NLP', body: 'Extraction and classification pipelines for unstructured documents, built to flag low-confidence results for human review rather than presenting every output as equally certain.' },
      { title: 'Predictive analytics', body: 'Forecasting and pattern-detection models trained on your actual data, with a validation process that measures real accuracy before the model influences a decision.' },
      { title: 'Model-assisted prioritisation', body: 'Machine learning applied to ranking or prioritising a queue, our approach on the AML transaction monitoring work is a direct example, rather than replacing a decision that needs to remain explainable.' },
      { title: 'ML pipeline infrastructure', body: 'Training, deployment and monitoring infrastructure for models that need to be retrained as data patterns shift, not a one-time model handed off with no maintenance path.' },
    ],
    howWeHelp: [
      'The mistake we see most often in applied AI projects is deploying a model as the decision-maker in a process where the decision genuinely needs to be explainable to a third party. We design for where a model adds real value (prioritisation, flagging, pattern detection at scale) without making it the unexplainable final word in a process an examiner or auditor will review.',
      'We are also direct about where AI is not the right tool. A significant share of "we need AI" requests we receive describe a problem that deterministic logic solves more reliably and more cheaply, and we say so rather than building a model because it was requested.',
    ],
    approach: [
      'We define what the model needs to be accountable for before choosing an approach: does a human need to be able to explain a specific output, or is the model only ranking or flagging for human review.',
      'Models are validated against your actual data with a defined accuracy measurement, not shipped on the assumption that a demo’s performance will hold in production.',
    ],
    technologies: ['Python', 'Kafka', 'AWS', 'Azure'],
    industries: ['Banking & Fintech', 'Healthcare & MedTech', 'Manufacturing & Logistics'],
    faqs: [
      { q: 'Where does AI actually fit in a regulated environment like banking or healthcare?', a: 'Primarily in prioritisation, flagging and pattern detection at scale, rather than as the final decision-maker in a process that needs to be explainable to a regulator or auditor. Our AML transaction monitoring work is a direct example: a model ranks the alert queue, but the alerts themselves come from explainable rules.' },
      { q: 'Will you tell us if machine learning is not the right approach for our problem?', a: 'Yes, and we do this before proposing a build, not after. A meaningful share of AI requests we receive describe a problem that deterministic logic handles more reliably and at lower cost, and recommending a model against that would just add unnecessary complexity.' },
      { q: 'How do you validate that a model is actually accurate before it goes into production?', a: 'Against your real data, with a defined accuracy measurement agreed before training, rather than relying on how well a demo performed on a curated sample.' },
      { q: 'Do you build and maintain the infrastructure to retrain models over time?', a: 'Yes, where a model needs ongoing retraining as underlying data patterns shift, we build the pipeline for that rather than delivering a model that degrades silently with no maintenance path.' },
    ],
    relatedSpokes: ['cloud-migration-services', 'transaction-monitoring-software-development'],
    relatedCaseStudies: [],
    relatedPosts: [],
  },
];

export function getServiceSpoke(slug: string): ServiceSpoke | undefined {
  return serviceSpokes.find((s) => s.slug === slug);
}

/** Every spoke nested under one pillar, in the order that pillar's own spokes
 *  should render (hub page, pillar "related" blocks). */
export function getSpokesForPillar(parentSlug: string): ServiceSpoke[] {
  return serviceSpokes.filter((s) => s.parentSlug === parentSlug);
}
