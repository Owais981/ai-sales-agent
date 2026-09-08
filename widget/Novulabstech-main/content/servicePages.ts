/**
 * Dedicated service pages.
 * ---------------------------------------------------------------------------
 * WHY THIS FILE EXISTS
 *
 * The site previously carried 22 services on a single /services URL with only
 * fragment anchors (/services#fintech, /services#compliance, …). A URL fragment
 * is not a document: Google indexes one page, so ~1,200 words had to represent
 * 22 distinct commercial intents — roughly 55 words per service. A competitor
 * with a dedicated 1,500-word page on one of those intents wins that comparison
 * mechanically, regardless of domain authority.
 *
 * This splits the commercial surface into seven intent-matched documents, each
 * with its own clean URL, H1, title, description, FAQ and Service schema.
 * /services survives as a hub that links to all seven.
 *
 * Content rule: no metric, client name or certification appears here unless it
 * already appears elsewhere on the site and the client can evidence it. Where a
 * claim needed evidence we did not have, it was written as a description of
 * method rather than a claim of result.
 */

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServicePage {
  slug: string;
  /** H1 — matches search intent, not internal naming. */
  h1: string;
  /** <title> without the brand; layout appends " | NovuLabs". Keep ≤ 49 chars. */
  seoTitle: string;
  description: string;
  /** Short label for nav, breadcrumbs and hub cards. */
  navLabel: string;
  icon: string;
  /** One-paragraph positioning, used on the hub page and as the page intro. */
  summary: string;
  /** schema.org Service.serviceType */
  serviceType: string;
  keywords: string[];
  /** Body sections. `heading` renders as <h2>. */
  sections: { heading: string; body: string[] }[];
  /** "What's included" capability list — also becomes the OfferCatalog. */
  includes: string[];
  /** Technology and standards actually named elsewhere on the site. */
  stack: string[];
  faqs: ServiceFaq[];
  /** Internal links out to portfolio case studies and related content. */
  relatedCaseStudies: string[];
  relatedPosts: string[];
  relatedServices: string[];
  /** Legacy /services#anchor this page replaces, so old links can be mapped. */
  legacyAnchor: string;
}

export const servicePages: ServicePage[] = [
  // -------------------------------------------------------------------------
  {
    slug: 'aml-cft-compliance-software',
    navLabel: 'AML/CFT Compliance',
    icon: 'bi-shield-check',
    h1: 'AML/CFT Compliance Software Development',
    seoTitle: 'AML/CFT Compliance Software Development',
    description:
      'We build screening, transaction monitoring and goAML-conformant STR/CTR reporting for SBP-regulated institutions in Pakistan. Architect-led, audit-ready.',
    serviceType: 'AML/CFT compliance software development',
    summary:
      'Screening, transaction monitoring and goAML-conformant regulatory reporting, engineered into core banking, EMI and wallet platforms for institutions answerable to SBP and FMU.',
    keywords: [
      'AML compliance software Pakistan',
      'CFT compliance solutions for banks',
      'goAML integration services',
      'FMU Pakistan reporting software',
      'STR CTR automated reporting software',
      'transaction monitoring system development',
      'PEP screening software',
      'sanctions screening implementation',
      'FATF compliance software',
    ],
    sections: [
      {
        heading: 'Compliance is an architectural property, not a bolt-on',
        body: [
          'Most AML remediation work we are asked to do exists because compliance was added to a transaction platform after the platform was designed. The symptoms are consistent: screening runs against a customer record that three services disagree about, alerts cannot be reproduced six months later because the transaction table is mutable, and the reporting pipeline was written against a sample XML file rather than against the schema the Financial Monitoring Unit actually validates.',
          'We build the other way round. The customer record is resolved to one authoritative entity before screening is designed. The transaction stream is append-only, so any alert can be reconstructed exactly as the system saw it at decision time. The reporting pipeline validates against the goAML schema in your own environment before anything is submitted. None of this is exotic — it is just considerably cheaper to decide at design time than to retrofit under examination pressure.',
        ],
      },
      {
        heading: 'Screening that survives Pakistani name data',
        body: [
          'Identity screening against the NACTA Proscribed Persons list, UN Security Council Consolidated List and OFAC SDN is straightforward to describe and difficult to tune. Urdu-to-Roman transliteration produces several valid spellings for the same person, honorifics and patronymics appear inconsistently, and the same CNIC frequently sits against differently spelled name records inside a single institution.',
          'Exact matching misses real hits. Untuned fuzzy matching produces alert queues an analyst cannot work honestly — and an analyst dismissing hundreds of alerts a day will eventually dismiss the one that mattered. We tune phonetic and edit-distance matching per list, treat the threshold as a governed, version-controlled parameter, and log every tuning change with its false-negative testing and its approver. That log is what turns "why is your threshold 0.82?" from an awkward question into a two-minute answer.',
        ],
      },
      {
        heading: 'Monitoring you can explain to an examiner',
        body: [
          'Transaction monitoring detects behaviour: structuring below CTR thresholds, velocity spikes, dormant-account reactivation, geography inconsistent with a stated customer profile, round-trip flows between related parties.',
          'There is commercial pressure to lead with machine learning. We generally advise against putting a model on the regulatory critical path, because explainability is a requirement rather than a preference — "the model scored it 0.31" is not a defensible answer to an examiner. The pattern we build is layered: a deterministic rule engine produces the alerts of record with an auditable reason attached to every decision, and a model runs alongside to prioritise the analyst queue. You get the efficiency without the unexplainable artefact.',
        ],
      },
      {
        heading: 'goAML reporting, validated before submission',
        body: [
          'FMU accepts STRs and CTRs through goAML, which validates every submission against a strict XML schema. A rejected report is a report you did not file, and rejections cluster around a small set of causes: party identifiers placed in the wrong typed field, conditionally-mandatory fields modelled as optional, locale-formatted dates and separators, and narratives that are schema-valid but analytically useless to the human who reads them.',
          'We build the reporting pipeline against the schema from the first iteration, with an XSD validation stage that runs in your environment before submission, and we treat the reason-for-suspicion narrative as a product surface rather than a free-text box — because it is read by an analyst, and its quality is a visible reflection of your programme.',
        ],
      },
    ],
    includes: [
      'Customer entity resolution across onboarding, ledger and CRM systems',
      'Real-time and batch sanctions, PEP and proscribed-persons screening',
      'Match-threshold tuning with governed, auditable change control',
      'Deterministic transaction monitoring rule engine with alert reasoning',
      'Append-only event storage for reproducible alert reconstruction',
      'Case management and analyst workflow for alert disposition',
      'goAML XML generation with pre-submission XSD validation',
      'STR and CTR automation with narrative quality controls',
      'Regulatory audit trail and examination evidence packs',
      'Model-assisted alert prioritisation, kept off the critical path',
    ],
    stack: ['Python', 'Java', 'PostgreSQL', 'Kafka', 'goAML XML', 'FMU', 'SBP', 'FATF', 'OFAC', 'NACTA'],
    faqs: [
      {
        q: 'Do you integrate with the FMU goAML portal directly?',
        a: 'Yes. We generate goAML-conformant XML for STR and CTR submissions and validate it against the schema in your own environment before anything reaches FMU, so schema rejections are caught internally rather than after filing.',
      },
      {
        q: 'Can you work with our existing core banking system?',
        a: 'Usually, yes. Most of our AML work sits alongside an incumbent core rather than replacing it — we integrate at the transaction event and customer record level. The main question is whether the core can emit an immutable transaction event stream; where it cannot, we build that layer.',
      },
      {
        // This page's FAQ used to duplicate a question, word for word, that
        // also appears on the more specific transaction monitoring page
        // (content/serviceSpokes.ts). One topic, two identical answers on two
        // indexable URLs, is exactly the kind of duplication that page's own
        // FAQPage schema warns against. Replaced with a question this page,
        // as the pillar, is actually the right place to answer: how its own
        // five narrower sub-services fit together as one programme.
        q: 'How do screening, monitoring and reporting fit together as one programme?',
        a: 'They are three connected subsystems, not three separate purchases. Sanctions and PEP screening happens at onboarding and on an ongoing basis; transaction monitoring watches behaviour after that; and a case that either produces goes to goAML reporting once a decision is made. We build them to integrate because a screening hit or a monitoring alert that dead-ends in a spreadsheet is where most AML programmes actually fail.',
      },
      {
        q: 'How long does an AML/CFT implementation take?',
        a: 'It depends almost entirely on the state of your customer data. Where an authoritative customer record already exists, screening and monitoring can be delivered in months. Where identity is scattered across systems, entity resolution comes first and dominates the timeline. We assess this before quoting rather than after.',
      },
      {
        q: 'Which regulations does your work cover?',
        a: 'Primarily the SBP AML/CFT/CPF regulatory framework and FMU reporting obligations under the Anti-Money Laundering Act 2010, aligned to the FATF Recommendations. We also build to sanctions obligations imposed by correspondent banking relationships.',
      },
    ],
    relatedCaseStudies: ['corebanking-aml-suite', 'finsync-digital-wallet'],
    relatedPosts: ['navigating-aml-cft-regulations-pakistan-2026'],
    relatedServices: ['fintech-software-development', 'enterprise-software-development'],
    legacyAnchor: 'compliance',
  },

  // -------------------------------------------------------------------------
  {
    slug: 'fintech-software-development',
    navLabel: 'Fintech & Payments',
    icon: 'bi-bank',
    h1: 'Fintech & Payments Software Development',
    seoTitle: 'Fintech & Payments Software Development',
    description:
      'Core banking, card switching, RAAST and 1LINK connectivity, and payment infrastructure engineered to PCI-DSS requirements by senior architects.',
    serviceType: 'Fintech and payments software engineering',
    summary:
      'Core banking modernisation, card payment switching, RAAST and 1LINK connectivity, and digital wallet infrastructure for licensed institutions and EMIs.',
    keywords: [
      'fintech software development Pakistan',
      'core banking system development',
      'payment gateway development',
      'RAAST integration services',
      '1LINK payment switch integration',
      'PCI-DSS compliant payment development',
      'digital wallet app development',
      'EMI platform development Pakistan',
    ],
    sections: [
      {
        heading: 'Payments engineering is a latency and correctness problem',
        body: [
          'Payment systems fail in two directions and both are expensive. Correctness failures produce reconciliation breaks, duplicate settlements and disputes that cost more to resolve than the transactions were worth. Latency failures produce authorisation timeouts, which your scheme partners measure and your customers feel immediately.',
          'The engineering discipline that prevents both is unglamorous: idempotency keys on every mutating operation so retries are safe, a settlement model that reconciles continuously rather than nightly, and an explicit decision about which checks run inside the authorisation path and which run after it. We make that last decision deliberately and document it, because when it happens by accident — usually as an ordering artefact of implementation — you discover it during a traffic peak.',
        ],
      },
      {
        heading: 'Local rails: RAAST, 1LINK and the schemes',
        body: [
          'Pakistan-specific payment rails carry their own integration realities. RAAST instant payments impose settlement finality semantics that differ from card authorisation flows, and building both against a single internal abstraction is a common source of subtle bugs. 1LINK switch connectivity has its own message conventions and certification path.',
          'On the card side, Mastercard and Visa integration work is dominated less by the protocol than by certification: test-case coverage, mandated message fields, and the operational evidence the schemes require. Teams that have not done it before consistently underestimate the certification calendar rather than the code.',
        ],
      },
      {
        heading: 'PCI-DSS as an engineering constraint',
        body: [
          'We engineer payment infrastructure to PCI-DSS requirements: cardholder data environment scoping and segmentation, tokenisation so that primary account numbers do not propagate into systems that have no business holding them, key management with defined rotation, and logging that satisfies the audit requirements without itself becoming a leak of sensitive authentication data.',
          'To be precise about what that does and does not mean: designing and building to the standard is engineering work we do. Formal PCI-DSS certification is issued to the entity operating the environment, following assessment by a Qualified Security Assessor. We build systems intended to pass that assessment; the certificate is yours, not ours.',
        ],
      },
    ],
    includes: [
      'Core banking platform development and modernisation',
      'Card payment switching and authorisation host integration',
      'Mastercard and Visa certification support',
      'RAAST instant payment integration',
      '1LINK switch connectivity',
      'Digital wallet and EMI platform engineering',
      'Tokenisation and cardholder data environment scoping',
      'Idempotent transaction handling and continuous reconciliation',
      'Merchant onboarding and settlement workflows',
      'Dispute and chargeback handling systems',
    ],
    stack: ['Node.js', 'Java', 'Go', 'PostgreSQL', 'Kafka', 'ISO 8583', 'ISO 20022', 'RAAST', '1LINK', 'PCI-DSS'],
    faqs: [
      {
        q: 'Can you integrate RAAST into an existing wallet or core?',
        a: 'Yes, and it is one of the more common engagements we take. The main design question is whether your internal transaction abstraction can represent RAAST settlement finality correctly alongside card authorisation semantics — collapsing the two usually causes problems later.',
      },
      {
        q: 'Are you PCI-DSS certified?',
        a: 'No, and neither is any development firm in a way that would transfer to you. PCI-DSS certification is issued to the entity operating the cardholder data environment after assessment by a Qualified Security Assessor. We engineer systems to the standard so that your assessment goes smoothly; the certificate is issued to you.',
      },
      {
        q: 'Do you support Mastercard and Visa certification?',
        a: 'Yes. We have taken payment platforms through scheme certification and plan for the certification calendar explicitly, because it is more often the schedule constraint than the engineering is.',
      },
      {
        q: 'Can you modernise a legacy core banking system incrementally?',
        a: 'That is usually the only sane approach. We favour strangler-pattern migration — routing specific capabilities to new services behind a stable interface while the legacy core continues to run — over a cutover, which concentrates all the risk on a single night.',
      },
    ],
    relatedCaseStudies: ['tranzaxis-payment-gateway', 'finsync-digital-wallet', 'corebanking-aml-suite'],
    relatedPosts: ['navigating-aml-cft-regulations-pakistan-2026'],
    relatedServices: ['aml-cft-compliance-software', 'mobile-app-development'],
    legacyAnchor: 'fintech',
  },

  // -------------------------------------------------------------------------
  {
    slug: 'healthcare-software-development',
    navLabel: 'Healthcare IT',
    icon: 'bi-heart-pulse',
    h1: 'HIPAA-Compliant Healthcare Software Development',
    seoTitle: 'HIPAA Healthcare Software Development',
    description:
      'EHR, telemedicine and clinical integration platforms built to the HIPAA Security Rule with genuine HL7 FHIR interoperability — not just a FHIR endpoint.',
    serviceType: 'Healthcare software development',
    summary:
      'Electronic health records, telemedicine and clinical integration platforms engineered to the HIPAA Security Rule and to real HL7 FHIR interoperability.',
    keywords: [
      'HIPAA compliant software development',
      'HL7 FHIR integration services',
      'EHR system development',
      'EMR software development',
      'telemedicine app development',
      'hospital management system development',
      'healthcare interoperability engineering',
    ],
    sections: [
      {
        heading: 'A note on "HIPAA certified"',
        body: [
          'There is no such thing, and we would rather say so than trade on the confusion. The US Department of Health and Human Services does not accredit vendors and no body issues a HIPAA certificate that HHS recognises. Organisations attest to compliance and are assessed against the Security Rule; independent assessments like HITRUST CSF or SOC 2 are real and verifiable, but they are not HIPAA certification either.',
          'What we can tell you concretely: which Security Rule safeguards a system implements, whether we will operate under a Business Associate Agreement, and what the audit evidence looks like. Experienced hospital CIOs already know the distinction, and a vendor claiming certification signals inexperience rather than confidence.',
        ],
      },
      {
        heading: 'The audit log is the part that fails assessments',
        body: [
          'Encryption in transit and at rest is universally implemented. The technical safeguard that actually fails assessments is audit controls, because the requirement is not "log access" — it is to record activity in systems containing protected health information in a way that supports later review.',
          'In practice: who viewed which patient record, when, from where, under what access justification, in a store the viewer cannot alter. Application logs mixed into general telemetry on a 30-day retention will not satisfy this. A separate append-only PHI access log will, and it is dramatically cheaper to build in the first sprint than to reconstruct after an assessment finding — reconstruction being, in the strict sense, impossible.',
        ],
      },
      {
        heading: 'FHIR: native model or translation layer',
        body: [
          'HL7 FHIR replaces bespoke point-to-point integration with defined RESTful resources — Patient, Encounter, Observation, Condition, MedicationRequest — exchanged over ordinary HTTP. The decision that matters is whether FHIR resources are your data model or whether you map to them at the boundary.',
          'Modelling natively gives the cleanest interoperability story and removes a class of mapping bugs, but FHIR resources are shaped for exchange rather than transactional workloads. For a platform with substantial clinical workflow, a translation layer over a domain-appropriate internal model is usually the better trade — provided mapping tests are treated as first-class tests, because a silently dropped code system produces an observation that looks right and means something else.',
          'The genuinely hard part is terminology. LOINC, SNOMED CT, ICD and RxNorm mapping is clinical judgement, not data engineering, and it needs clinical review time in the budget. A platform exchanging structurally valid FHIR that carries unmapped local codes is interoperable in form and useless in substance.',
        ],
      },
    ],
    includes: [
      'EHR and EMR platform development',
      'HIPAA Security Rule safeguard implementation',
      'Append-only PHI access logging and audit evidence',
      'HL7 FHIR resource modelling or translation layer design',
      'HL7 v2 to FHIR migration',
      'Clinical terminology mapping support (LOINC, SNOMED CT, ICD, RxNorm)',
      'Telemedicine platforms with clinical-grade video',
      'e-prescribing and medication workflows',
      'Laboratory and diagnostic system integration',
      'Medical billing and claims integration',
    ],
    stack: ['.NET Core', 'HL7 FHIR', 'HL7 v2', 'Angular', 'React', 'PostgreSQL', 'WebRTC', 'LOINC', 'SNOMED CT'],
    faqs: [
      {
        q: 'Are your healthcare platforms HIPAA certified?',
        a: 'No — and no vendor is, because HIPAA certification does not exist. HHS does not accredit anyone. We build to the HIPAA Security Rule safeguards, will operate under a Business Associate Agreement, and can walk you through the audit evidence a system produces.',
      },
      {
        q: 'Can you add FHIR support to an existing EHR?',
        a: 'Yes, usually as a translation layer over your existing model rather than a rewrite. The scoping question is which resources you actually need to exchange and what terminology mapping is required — the second one is normally the larger effort.',
      },
      {
        q: 'Do you handle HL7 v2 to FHIR migration?',
        a: 'Yes. In most cases both run in parallel for a period, since partner systems migrate on their own timelines. We design the mapping layer expecting that coexistence rather than treating v2 as decommissioned on day one.',
      },
      {
        q: 'Who does the clinical terminology mapping?',
        a: 'It needs clinical review — mapping a local code to SNOMED CT is a clinical judgement. We build the tooling, the validation and the test coverage, and we work alongside your clinical staff or an appointed terminologist for the judgement calls.',
      },
    ],
    relatedCaseStudies: ['medicore-ehr-platform', 'carepulse-telemedicine-app'],
    relatedPosts: ['scaling-healthcare-software-hipaa-hl7-fhir'],
    relatedServices: ['cloud-ai-automation', 'mobile-app-development'],
    legacyAnchor: 'healthcare',
  },

  // -------------------------------------------------------------------------
  {
    slug: 'enterprise-software-development',
    navLabel: 'Enterprise Systems',
    icon: 'bi-diagram-3',
    h1: 'Custom Enterprise Software Development',
    seoTitle: 'Custom Enterprise Software Development',
    description:
      'ERP, CRM and multi-tenant SaaS platforms built around the workflows that differentiate you — and honest advice about the ones you should buy instead.',
    serviceType: 'Custom enterprise software development',
    summary:
      'ERP, CRM, multi-tenant SaaS and legacy modernisation for organisations whose workflow is their competitive advantage rather than a cost of doing business.',
    keywords: [
      'custom enterprise software development',
      'custom ERP development',
      'custom CRM development',
      'multi-tenant SaaS architecture',
      'legacy system modernization services',
      'enterprise application integration',
    ],
    sections: [
      {
        heading: 'We will tell you when to buy instead',
        body: [
          'General ledger, payroll, statutory tax filing and standard procurement are solved problems governed by rules you do not control. Executing them differently from your competitors gains you nothing, and established vendors have absorbed decades of regulatory edge cases you will not anticipate. Building there is a category error, and we say so.',
          'The case for building is specific: where your workflow is your differentiation — a lender\'s underwriting logic, a manufacturer\'s yield-optimising scheduling, a logistics operator\'s routing. The tell is heavy customisation of a single module. If eighty percent of a package fits and one module must be rebuilt, you are not buying software; you are buying a constraint and paying consultants to work around it.',
        ],
      },
      {
        heading: 'The composite architecture most mature organisations land on',
        body: [
          'Framing this as build-or-buy is itself the common mistake. The durable answer for most mid-to-large organisations is: license a proven package for commodity back-office functions and keep it close to vanilla; build custom services for the two or three workflows that constitute the advantage; and integrate through a deliberate API layer rather than direct database access.',
          'That integration layer is what buys you the option to change your mind later, and it is the piece most often cut under delivery pressure. Cutting it is how organisations end up unable to replace either system.',
        ],
      },
      {
        heading: 'Multi-tenancy decisions that are expensive to reverse',
        body: [
          'For SaaS platforms, tenant isolation strategy is close to irreversible. Shared-schema with a tenant discriminator is cheapest to operate and hardest to satisfy an enterprise security review with. Schema-per-tenant sits in between. Database-per-tenant satisfies the review and complicates every migration you will ever run.',
          'There is no universally right answer, but there is a wrong process: picking by default and discovering the constraint when your first regulated customer sends a security questionnaire. We make the choice explicitly against your actual buyer profile, and write down the reasoning so the next team understands it.',
        ],
      },
    ],
    includes: [
      'Custom ERP design and development',
      'Custom CRM and sales operations platforms',
      'Multi-tenant SaaS architecture and tenant isolation design',
      'Legacy system modernisation via strangler-pattern migration',
      'Enterprise application integration and API layer design',
      'Workflow and business process automation',
      'Reporting, analytics and data warehouse integration',
      'Role-based access control designed to survive an audit',
      'Build-versus-buy assessment before commitment',
    ],
    stack: ['.NET', 'Java', 'React', 'Node.js', 'SQL Server', 'PostgreSQL', 'Azure', 'AWS', 'Kubernetes'],
    faqs: [
      {
        q: 'How do you decide whether we should build or buy?',
        a: 'One question does most of the work: would a competitor gain anything by running this exact process? If not, buy it. We also model seven-year total cost on both sides including the parts people skip — implementation consulting, forced upgrade cycles and workflow compromise on the buy side; maintenance at 15–20% annually, key-person risk and security patching on the build side.',
      },
      {
        q: 'Can you modernise a legacy system without a big-bang cutover?',
        a: 'Yes, and we prefer to. Strangler-pattern migration routes individual capabilities to new services behind a stable interface while the legacy system keeps running. It takes longer on paper and is far less likely to produce the weekend everyone remembers.',
      },
      {
        q: 'Do we own the intellectual property?',
        a: 'Yes. Custom work is delivered to you with full IP ownership and no per-seat licensing on the code we write.',
      },
      {
        q: 'What happens after launch?',
        a: 'A custom platform needs ongoing ownership — typically 15–20% of the original build cost annually for maintenance, dependency patching and change. We offer tiered support, but we would rather you plan for that cost explicitly than discover it in year two.',
      },
    ],
    relatedCaseStudies: ['omnierp-manufacturing-suite', 'novucrm-intelligence-suite'],
    relatedPosts: ['why-custom-saas-outperforms-off-the-shelf-erp'],
    relatedServices: ['cloud-ai-automation', 'web-development'],
    legacyAnchor: 'enterprise',
  },

  // -------------------------------------------------------------------------
  {
    slug: 'mobile-app-development',
    navLabel: 'Mobile Apps',
    icon: 'bi-phone',
    h1: 'Enterprise Mobile App Development',
    seoTitle: 'Enterprise Mobile App Development',
    description:
      'Native and cross-platform mobile apps for regulated environments — wallets, telemedicine and field operations — with offline behaviour designed, not assumed.',
    serviceType: 'Mobile application development',
    summary:
      'Native and cross-platform applications for regulated environments: digital wallets, telemedicine, and field operations where connectivity is unreliable.',
    keywords: [
      'enterprise mobile app development',
      'cross-platform mobile app development',
      'fintech mobile app development Pakistan',
      'telemedicine mobile app development',
      'Flutter app development',
      'React Native development',
    ],
    sections: [
      {
        heading: 'Cross-platform or native: decide on the constraint, not the fashion',
        body: [
          'Flutter and React Native are excellent for the large majority of enterprise applications, and the shared-codebase economics are real. They stop being the right answer at specific boundaries: deep biometric and secure-enclave integration, hardware-backed key attestation, background processing with strict platform-specific behaviour, and some device-integration requirements in clinical settings.',
          'We choose per project against those constraints. Occasionally the answer is a cross-platform app with a native module for exactly the part that needs it, which keeps the economics without pretending the constraint does not exist.',
        ],
      },
      {
        heading: 'Offline is a product decision before it is a technical one',
        body: [
          'Field operations apps and wallets in areas with unreliable connectivity fail in the same way: someone assumes network availability, then bolts on caching, then discovers that the real problem is conflict resolution. Two users edited the same record offline — which one wins, and who is told?',
          'That is a product decision with regulatory implications in financial and clinical contexts, and it needs answering before the sync layer is written. We surface it early rather than letting it be settled implicitly by whichever write arrives second.',
        ],
      },
      {
        heading: 'Mobile security in regulated contexts',
        body: [
          'For wallets and clinical apps the relevant controls are concrete: certificate pinning, secure-enclave or Keystore-backed credential storage, jailbreak and root detection calibrated so it does not lock out legitimate users, no protected data in logs or crash reports, and a session model that survives real usage patterns rather than the ideal one in the specification.',
          'App store review is also a schedule dependency, not an afterthought — particularly for health and finance categories, where additional documentation is routinely requested.',
        ],
      },
      {
        heading: 'Choosing native or cross-platform on the actual constraint',
        body: [
          'This decision is usually argued on developer preference and settled on cost. Neither is the right axis. The question that matters is how much of the product depends on platform capability that cross-platform frameworks reach late or imperfectly — deep background execution, specialised hardware, biometric and secure-enclave behaviour, or heavy real-time graphics.',
          'Where an application is mostly presenting data, capturing input and calling services, cross-platform is straightforwardly the better economics: one codebase, one set of business logic, consistent behaviour. Where the product lives close to platform capability, the cross-platform saving evaporates into bridging code that is harder to maintain than two native implementations would have been.',
          'We would rather have this conversation before the estimate than after the first platform-specific requirement lands.',
        ],
      },
      {
        heading: 'Offline is a data-model decision, not a caching feature',
        body: [
          'Teams frequently plan to add offline support later, which is rarely possible, because offline capability is determined by whether the data model tolerates divergence and reconciliation rather than by whether responses are cached.',
          'The hard question is what happens when two devices change the same record while both are disconnected. Last-write-wins is simple and silently destroys data. Anything better requires deciding, per entity, what a conflict means and who resolves it. That is a domain decision, and it has to be taken before the schema is fixed.',
          'For field and clinical applications, where connectivity is genuinely unreliable, this is the single most consequential design decision in the product.',
        ],
      },
      {
        heading: 'Security on a device you do not control',
        body: [
          'A mobile application runs on hardware the user owns, which may be rooted, shared, or compromised. Anything the client can decide, an attacker can decide. Authorisation is therefore enforced server-side without exception, and the client is treated as a rendering surface rather than as a trust boundary.',
          'Credentials and tokens belong in platform secure storage rather than in application preferences, session lifetimes are short with silent refresh, and sensitive data is not written to logs, screenshots or crash reports — all three of which routinely leak more than teams expect.',
          'For financial and health applications we also assume the device may be shared, which changes session and notification design: a push preview that reveals a balance or a clinical detail on a lock screen is a disclosure.',
        ],
      },
    ],
    includes: [
      'Native iOS (Swift) and Android (Kotlin) development',
      'Cross-platform development in Flutter and React Native',
      'Offline-first architecture and conflict resolution design',
      'Biometric authentication and secure credential storage',
      'Certificate pinning and mobile threat mitigation',
      'Payment and wallet integration including RAAST',
      'Clinical-grade video for telemedicine',
      'Push notification and messaging infrastructure',
      'App store submission and review support',
    ],
    stack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'WebRTC', 'Firebase', 'RAAST'],
    faqs: [
      {
        q: 'Should we build cross-platform or native?',
        a: 'Cross-platform for most enterprise applications — the economics are real. Native where you need deep biometric or secure-enclave integration, hardware-backed key attestation, or strict platform-specific background behaviour. A cross-platform app with one native module is often the right compromise.',
      },
      {
        q: 'Can the app work offline?',
        a: 'Yes, but the design question is conflict resolution, not caching. When two users edit the same record offline, something has to decide which write wins and whether anyone is told. In financial and clinical contexts that has regulatory implications, so we settle it before writing the sync layer.',
      },
      {
        q: 'Do you handle app store submission?',
        a: 'Yes, including the additional documentation Apple and Google routinely request for finance and health category apps. We treat review as a schedule dependency rather than a final step.',
      },
    ],
    relatedCaseStudies: ['finsync-digital-wallet', 'carepulse-telemedicine-app'],
    relatedPosts: ['scaling-healthcare-software-hipaa-hl7-fhir'],
    relatedServices: ['fintech-software-development', 'healthcare-software-development'],
    legacyAnchor: 'mobile',
  },

  // -------------------------------------------------------------------------
  {
    slug: 'cloud-ai-automation',
    navLabel: 'Cloud, AI & Automation',
    icon: 'bi-cloud-check',
    h1: 'Cloud, AI & Automation Engineering',
    seoTitle: 'Cloud, AI & Automation Engineering',
    description:
      'Cloud migration, Kubernetes platform engineering and applied AI for regulated workloads — including honest advice on where AI should not sit.',
    serviceType: 'Cloud infrastructure and AI engineering',
    summary:
      'Cloud migration, Kubernetes platform engineering, and applied machine learning for organisations with data residency and auditability constraints.',
    keywords: [
      'cloud migration services Pakistan',
      'Kubernetes microservices consulting',
      'AI automation for enterprise',
      'DevOps engineering services',
      'cloud cost optimization',
      'regulated workload cloud architecture',
    ],
    sections: [
      {
        heading: 'Migration only pays if something changes',
        body: [
          'Lift-and-shift migrations reliably produce the same architecture at a higher monthly cost. The savings people expect come from elasticity, managed services replacing self-operated ones, and shutting down what nobody was using — none of which happen automatically when you move a virtual machine.',
          'We scope migrations around what will actually change, and are direct when the answer is that a given workload should stay where it is. Not everything benefits from moving.',
        ],
      },
      {
        heading: 'Data residency comes before architecture',
        body: [
          'For SBP-regulated institutions and healthcare providers, where data may physically reside is a constraint set by regulation and by contract, not by preference. It determines region selection, whether managed services are usable at all, and frequently pushes toward hybrid designs.',
          'This has to be established before architecture, because discovering a residency constraint after selecting a managed service is a rebuild rather than a configuration change.',
        ],
      },
      {
        heading: 'Where AI belongs, and where it does not',
        body: [
          'Applied machine learning earns its place in document processing, classification, forecasting, anomaly detection and analyst-queue prioritisation — tasks where being right most of the time is genuinely valuable and being wrong is recoverable.',
          'It does not belong on a regulatory critical path. If a decision must be explained to an examiner, a model score is not an explanation. In AML in particular we keep models beside the deterministic rule engine rather than inside it: the rules produce the alerts of record, the model orders the queue. The same logic applies wherever an auditable reason is required for each individual decision.',
        ],
      },
      {
        heading: 'Where automation pays, and where it quietly costs',
        body: [
          'Automation returns most on work that is high-volume, rule-stable and currently manual — reconciliation, document extraction, routine triage. It returns least on work that looks repetitive but carries frequent judgement calls, because each exception has to be handled somewhere, and an automation that covers eighty per cent of cases while making the remaining twenty harder to resolve is a net loss.',
          'The honest measure is not the proportion of volume automated. It is total effort before against total effort after, including the effort of handling what the automation could not.',
        ],
      },
      {
        heading: 'Keeping models off paths that require justification',
        body: [
          'The pattern we recommend in compliance work generalises further than people expect: use models where being right most of the time is valuable and being wrong is recoverable, and keep deterministic logic wherever a decision has to be explained.',
          'Prioritising a queue, drafting a summary, extracting a field for human confirmation — all recoverable. Deciding an outcome that a regulator, an auditor or a customer can challenge is not, and a model score is not a defensible answer to "why did the system do that".',
          'This is not scepticism about the technology. It is placing it where its failure mode is affordable.',
        ],
      },
      {
        heading: 'Cloud cost is an architecture property',
        body: [
          'Cloud spend that grows faster than usage is almost never a pricing problem. It is data egress between regions nobody intended, over-provisioned capacity sized for a peak that occurs twice a year, storage tiers never revisited, and non-production environments running around the clock.',
          'Each of those is an architectural decision, which means each is fixable by design rather than by negotiation. We would rather size infrastructure against a measured load profile than against a guess with a safety multiple applied, because the multiple is where the money goes.',
        ],
      },
    ],
    includes: [
      'Cloud migration assessment and execution (AWS, Azure)',
      'Kubernetes platform engineering and service mesh',
      'Hybrid and data-residency-constrained architecture',
      'CI/CD pipeline design and release engineering',
      'Infrastructure as code and environment reproducibility',
      'Observability, SLOs and incident response tooling',
      'Cloud cost analysis and optimisation',
      'Applied ML for classification, forecasting and anomaly detection',
      'Document processing and intelligent automation',
      'Disaster recovery and business continuity design',
    ],
    stack: ['AWS', 'Azure', 'Kubernetes', 'Terraform', 'Docker', 'Python', 'Kafka', 'Prometheus', 'Grafana'],
    faqs: [
      {
        q: 'Can regulated financial data go to the cloud in Pakistan?',
        a: 'It depends on your licence conditions, the data classification and your contractual obligations, and it is a question to settle with your compliance function before architecture rather than after. In practice a hybrid design frequently results — and we would rather establish that at the start than rebuild around it.',
      },
      {
        q: 'Will migrating to cloud reduce our costs?',
        a: 'Only if something about the architecture changes. Lift-and-shift usually costs more. Savings come from elasticity, replacing self-operated services with managed ones, and decommissioning unused capacity. We scope against those specifically, and will say when a workload should stay put.',
      },
      {
        q: 'Do you use AI in compliance systems?',
        a: 'Beside the rules, never inside them. Deterministic rules produce alerts of record because each decision needs an explainable reason for an examiner; a model prioritises the analyst queue. That gives you the throughput benefit without an unexplainable artefact on the regulatory critical path.',
      },
    ],
    relatedCaseStudies: ['novucrm-intelligence-suite', 'omnierp-manufacturing-suite'],
    relatedPosts: ['why-custom-saas-outperforms-off-the-shelf-erp'],
    relatedServices: ['enterprise-software-development', 'aml-cft-compliance-software'],
    legacyAnchor: 'cloud',
  },

  // -------------------------------------------------------------------------
  {
    slug: 'web-development',
    navLabel: 'Web Platforms',
    icon: 'bi-window-stack',
    h1: 'Enterprise Web Platform Development',
    seoTitle: 'Enterprise Web Platform Development',
    description:
      'Server-rendered web platforms, admin consoles and customer portals built for accessibility, Core Web Vitals and the crawlers that now read your site.',
    serviceType: 'Web application development',
    summary:
      'Customer portals, admin consoles and public platforms built server-rendered, accessible, and fast — including for the AI crawlers that do not run JavaScript.',
    keywords: [
      'enterprise web application development',
      'customer portal development',
      'server-side rendering Next.js',
      'web accessibility WCAG compliance',
      'Core Web Vitals optimization',
    ],
    sections: [
      {
        heading: 'Server-render, because half your readers do not run JavaScript',
        body: [
          'This used to be an SEO nicety. It is now a distribution question. GPTBot, ClaudeBot, PerplexityBot and CCBot largely do not execute JavaScript, so a client-rendered application ships them an empty shell — invisible to every major AI assistant regardless of how good the content is.',
          'We build server-rendered by default and treat "is the content in the raw HTML response?" as a release check rather than an assumption. It remains one of the few technical decisions with a direct, measurable effect on whether an AI system can cite you at all.',
        ],
      },
      {
        heading: 'Accessibility is a procurement requirement',
        body: [
          'For government and enterprise buyers, WCAG conformance is frequently a hard procurement gate rather than a preference. Retrofitting it is substantially more expensive than building to it — semantic structure, keyboard operability, focus management and contrast are architectural properties of a component library, not a CSS pass at the end.',
          'It also correlates closely with the semantic HTML quality that determines how well search engines and LLMs chunk and understand a page, so the work pays twice.',
        ],
      },
      {
        heading: 'Performance where users actually are',
        body: [
          'Core Web Vitals are measured on real devices on real networks. A platform tuned on a fast connection and a modern laptop will disappoint a user on a mid-range Android phone on a congested mobile network — which, for most of the markets our clients serve, is the median user rather than the edge case.',
          'The work is mostly unglamorous: bounded image dimensions to prevent layout shift, self-hosted critical assets rather than third-party requests on the critical path, deferred non-essential JavaScript, and a real budget on the largest contentful paint.',
        ],
      },
      {
        heading: 'Core Web Vitals are a measurement problem before they are a code problem',
        body: [
          'Most teams optimise against a lab score produced on a fast machine over a fast connection, then find the field data disagrees. The two measure different things: the lab number is a synthetic run, while ranking-relevant data comes from real users on real devices and networks.',
          'We instrument field measurement first, because it is the only thing that tells you which of the three metrics is actually failing and for whom. Largest Contentful Paint problems are usually an image or font loading decision. Interaction to Next Paint problems are usually long tasks blocking the main thread, frequently from third-party scripts nobody has audited. Cumulative Layout Shift is nearly always unreserved space for an image, an ad slot, or a late-loading font.',
          'Fixing the wrong one is common and expensive. The diagnosis is cheap by comparison.',
        ],
      },
      {
        heading: 'Third-party scripts are the usual cause of poor performance',
        body: [
          'A site that scores well on its own code can still be slow because of tag managers, chat widgets, analytics and marketing pixels — each adding a DNS lookup, a TLS handshake and main-thread work, and each typically added by someone outside engineering with no performance review.',
          'The practical discipline is a budget: every third-party script has a named owner and a stated business justification, and anything failing both is removed. Where a script has to stay, it is loaded so that it cannot block first paint, and self-hosted where licensing permits so the request stays same-origin.',
          'This also has a privacy dimension that matters in regulated sectors. Every third-party request discloses your visitor\'s IP address and user agent to that provider, which is a disclosure your privacy policy has to be able to describe accurately.',
        ],
      },
      {
        heading: 'Rendering strategy chosen per route, not per project',
        body: [
          'The choice between static generation, server rendering and client rendering is usually made once for a whole application and then defended everywhere, which produces a site that is either needlessly dynamic or awkwardly stale.',
          'Content that changes rarely should be static and served from the edge. Content personalised per request has to be server-rendered. An interactive tool where only the user sees the result can be client-rendered without cost to search visibility. Deciding this per route is more thought up front and materially better on every axis afterwards.',
        ],
      },
    ],
    includes: [
      'Server-rendered web applications (Next.js, .NET, Java)',
      'Customer portals and self-service platforms',
      'Admin consoles and internal tooling',
      'Design system and component library development',
      'WCAG 2.2 accessibility engineering and audit',
      'Core Web Vitals optimisation',
      'Technical SEO and structured data implementation',
      'Progressive web applications',
      'API design and documentation',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', '.NET', 'PostgreSQL', 'Tailwind CSS'],
    faqs: [
      {
        q: 'Why does server-side rendering matter so much now?',
        a: 'Because AI crawlers largely do not execute JavaScript. A client-rendered site serves them an empty shell, which makes it invisible to ChatGPT, Claude, Perplexity and Common Crawl no matter how strong the content is. Server rendering is now a distribution decision as much as an SEO one.',
      },
      {
        q: 'Do you handle accessibility compliance?',
        a: 'Yes, and we build to it rather than retrofitting. Semantic structure, keyboard operability, focus management and contrast are properties of the component library — adding them at the end costs several times more than designing them in.',
      },
      {
        q: 'Can you improve an existing site\'s Core Web Vitals?',
        a: 'Usually, yes. Most of the gains come from a short list: bounding image dimensions, removing third-party requests from the critical path, deferring non-essential JavaScript, and setting an actual LCP budget. We measure on representative devices and networks, not on a developer laptop.',
      },
    ],
    relatedCaseStudies: ['natid-verification-portal', 'taxlink-revenue-portal'],
    relatedPosts: ['why-custom-saas-outperforms-off-the-shelf-erp'],
    relatedServices: ['enterprise-software-development', 'cloud-ai-automation'],
    legacyAnchor: 'web',
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((s) => s.slug === slug);
}

/** Maps the old /services#anchor fragments to their new dedicated URLs. */
export const legacyAnchorMap: Record<string, string> = Object.fromEntries(
  servicePages.map((s) => [s.legacyAnchor, `/services/${s.slug}`])
);
