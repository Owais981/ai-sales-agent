import { ServiceItem, WhyUsItem, IndustryItem, TechStackItem, PortfolioItem, FaqItem, TeamMemberProfile } from '../types';

// Each of these 22 cards now links to a dedicated page (content/serviceSpokes.ts)
// instead of straight to /contact. See that file's header comment for why the
// card title and the page it links to sometimes carry a more specific name —
// e.g. "Enterprise Software" links to the Legacy System Modernization page,
// which is the genuinely distinct facet of that work that did not already have
// its own page. Nothing here was renamed for its own sake; every card still
// links to real content about the same underlying capability.
export const services: ServiceItem[] = [
  { icon: 'bi-globe', title: 'Website Development', desc: 'High-performance corporate sites, portals & web apps with SEO-first architecture.', color: 'i-b', slug: 'corporate-website-development' },
  { icon: 'bi-cpu-fill', title: 'Enterprise Software', desc: 'Custom multi-tenant SaaS, enterprise middleware, and mission-critical platforms.', color: 'i-v', slug: 'legacy-system-modernization' },
  { icon: 'bi-bank', title: 'Financial Software', desc: 'Core banking, digital wallets, lending systems, and investment management platforms.', color: 'i-t', slug: 'core-banking-software-development' },
  { icon: 'bi-credit-card-2-front', title: 'Payment Gateways', desc: 'PCI-DSS compliant integrations supporting global payment rails and local acquirers.', color: 'i-c', slug: 'payment-gateway-development' },
  // "Certified" removed — scheme certification is issued to the institution operating the
  // platform, not to the development firm. Matches app/layout.tsx:121 and the /services FAQ.
  { icon: 'bi-patch-check-fill', title: 'Mastercard / Visa', desc: 'Direct integrations with Mastercard and Visa networks — issuing and acquiring.', color: 'i-o', slug: 'mastercard-visa-integration' },
  { icon: 'bi-phone-fill', title: 'Mobile Apps', desc: 'Cross-platform iOS & Android apps built with Flutter and native Swift/Kotlin.', color: 'i-g', slug: 'cross-platform-app-development' },
  { icon: 'bi-heart-pulse-fill', title: 'Healthcare Software', desc: 'HIPAA-compliant EHR, telemedicine, and clinical workflow platforms for providers.', color: 'i-p', slug: 'ehr-clinical-software-development' },
  { icon: 'bi-clipboard2-pulse-fill', title: 'Medical Billing', desc: 'End-to-end billing with ICD-10/CPT coding, claim management, and payer integration.', color: 'i-c', slug: 'medical-billing-software-development' },
  { icon: 'bi-diagram-3-fill', title: 'ERP Systems', desc: 'Custom ERP integrating finance, HR, supply chain, and procurement in one system.', color: 'i-v', slug: 'erp-software-development' },
  { icon: 'bi-people-fill', title: 'CRM Systems', desc: 'AI-powered CRM with lead scoring, pipeline analytics, and omnichannel engagement.', color: 'i-o', slug: 'crm-software-development' },
  { icon: 'bi-shield-lock-fill', title: 'AML Systems', desc: 'Real-time monitoring, risk scoring, and regulatory reporting for compliant institutions.', color: 'i-t', slug: 'aml-case-management-risk-scoring' },
  { icon: 'bi-flag-fill', title: 'CFT Compliance', desc: 'Counter-Financing of Terrorism with PEP screening and automated STR generation.', color: 'i-b', slug: 'sanctions-pep-screening-software' },
  { icon: 'bi-activity', title: 'Transaction Monitoring', desc: 'ML-powered analytics detecting suspicious patterns across millions of transactions.', color: 'i-p', slug: 'transaction-monitoring-software-development' },
  { icon: 'bi-filetype-xml', title: 'XML Schema Integration', desc: 'ISO 20022, SWIFT XML, and HL7 FHIR schema processing for financial messaging.', color: 'i-y', slug: 'financial-messaging-schema-integration' },
  { icon: 'bi-buildings-fill', title: 'Government Portals', desc: 'National identity portals with NADRA/CNIC API, digital signature, and e-gov services.', color: 'i-g', slug: 'government-portal-development' },
  { icon: 'bi-bank2', title: 'FMU Pakistan', desc: 'Full GOAML integration, STR/CTR filing, and SBP regulatory compliance dashboards.', color: 'i-v', slug: 'goaml-fmu-reporting-integration' },
  { icon: 'bi-plug-fill', title: 'API Development', desc: 'RESTful & GraphQL APIs with enterprise security, rate limiting, and developer portals.', color: 'i-c', slug: 'api-development-integration' },
  { icon: 'bi-cloud-fill', title: 'Cloud Solutions', desc: 'AWS, Azure & GCP architecture, migration, and managed infrastructure for enterprises.', color: 'i-b', slug: 'cloud-migration-services' },
  { icon: 'bi-robot', title: 'AI Automation', desc: 'ML pipelines, NLP chatbots, document processing, and predictive analytics platforms.', color: 'i-t', slug: 'ai-development-services' },
  { icon: 'bi-layers-fill', title: 'Custom SaaS Platforms', desc: 'Multi-tenant SaaS with subscription billing, white-labeling, and analytics dashboards.', color: 'i-o', slug: 'custom-saas-development' },
  { icon: 'bi-apple', title: 'iOS Development', desc: 'Native Swift & SwiftUI apps optimized for performance, security, and App Store approval.', color: 'i-b', slug: 'ios-app-development' },
  { icon: 'bi-android2', title: 'Android Development', desc: 'Kotlin-first apps for diverse device ecosystems and enterprise Play Store deployment.', color: 'i-g', slug: 'android-app-development' }
];

export const whyUs: WhyUsItem[] = [
  { num: '01', icon: 'bi-shield-check', title: 'Security-First Engineering', desc: 'OWASP, PCI-DSS, ISO 27001, and HIPAA compliance built in from day one — never an afterthought.', color: 'i-t' },
  { num: '02', icon: 'bi-graph-up-arrow', title: 'Infinite Scalability', desc: 'Cloud-native architectures designed to scale from 1,000 to 100 million users without re-platforming.', color: 'i-b' },
  { num: '03', icon: 'bi-award-fill', title: 'Regulatory Expertise', desc: 'Deep knowledge of FATF, FMU Pakistan, SBP, FCA, and global financial compliance — coded precisely.', color: 'i-v' },
  { num: '04', icon: 'bi-lightning-fill', title: 'Rapid Delivery', desc: 'Agile sprints with CI/CD pipelines deliver production-ready features every two weeks, consistently.', color: 'i-o' },
  { num: '05', icon: 'bi-headset', title: '24/7 Dedicated Support', desc: 'Round-the-clock NOC monitoring, SLA-backed support tiers, and dedicated account managers.', color: 'i-c' },
  { num: '06', icon: 'bi-globe2', title: 'Global Delivery Model', desc: 'Office in Islamabad — follow-the-sun development velocity.', color: 'i-t' }
];

export const industries: IndustryItem[] = [
  { icon: 'bi-bank2', title: 'Banking & Fintech', desc: 'Core banking, AML/CFT, payment rails, digital wallets', color: 'i-t' },
  { icon: 'bi-hospital-fill', title: 'Healthcare & MedTech', desc: 'EHR, telemedicine, medical billing, HIPAA solutions', color: 'i-p' },
  { icon: 'bi-buildings-fill', title: 'Government & Public Sector', desc: 'Identity portals, citizen services, e-government', color: 'i-b' },
  { icon: 'bi-cart-fill', title: 'E-Commerce & Retail', desc: 'B2B/B2C platforms, inventory, order processing', color: 'i-o' },
  { icon: 'bi-gear-wide-connected', title: 'Manufacturing & Logistics', desc: 'ERP, supply chain, warehouse automation, IoT', color: 'i-v' },
  { icon: 'bi-mortarboard-fill', title: 'Education & EdTech', desc: 'LMS, virtual classrooms, student management', color: 'i-c' }
];

export const techStack: TechStackItem[] = [
  { icon: '⚛️', name: 'React' },
  { icon: '🟢', name: 'Node.js' },
  { icon: '🐍', name: 'Python' },
  { icon: '☕', name: 'Java' },
  { icon: '🔷', name: '.NET Core' },
  { icon: '🦋', name: 'Flutter' },
  { icon: '☁️', name: 'AWS' },
  { icon: '🔵', name: 'Azure' },
  { icon: '🐳', name: 'Docker' },
  { icon: '⚙️', name: 'Kubernetes' },
  { icon: '🐘', name: 'PostgreSQL' },
  { icon: '🤖', name: 'TensorFlow' }
];

export interface PortfolioProject extends PortfolioItem {
  cat: string;
}

// TODO(client): the 9 `img` values below are hotlinked Unsplash stock photographs standing in
// for real project work. Same credibility problem as the team photos (CLIENT-ACTIONS.md item 1),
// and hotlinking leaks every visitor to images.unsplash.com on page load. Replace with real
// screenshots, redacted architecture diagrams, or neutral branded panels — self-hosted.
// NOTE: SEO-CHANGELOG.md "Not done, and why" describes these as "~30 CSS background URLs in
// globals.css". That is inaccurate: there are zero external url() references in any CSS file.
// The real exposure is these 9 entries in this file.
export const portfolioProjects: PortfolioProject[] = [
  {
    cat: 'fintech',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75',
    tags: 'Fintech · AML · Compliance',
    title: 'CoreBanking AML Suite',
    desc: 'Real-time transaction monitoring and GOAML-integrated compliance for a Tier-1 bank processing 2M+ daily transactions.',
    tech: ['Python', 'React', 'PostgreSQL', 'FMU']
  },
  {
    cat: 'healthcare',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=75',
    tags: 'Healthcare · EHR · HIPAA',
    title: 'MediCore EHR Platform',
    desc: 'HIPAA-compliant Electronic Health Records deployed across 40+ hospitals with integrated telemedicine and billing.',
    tech: ['.NET Core', 'HL7 FHIR', 'Angular']
  },
  {
    cat: 'government',
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=75',
    tags: 'Government · Identity · PKI',
    title: 'NatID Verification Portal',
    desc: 'National identity verification with CNIC/NADRA API, biometric authentication, and PKI digital signatures.',
    tech: ['Java', 'NADRA API', 'PKI']
  },
  {
    cat: 'fintech',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75',
    tags: 'Fintech · Payments · Visa/MC',
    title: 'TranzAxis Payment Gateway',
    // TODO(client): confirm or delete $2.4B annual volume, 99.99% uptime and <200ms
    // authorization. CLIENT-ACTIONS.md item 7. Unevidenced performance figures attached to a
    // named platform are the highest-risk claim class on this site. "certified" removed here
    // for the same reason as app/layout.tsx:121.
    desc: 'Mastercard and Visa payment processing, engineered to PCI-DSS and taken through scheme certification.',
    tech: ['Node.js', 'Mastercard', 'PCI DSS']
  },
  {
    cat: 'enterprise',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=75',
    tags: 'Enterprise · ERP · Manufacturing',
    title: 'OmniERP Manufacturing Suite',
    desc: 'Integrated ERP covering production, inventory, HR, and finance for a multinational conglomerate across 3 countries.',
    tech: ['.NET', 'SQL Server', 'Azure']
  },
  {
    cat: 'mobile',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=75',
    tags: 'Mobile · Fintech · Wallet',
    title: 'FinSync Digital Wallet',
    desc: 'Cross-platform digital wallet with RAAST instant payments, P2P transfers, bill payments. 1M+ active users.',
    tech: ['Flutter', 'RAAST', 'SBP']
  },
  {
    cat: 'healthcare',
    img: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=75',
    tags: 'Healthcare · Telemedicine · Mobile',
    title: 'CarePulse Telemedicine App',
    desc: 'HIPAA-compliant telemedicine iOS/Android app with HD video, e-prescriptions, and remote vitals. 500K+ users.',
    tech: ['Swift', 'Kotlin', 'WebRTC']
  },
  {
    cat: 'enterprise',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=75',
    tags: 'Enterprise · CRM · AI',
    title: 'NovuCRM Intelligence Suite',
    desc: 'AI-powered CRM with ML lead scoring, revenue forecasting, and omnichannel engagement with native mobile app.',
    tech: ['React', 'Python ML', 'AWS']
  },
  {
    cat: 'government',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75',
    tags: 'Government · Tax · FBR',
    title: 'TaxLink Revenue Portal',
    desc: 'Federal tax filing portal integrating FBR APIs, e-signature workflows, automated assessment, and compliance dashboards.',
    tech: ['Java EE', 'FBR API', 'Oracle']
  }
];

export const faqs: FaqItem[] = [
  { q: 'What industries does NovuLabs specialize in?', a: 'Banking & Fintech, Healthcare, Government, Manufacturing, and E-Commerce. Our deepest expertise is in AML, CFT, and FMU Pakistan compliance for regulated financial institutions.' },
  { q: 'How do I start a project with NovuLabs?', a: 'Book a free consultation — a 45-minute discovery call with a senior architect, zero commitment. We listen first, then advise on the right approach for your specific needs.' },
  { q: 'Do you offer post-launch support and maintenance?', a: 'Yes. Tiered SLA packages from standard business-hours support to 24/7 platinum tiers with 4-hour guaranteed response. All enterprise clients get a dedicated account manager.' },
  { q: 'Are your solutions compliant with FMU Pakistan regulations?', a: 'Absolutely. We have live deployments at multiple SBP-regulated institutions — GOAML integration, STR/CTR reporting, AML/CFT screening, all under FMU and FATF frameworks.' },
  { q: 'Can you work alongside our existing team?', a: 'Yes. Staff augmentation, co-development, and full outsourcing — we adapt to your stack, tools, and methodologies. Many clients embed our engineers alongside their in-house teams.' }
];

/**
 * Leadership and author profiles.
 * ---------------------------------------------------------------------------
 * ⚠️ CLIENT ACTION REQUIRED — HIGHEST-ROI CHANGE ON THE SITE.
 *
 * These three profiles previously used Unsplash stock photographs of strangers
 * under the real names of the company's CEO, CTO and COO. For a vendor asking a
 * bank to trust it with transaction monitoring, that is the single most
 * damaging credibility error on the site — and it is a Search Quality Rater
 * Guidelines negative signal on top of the commercial cost.
 *
 * They have been replaced with neutral branded monograms, which is honest.
 * Replace them with real photographs (self-hosted WebP/JPEG, square, ≥512px).
 * That is one afternoon of work and it is worth more than everything else in
 * this branch combined.
 *
 * `credentials` is intentionally empty. Populate it only with credentials that
 * can be verified — CAMS, CISSP, AWS certifications, degrees, prior employers.
 * An empty credentials array renders nothing; an invented one is a liability.
 */

/**
 * Contact-page FAQs.
 *
 * Lifted out of the client component so FAQPage JSON-LD can be emitted from the
 * server. The Q&A text was already visible on the page; only its location in
 * the codebase changed, which is what keeps the markup policy-compliant.
 */
export const contactFaqs: FaqItem[] = [
  { q: 'What is the minimum project size NovuLabs works with?', a: 'Typically $15,000 USD for a standalone module or MVP. Full enterprise platforms start from $50,000. We focus on end-to-end delivery — not hourly freelance work.' },
  { q: 'Do you sign NDAs before discussions?', a: 'Yes, mutual NDAs before any substantive technical discussion. Your IP and competitive information are protected from the first call.' },
  { q: 'Can you work alongside our existing in-house team?', a: 'Yes. Staff augmentation, co-development, and full outsourcing. Our engineers adapt to your existing stack, tools, sprint ceremonies, and communication preferences.' },
  { q: 'What compliance frameworks do you work to?', a: 'FATF, FMU Pakistan, SBP, HIPAA, HL7 FHIR, PCI-DSS, ISO 27001, GDPR, and Mastercard/Visa scheme requirements. To be precise about the distinction: we engineer to these standards. Where a framework issues certification, that certificate is held by the entity operating the environment, not by its development vendor.' },
  { q: 'Do you offer fixed-price or time-and-material contracts?', a: 'Both. Fixed-price for well-defined, stable requirements. Time-and-material for evolving enterprise platforms. We recommend a model after the discovery call rather than before it.' },
];

export const teamMembers: TeamMemberProfile[] = [
  {
    slug: 'muneeb-ali-jaffari',
    name: 'Muneeb Ali Jaffari',
    role: 'CEO & Founder',
    img: '/team/muneeb-ali-jaffari.jpg',
    imgAlt: 'Muneeb Ali Jaffari, CEO and Founder of NovuLabs',
    bio: 'Sets the commercial direction and takes the first technical call on most enterprise engagements.',
    longBio:
      'Muneeb founded NovuLabs and leads its enterprise engagements, including the initial architecture conversation on most new work. He writes here on build-versus-buy economics and on why the honest recommendation is frequently to buy.',
    skills: ['Enterprise strategy', 'Build vs buy', 'Delivery models'],
    credentials: [],
    knowsAbout: [
      'Enterprise software strategy',
      'Build versus buy assessment',
      'Total cost of ownership modelling',
    ],
  },
  {
    slug: 'shamroz-ali-zaidi',
    name: 'Shamroz Ali Zaidi',
    role: 'Chief Technology Officer',
    img: '/team/shamroz-ali-zaidi.jpg',
    imgAlt: 'Shamroz Ali Zaidi, Chief Technology Officer of NovuLabs',
    bio: 'Owns platform architecture — multi-tenant systems, cloud, and the security posture underneath both.',
    longBio:
      'Shamroz leads platform architecture at NovuLabs, covering multi-tenant SaaS design, cloud and Kubernetes platform engineering, and the security posture of regulated workloads. He writes here on HIPAA safeguards and HL7 FHIR interoperability.',
    skills: ['Platform architecture', 'Cloud & Kubernetes', 'Security engineering'],
    credentials: [],
    knowsAbout: [
      'Multi-tenant SaaS architecture',
      'HIPAA Security Rule implementation',
      'HL7 FHIR interoperability',
      'Kubernetes platform engineering',
    ],
  },
  {
    slug: 'ali-zaidi',
    name: 'Ali Zaidi',
    role: 'Chief Operating Officer',
    img: '/team/ali-zaidi.jpg',
    imgAlt: 'Ali Zaidi, Chief Operating Officer of NovuLabs',
    bio: 'Runs delivery and the compliance practice, including AML/CFT engagements with SBP-regulated institutions.',
    longBio:
      'Ali runs delivery operations and the compliance practice at NovuLabs, including AML/CFT engagements with SBP-regulated institutions. He writes here on goAML integration, transaction monitoring design, and what regulatory examination actually asks of a system.',
    skills: ['AML/CFT programmes', 'Delivery operations', 'Regulatory engagement'],
    credentials: [],
    knowsAbout: [
      'AML/CFT compliance programmes',
      'goAML STR and CTR reporting',
      'Transaction monitoring system design',
      'FMU and SBP regulatory requirements',
    ],
  },
];
