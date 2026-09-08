import { FaqItem } from '../types';

/**
 * Per-page FAQ sets.
 * ---------------------------------------------------------------------------
 * Six of the site's main pages carried no FAQ block and no FAQPage schema:
 * /about, /solutions, /industries, /portfolio, /team and /blog. The homepage,
 * /contact and the service pages already had them.
 *
 * WRITING RULE — answer-first.
 * Each answer opens with the actual answer in the first sentence, then
 * qualifies. Answer engines and featured snippets extract the opening clause;
 * an answer that starts with context and reaches the point in sentence three
 * gets truncated exactly where it stops being useful. This also happens to be
 * how a busy reader wants to be told something.
 *
 * HONESTY RULE — same as everywhere else on this site.
 * No pricing, no delivery timelines, no team size, no client names, no project
 * counts, no certifications. Every question a buyer genuinely asks that the
 * business has not published an answer to is answered by saying what
 * determines it, not by inventing a number.
 */

export const aboutFaqs: FaqItem[] = [
  {
    q: 'Where is NovuLabs based?',
    a: 'NovuLabs is an enterprise software house based in Islamabad, Pakistan. The engineering team sits together in one place rather than being distributed across contractors, and the regulatory environment we know best is Pakistan’s — the State Bank’s AML/CFT framework, the Financial Monitoring Unit’s reporting requirements, and the national identity infrastructure that financial onboarding depends on.',
  },
  {
    q: 'What kind of projects does NovuLabs take on?',
    a: 'We build software for regulated industries — banking and fintech, healthcare, and government. The common thread is that a regulator, not just a user, is an audience for the system: the platform has to be able to evidence what it did and why, months after the fact. That constraint shapes the architecture far more than the industry label does.',
  },
  {
    q: 'Do you work with clients outside Pakistan?',
    a: 'Yes. The regulatory depth is strongest in Pakistan, but the engineering discipline transfers: HIPAA safeguards, HL7 FHIR interoperability and PCI-DSS payment work follow the same pattern of designing for audit from the outset. If you are evaluating us for work elsewhere, the useful question is whether your problem is shaped like a regulated one.',
  },
  {
    q: 'Who takes the first call?',
    a: 'An architect who would be accountable for the technical outcome, not a salesperson. There is no pre-sales layer here. The call runs about forty-five minutes and is diagnostic rather than promotional — the most valuable outcome is frequently a scoping correction rather than a proposal.',
  },
  {
    q: 'Will you tell us if we should not build custom software?',
    a: 'Yes, and we say it before there is a proposal on the table. A meaningful share of the enquiries we receive describe requirements a mature commercial product already meets, and recommending a custom build against one that fits just sells you maintenance liability at a premium. The honest test is whether the requirement is genuinely differentiating.',
  },
  {
    q: 'Is NovuLabs ISO 27001 or HIPAA certified?',
    a: 'We describe alignment with these standards, not certification against them. Where the site says our engineering practice follows a standard, that means the practice follows it — not that a registrar has audited us. HIPAA has no certification regime at all; organisations attest to compliance. We would rather be precise about which claims are attestations and which are audited facts than let a buyer assume the stronger reading.',
  },
];

export const solutionsFaqs: FaqItem[] = [
  {
    q: 'What is the difference between NovuShield, NovuPay, NovuERP and NovuCRM?',
    a: 'They differ by which record each one owns. NovuShield owns compliance decisions and the evidence behind them. NovuPay owns money movement and the ledger. NovuERP owns operational and financial process. NovuCRM owns the relationship record. Choosing between them starts with deciding, per entity, which system holds the authoritative version and which hold copies.',
  },
  {
    q: 'Can these platforms be deployed in our own infrastructure?',
    a: 'Yes. All four are designed to be deployed into infrastructure the client controls where that is required, rather than assuming a single shared tenancy. For regulated institutions, where the data physically sits is usually a harder constraint than any functional requirement, so it is worth establishing before a demo rather than after.',
  },
  {
    q: 'How long does a platform deployment take?',
    a: 'The honest answer is that the platform configuration is rarely what determines the timeline. The work sits in the integration surface — the core system the platform has to run alongside, the identity source it authenticates against, and the migration from whatever is being replaced. Any supplier quoting a duration before seeing that surface is guessing.',
  },
  {
    q: 'What usually goes wrong in a migration?',
    a: 'Non-conforming historical data. Records with missing mandatory fields, identifiers that were free text, duplicate entities never merged, units recorded inconsistently. Deciding what to do with that history is a business decision with regulatory implications rather than a technical one, and it needs a named owner early — otherwise engineers end up silently deciding what a record means.',
  },
  {
    q: 'When is one of these platforms the wrong choice?',
    a: 'When your requirement is genuinely standard. A mature commercial product will almost always beat anything built or configured for you on cost, time to value, and the amount of maintenance you inherit. The case for a platform like ours is strongest where a regulator controls the schema, the integration targets are systems nobody else runs, and the market is too small for large vendors to have built for it properly.',
  },
];

export const industriesFaqs: FaqItem[] = [
  {
    q: 'What do banking, healthcare and government software have in common?',
    a: 'They are largely one engineering problem wearing three regulators. Each has a second audience beyond the user — an examiner who arrives later, asks what happened months ago, and expects the system to answer with evidence. That single requirement drives audit design, data retention, identity handling and release process in all three sectors.',
  },
  {
    q: 'What does AML/CFT compliance actually require from a system?',
    a: 'Three load-bearing components: screening against sanctions and proscribed-persons lists, transaction monitoring that detects behaviour rather than identity, and reporting that conforms to the Financial Monitoring Unit’s goAML schema. The reporting pipeline is the one teams most often under-build, because it looks like plumbing until the first batch of schema rejections comes back.',
  },
  {
    q: 'Do you build HIPAA-compliant healthcare software?',
    a: 'We build to HIPAA’s Security Rule safeguards — append-only access logging that is queryable by patient and time window, minimum-necessary access enforced in the data layer rather than per screen, and break-glass access that is loud rather than silent. HIPAA has no certification regime, so no vendor can honestly claim to be HIPAA certified; what matters is whether the safeguards are implemented and evidenced.',
  },
  {
    q: 'Can you integrate with NADRA, FBR or RAAST?',
    a: 'These integrations are governed by access routes rather than by engineering difficulty. The commercial and regulatory path to authoritative national infrastructure typically runs through a sponsor institution or a licensed intermediary, and that path drives your timeline far more than the integration code does. We would confirm your access route before quoting any of this work.',
  },
  {
    q: 'Why does explainability matter more than machine learning accuracy here?',
    a: 'Because explainability is a regulatory requirement rather than a preference. When an examiner asks why a transaction was or was not flagged, a model score is not a defensible answer. The pattern we recommend keeps deterministic rules as the decisions of record and uses a model only to prioritise the review queue — the analyst-efficiency benefit without an unexplainable artefact on the regulatory critical path.',
  },
];

export const portfolioFaqs: FaqItem[] = [
  {
    q: 'Why are your clients not named?',
    a: 'Every engagement shown is covered by an NDA, and we do not publish client names or logos without written permission. Clients are described by verifiable category instead — "a Tier-1 commercial bank in Pakistan", for example. This costs us credibility with some buyers and we accept that, because the alternative is disclosing a relationship somebody asked us to keep confidential.',
  },
  {
    q: 'Are the product names in these case studies real products?',
    a: 'No. Names like "CoreBanking AML Suite" are internal delivery codenames, labelled as such on each page. They are not commercial products you can buy, and they are not the client’s name for the system.',
  },
  {
    q: 'Are the metrics in these case studies verified?',
    a: 'Not yet, and each page says so. Every figure is drawn from delivery records held under NDA and is pending independent confirmation; each case study renders a provenance note stating this. Where a figure cannot be evidenced it will be removed rather than qualified — an unverifiable quantified claim is worse than no claim.',
  },
  {
    q: 'Can you provide references?',
    a: 'References are arranged case by case with the client’s consent, at the stage where a conversation is serious enough to justify asking them. We do not list referenceable clients publicly for the same reason we do not publish names.',
  },
  {
    q: 'What does a case study on this site actually tell me?',
    a: 'The problem, the constraints we had to design within, the approach, and the engineering trade-offs behind it — including what each decision cost. The engineering notes section on each page is written for a technical evaluator deciding whether we reason about their class of problem the way they would want a supplier to.',
  },
];

export const teamFaqs: FaqItem[] = [
  {
    q: 'Who will I actually work with?',
    a: 'The senior team, starting from the first call. We do not staff engagements with people the client has not met, and consultations are taken by architects rather than pre-sales agents. The profiles on this page are the people who take those calls.',
  },
  {
    q: 'Do you subcontract development work?',
    a: 'The engineering team is in-house in Islamabad. Where specialist input is needed we say so explicitly rather than presenting it as our own capability, because a buyer evaluating a supplier for a regulated workload is entitled to know who is actually writing the code.',
  },
  {
    q: 'What experience does the team have in regulated delivery?',
    a: 'The practice areas are AML/CFT compliance programmes and goAML reporting, platform and cloud architecture for multi-tenant regulated workloads, and healthcare interoperability under HIPAA and HL7 FHIR. Each profile lists that person’s specific areas of focus and links to what they have written on them.',
  },
  {
    q: 'Can I speak to an engineer before committing to anything?',
    a: 'Yes — that is the default rather than an exception. The first conversation is a forty-five minute technical consultation with an architect, with no obligation attached. If the outcome is that you should not build the thing you asked about, we will say so on that call.',
  },
];

export const blogFaqs: FaqItem[] = [
  {
    q: 'Who writes these articles?',
    a: 'Named members of the NovuLabs engineering team, each with a profile page linked from the byline. Every article states its author, publication date and last modification date. We do not publish under a house byline or an invented persona.',
  },
  {
    q: 'How are regulatory claims in these articles sourced?',
    a: 'Every article that makes a claim about a regulation names the issuing body and links to the primary source — SBP, FMU, NADRA, FATF, UNODC, HHS or ISO as applicable. Where a fact depends on documentation only available to registered entities, the article says so and points at the source rather than guessing.',
  },
  {
    q: 'How current is this material?',
    a: 'Each article carries a published and a last-modified date, and the sitemap reports the real modification date rather than the build time. Regulatory content is written to describe durable engineering constraints rather than specific circular numbers or thresholds, which is deliberate — specifics of that kind age badly and are the most common way technical writing becomes confidently wrong.',
  },
  {
    q: 'Can I use this material to scope a project?',
    a: 'That is what it is written for. The guides are aimed at the engineer or architect who has to build the thing, and they include the parts that are usually left out — what each decision costs, where the effort actually goes, and which constraints are worth resolving before writing any code.',
  },
];
