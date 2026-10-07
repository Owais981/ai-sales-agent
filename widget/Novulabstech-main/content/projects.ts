/**
 * Project pages (/projects, /projects/[slug]) - the website's own data.
 * ---------------------------------------------------------------------------
 * The chat agent has its own copy of these projects, as chunks inside
 * backend/data/novulabs_knowledge_base.json (source_page "project-<slug>").
 * When you change a project here, update those chunks too and re-run
 * `manage.py ingest_folder` so the agent answers with the same facts.
 *
 * Do not add features, clients, numbers, certifications or links that are not
 * in the project brief. Leave `links.github` / `links.demo` out to hide those
 * buttons. Never put credentials here.
 */

export interface ProjectTitled {
  title: string;
  body?: string;
}

export interface ProjectProblem {
  problem: string;
  solution: string;
}

export interface ProjectModule {
  name: string;
  description: string;
}

export interface ProjectTechGroup {
  label: string;
  items: string[];
}

export interface Project {
  slug: string;
  name: string;
  /** Short tagline shown under the name in the hero. */
  tagline: string;
  /** 2–3 lines, used on the website card. */
  cardDescription: string;
  /** Used for listings and meta description. */
  shortDescription: string;
  detailedDescription: string[];
  marketingDescription: string[];
  type: string;
  industry: string[];
  targetUsers: string[];
  /** Short badges shown on the card. */
  badges: string[];
  /** Bootstrap icon class for the card header, e.g. "bi-shield-check". */
  icon: string;
  problems: ProjectProblem[];
  features: string[];
  aiFeatures: ProjectTitled[];
  techStack: ProjectTechGroup[];
  modules: ProjectModule[];
  links: { github?: string; demo?: string };
  keywords: string[];
}

export const projects: Project[] = [
  {
    "slug": "warden-aml",
    "name": "Warden AML",
    "tagline": "KYC, KYB & AML Compliance Platform",
    "cardDescription": "An end-to-end compliance platform for identity verification, business verification and anti-money-laundering screening. Warden helps banks, fintechs and crypto firms onboard customers faster while keeping risk, sanctions and fraud under control.",
    "shortDescription": "Warden AML is a multi-tenant RegTech platform that brings KYC, KYB, sanctions & PEP screening, fraud detection, transaction monitoring and case management into one system, with an onboarding app for customers and a compliance portal for teams.",
    "detailedDescription": [
      "Warden AML is a full compliance platform built for regulated and fast-growing businesses in the UK and EU, including crypto companies. It covers the whole customer lifecycle: onboarding, verification, screening, ongoing monitoring and investigation.",
      "Customers complete onboarding through a dedicated web app: document upload, passport MRZ reading, a live head-movement liveness check, selfie-to-ID face matching, and email and phone verification codes. Businesses are verified through company registry checks (including the UK Companies House register), automatic import of directors and owners, multi-layer ownership analysis to find ultimate beneficial owners (UBOs), and individual KYC for each owner and director.",
      "Every person and company is screened against sanctions, PEP and watchlist data, with fuzzy name matching that also weighs date of birth and nationality to reduce false positives. Customers are then monitored continuously: rescreening when lists change, document expiry tracking, periodic re-verification by risk level, and transaction monitoring with crypto Travel Rule support.",
      "Compliance teams work in a dedicated portal with configurable risk scoring, alerts, case management, an audit trail, analytics, and AI assistance for summaries and setup. A vendor-independent integration layer connects external providers (identity verification, company registries, sanctions data, SMS and email) through swappable adapters with signed webhooks, so providers can change without rebuilding the product."
    ],
    "marketingDescription": [
      "Compliance shouldn't slow your business down. Warden AML gives regulated companies one platform to verify people and businesses, screen them against sanctions and PEP lists, and keep watching for risk long after onboarding.",
      "Customers move through a clean, guided onboarding flow with document checks, liveness and face matching, while your compliance team gets a single workspace for risk scores, alerts, cases and a complete audit trail. Business customers are unpacked automatically: registry data, directors, owners and ultimate beneficial owners, each verified in turn.",
      "Built-in fraud signals catch fake identities, multi-accounting and account takeover. Smart matching reduces false positives, AI assistance speeds up reviews, and a vendor-independent architecture lets you choose the best providers for each market. Warden AML is designed for teams that need to move fast and stay audit-ready, from fintech start-ups to growing crypto platforms."
    ],
    "type": "B2B SaaS web platform (multi-tenant), with REST API",
    "industry": [
      "RegTech / FinTech",
      "Anti-Money Laundering (AML)",
      "Know Your Customer (KYC)",
      "Know Your Business (KYB)",
      "Fraud Prevention"
    ],
    "targetUsers": [
      "Banks",
      "Fintechs",
      "Payment companies",
      "Crypto exchanges and wallets",
      "Marketplaces",
      "Other regulated businesses"
    ],
    "badges": [
      "KYC",
      "KYB",
      "AML",
      "Fraud Prevention"
    ],
    "icon": "bi-shield-check",
    "problems": [
      {
        "problem": "Slow, manual customer onboarding",
        "solution": "Guided self-service verification flows"
      },
      {
        "problem": "Fake or forged identities",
        "solution": "Document checks, liveness and face matching"
      },
      {
        "problem": "Hidden company ownership",
        "solution": "Automatic UBO discovery and owner verification"
      },
      {
        "problem": "Sanctions and PEP exposure",
        "solution": "Screening plus continuous rescreening"
      },
      {
        "problem": "Too many false alerts",
        "solution": "Matching on name, date of birth and nationality"
      },
      {
        "problem": "Account takeover and multi-accounting",
        "solution": "Device, IP, email and phone risk signals"
      },
      {
        "problem": "Scattered tools and evidence",
        "solution": "One system with case management and a full audit trail"
      },
      {
        "problem": "Vendor lock-in",
        "solution": "Swappable provider integrations"
      }
    ],
    "features": [
      "Identity verification: ID upload, OCR, passport MRZ reading with check digits",
      "Liveness check (head-movement challenge) with anti-spoofing model",
      "Selfie-to-ID face matching",
      "Email and phone verification codes",
      "Proof of address checks",
      "KYB: registry checks, director/owner import, ownership tree, UBO calculation (25% rule)",
      "KYC links for every beneficial owner and director",
      "Sanctions, PEP and watchlist screening for people and companies",
      "Ongoing monitoring: rescreening, document expiry alerts, periodic re-verification",
      "Custom client watchlists",
      "Fraud prevention: device fingerprinting, IP risk, velocity checks, duplicate detection, fraud-network linking, account-takeover detection",
      "Transaction monitoring with configurable rules and crypto wallet screening",
      "Crypto Travel Rule data (IVMS101 format)",
      "Configurable risk scoring, risk levels and industry risk ratings",
      "Case management, alerts and regulatory reports",
      "Configurable verification levels per client",
      "Reusable KYC (verified identity shared with consent)",
      "Qualified electronic signature step with one-time codes",
      "Analytics dashboards",
      "Full audit trail of every action and decision",
      "Developer API with sandbox keys and webhooks",
      "Data residency and retention controls with automatic data deletion"
    ],
    "aiFeatures": [
      {
        "title": "AI Copilot (\"Summy\")",
        "body": "In-app assistant that answers compliance and product questions (Google Gemini)."
      },
      {
        "title": "AI case/applicant summaries",
        "body": "Generated on request and always reviewed by a human."
      },
      {
        "title": "AI verification-level builder",
        "body": "Turns a prompt or regulation text into a draft verification setup that a compliance officer must approve."
      },
      {
        "title": "AI adverse-media classification",
        "body": "Separates genuine negative news from namesakes and irrelevant articles (Anthropic Claude)."
      },
      {
        "title": "Computer vision",
        "body": "OCR with EasyOCR and Tesseract, MRZ reading."
      },
      {
        "title": "Liveness",
        "body": "In-browser head-pose tracking (MediaPipe) plus an anti-spoofing model (MiniFASNetV2, PyTorch)."
      },
      {
        "title": "Face matching",
        "body": "Through commercial providers (Didit / AWS Rekognition)."
      },
      {
        "title": "Fuzzy name matching",
        "body": "RapidFuzz with date-of-birth and nationality scoring."
      },
      {
        "title": "Risk scoring",
        "body": "Rule-based and behavioural."
      }
    ],
    "techStack": [
      {
        "label": "Backend",
        "items": [
          "Python",
          "Django 5",
          "Django REST Framework",
          "drf-spectacular (OpenAPI)"
        ]
      },
      {
        "label": "Background jobs",
        "items": [
          "Celery",
          "Celery Beat",
          "Redis"
        ]
      },
      {
        "label": "Database",
        "items": [
          "PostgreSQL",
          "SQLite (local development)"
        ]
      },
      {
        "label": "Frontend",
        "items": [
          "React",
          "Vite",
          "Tailwind CSS"
        ]
      },
      {
        "label": "AI / ML",
        "items": [
          "PyTorch",
          "ONNX Runtime",
          "OpenCV",
          "EasyOCR",
          "Tesseract",
          "MediaPipe",
          "RapidFuzz",
          "Google Gemini API",
          "Anthropic API"
        ]
      },
      {
        "label": "Integrations",
        "items": [
          "Didit",
          "UK Companies House",
          "OpenSanctions",
          "Twilio",
          "AWS (S3, SES, Rekognition)",
          "FingerprintJS"
        ]
      },
      {
        "label": "Security",
        "items": [
          "Encrypted credentials (Fernet)",
          "HMAC-signed webhooks",
          "Two-factor authentication",
          "Role-based access",
          "Audit logging"
        ]
      },
      {
        "label": "Deployment",
        "items": [
          "Gunicorn",
          "WhiteNoise",
          "S3-compatible storage"
        ]
      }
    ],
    "modules": [
      {
        "name": "Applicants",
        "description": "Onboarding records, documents, decisions, status engine"
      },
      {
        "name": "Identity Verification",
        "description": "OCR, MRZ, liveness, face match, proof of address, video ID"
      },
      {
        "name": "KYB",
        "description": "Companies, registry checks, officers, owners, UBO tree"
      },
      {
        "name": "AML Screening",
        "description": "Watchlist ingestion, matching, rescreening, adverse media"
      },
      {
        "name": "Fraud Prevention",
        "description": "Device, IP, email, phone risk; velocity; fraud networks; forensics"
      },
      {
        "name": "Transaction Monitoring",
        "description": "Rules, alerts, crypto wallet screening, Travel Rule"
      },
      {
        "name": "Risk Engine",
        "description": "Risk scores, levels, history, scheduled recalculation"
      },
      {
        "name": "Case Management",
        "description": "Alerts, cases, investigations, regulatory reports"
      },
      {
        "name": "Verification Levels",
        "description": "Configurable onboarding steps per client"
      },
      {
        "name": "Reusable Identity",
        "description": "Consent-based sharing of verified identities"
      },
      {
        "name": "Integrations",
        "description": "Vendor connectors, webhooks, API keys"
      },
      {
        "name": "AI Copilot",
        "description": "Assistant, summaries, level builder"
      },
      {
        "name": "Analytics & Audit",
        "description": "Dashboards, daily rollups, full audit log"
      },
      {
        "name": "Customer Onboarding App",
        "description": "Applicant-facing web app"
      }
    ],
    "links": {},
    "keywords": [
      "KYC platform",
      "KYB platform",
      "AML screening software",
      "sanctions and PEP screening",
      "RegTech",
      "transaction monitoring",
      "UBO discovery",
      "identity verification"
    ]
  },
  {
    "slug": "grc-suite",
    "name": "GRC Suite",
    "tagline": "Integrated Governance, Risk & Compliance Platform",
    "icon": "bi-diagram-3",
    "cardDescription": "An enterprise platform that brings risk management, compliance, internal audit, third-party risk and business continuity into one connected system. Built for organisations that need a single, audit-ready view of risk and control.",
    "shortDescription": "GRC Suite is an integrated Governance, Risk & Compliance platform covering enterprise risk, controls, compliance frameworks, internal audit, third-party risk, business impact analysis, IT security, loss events, KRIs and customer KYC risk — with a no-code app builder and enterprise single sign-on.",
    "detailedDescription": [
      "GRC Suite is an enterprise Governance, Risk & Compliance platform that replaces spreadsheets and disconnected tools with one system of record. It links an organisation's structure (legal entities, departments, business processes and IT applications) to its risks, controls, policies, obligations, audits, vendors and incidents, so every team works from the same data.",
      "Risk teams maintain a full risk register with categories, causes, consequences, scenarios, impact dimensions, heat maps and score history, and manage treatment plans, risk acceptances, exceptions and change requests through approval workflows. Compliance teams map frameworks, requirements and sub-obligations to policies, control standards and controls, then run test plans, bulk testing and control self-assessments with compliance reports.",
      "Internal audit is covered end to end: audit universe, program and procedure libraries, engagements, scoping, workpapers, evidence, findings, exceptions with root-cause analysis, and PDF audit reports, plus an auditee portal. The platform also manages third-party risk (vendor catalogue, contracts, questionnaires, financial viability, subcontractors and a vendor portal), business impact analysis and continuity, IT security (vulnerabilities, scan ingestion, cyber incidents and security spend), operational loss events, key risk indicators and customer KYC risk assessments.",
      "A no-code app builder lets administrators create their own applications, fields, layouts and rules, while fine-grained access control, enterprise SSO and full audit logging keep the platform secure and accountable."
    ],
    "marketingDescription": [
      "Risk doesn't live in one department, and neither should your GRC program. GRC Suite connects risk, compliance, audit, vendors and business continuity in a single platform, so leaders see the full picture and teams stop chasing spreadsheets.",
      "Map every regulation to the policies and controls that satisfy it. Run audits from planning to final report with structured workpapers and evidence. Assess vendors and their subcontractors, understand which business processes matter most, and track incidents and losses as they happen, with executives alerted when thresholds are crossed.",
      "When your processes don't fit a template, the no-code app builder lets you build your own. Enterprise single sign-on, fine-grained permissions and complete audit logs keep everything secure and accountable, and AI suggestions always stay under human review. GRC Suite gives your organisation one trusted source of truth for governance, risk and compliance."
    ],
    "type": "Enterprise web platform (GRC software) with REST API",
    "industry": [
      "Governance, Risk & Compliance (GRC)",
      "RegTech"
    ],
    "targetUsers": [
      "Banks and financial institutions",
      "Regulated enterprises",
      "Internal audit teams",
      "Risk teams",
      "Compliance teams",
      "IT security teams",
      "Procurement teams",
      "Business continuity teams"
    ],
    "badges": [
      "Risk",
      "Compliance",
      "Internal Audit",
      "Third-Party Risk"
    ],
    "problems": [
      {
        "problem": "Risk, compliance and audit data scattered across spreadsheets",
        "solution": "One connected system"
      },
      {
        "problem": "No clear link between regulations, policies and controls",
        "solution": "Full mapping from obligation to policy to control standard to control"
      },
      {
        "problem": "Manual, slow audits",
        "solution": "Structured audit programs, workpapers and automated reports"
      },
      {
        "problem": "Unmanaged vendor and subcontractor risk",
        "solution": "Third-party lifecycle and vendor portal"
      },
      {
        "problem": "Unclear business-critical processes",
        "solution": "Business impact analysis and continuity planning"
      },
      {
        "problem": "Late visibility of incidents and losses",
        "solution": "Loss events with executive threshold alerts"
      },
      {
        "problem": "Rigid off-the-shelf tools",
        "solution": "No-code app builder for custom processes"
      },
      {
        "problem": "Access and accountability gaps",
        "solution": "Role-based access, SSO and complete audit trails"
      }
    ],
    "features": [
      "Enterprise risk register: categories, sub-categories, assets, causes, consequences, risk scenario library, impact dimensions, risk heat map, risk score history",
      "Risk treatment plans and milestones, risk acceptance, exception and change requests with approval workflows",
      "Controls library, risk-to-control mapping and control test results",
      "Compliance frameworks, requirements, sub-obligations, citations and obligations browsers",
      "Policies and control standards with full mapping to requirements and controls",
      "Control test plans, compliance engagements, bulk testing, control self-assessments and compliance reports",
      "Internal audit: audit universe, audit program library, proposed engagements, scoping, workpapers, evidence, findings, observations, exceptions with root causes, imported engagements and PDF audit reports",
      "Auditee portal and evidence requests",
      "Issues, findings folders, action plans, remediation tracking and issues-aging dashboard",
      "Business impact analysis: impact dimensions, process dependencies, severity and criticality bands, continuity procedures, external dependencies, approvals, export",
      "Third-party risk: vendor catalogue, engagements, contracts, contract review checklists and approval workflow, risk ratings, financial viability, questionnaires, vendor portal, subcontractor register and security rating snapshots",
      "IT security: risk statement library, bulk risk generation for business processes, vulnerability queue, scan result ingestion, security control profiles and spend, cyber incident management linked to loss events",
      "Operational loss events: impacts, approval rules and executive threshold alerts",
      "Key risk indicators (metrics) with measurements and automatic status",
      "Customer KYC risk assessment: weighted risk factors, thresholds, risk bands, approvals, review notifications and audit log",
      "Organisation structure: legal entities, departments, business processes, IT application profiles",
      "No-code app builder: custom applications, data fields, layouts, rules and actions, field dependencies, record permissions and field history",
      "Task dashboard and data migration from Excel",
      "Excel and PDF exports"
    ],
    "aiFeatures": [
      {
        "title": "AI suggestion framework",
        "body": "Human-in-the-loop review: suggestions can be accepted, accepted with edits, or rejected by a reviewer."
      },
      {
        "title": "Full provenance",
        "body": "Every suggestion stores a rationale, confidence score, required citations, and model and prompt version (full provenance for auditability)."
      },
      {
        "title": "Escalation guard and history",
        "body": "Full history of what was proposed versus what was applied."
      },
      {
        "title": "Safe model integration",
        "body": "Designed so an AI model can be connected to propose risk classifications and other updates safely, without changing data automatically."
      },
      {
        "title": "Rule-based automation",
        "body": "Bulk risk generation from a risk statement library, automatic KRI status calculation, executive loss-threshold checks."
      }
    ],
    "techStack": [
      {
        "label": "Backend",
        "items": [
          "Python",
          "Django 6",
          "Django REST Framework",
          "Simple JWT",
          "django-filter"
        ]
      },
      {
        "label": "Background jobs",
        "items": [
          "Celery"
        ]
      },
      {
        "label": "Data processing",
        "items": [
          "pandas",
          "NumPy",
          "openpyxl (Excel import/export)",
          "ReportLab (PDF reports)"
        ]
      },
      {
        "label": "Frontend",
        "items": [
          "React 19",
          "Vite",
          "Tailwind CSS",
          "Axios",
          "Lucide icons"
        ]
      },
      {
        "label": "Identity and security",
        "items": [
          "LDAP",
          "SAML 2.0 (python3-saml)",
          "OpenID Connect (Authlib)",
          "SCIM user provisioning",
          "JWT authentication",
          "cryptography"
        ]
      },
      {
        "label": "Admin",
        "items": [
          "Django Jazzmin"
        ]
      },
      {
        "label": "Database",
        "items": [
          "SQLite (development)"
        ]
      }
    ],
    "modules": [
      {
        "name": "Risk",
        "description": "Risk register, scenarios, treatment, acceptance, approvals, heat map"
      },
      {
        "name": "Controls",
        "description": "Control library, risk mapping, control testing"
      },
      {
        "name": "Compliance",
        "description": "Frameworks, obligations, policies, control standards, testing, reports"
      },
      {
        "name": "Audit",
        "description": "Audit universe, programs, engagements, workpapers, findings, reports"
      },
      {
        "name": "Treatment Evidence",
        "description": "Evidence requests and evidence collection"
      },
      {
        "name": "BIA",
        "description": "Business impact analysis and continuity planning"
      },
      {
        "name": "Third Party",
        "description": "Vendor risk, contracts, questionnaires, vendor portal, subcontractors"
      },
      {
        "name": "IT Security",
        "description": "Vulnerabilities, scans, security controls, cyber incidents"
      },
      {
        "name": "Loss Events",
        "description": "Operational losses, impacts, executive thresholds"
      },
      {
        "name": "Metrics",
        "description": "Key risk indicators and measurements"
      },
      {
        "name": "KYC",
        "description": "Customer risk assessment with weighted factors and bands"
      },
      {
        "name": "Organization",
        "description": "Legal entities, departments, processes, IT applications"
      },
      {
        "name": "App Builder",
        "description": "No-code custom applications, layouts and rules"
      },
      {
        "name": "Accounts",
        "description": "Users, roles, groups, permissions, SSO, SCIM, security events"
      },
      {
        "name": "AI",
        "description": "Reviewed AI suggestions with provenance"
      }
    ],
    "links": {},
    "keywords": [
      "GRC platform",
      "governance risk and compliance software",
      "enterprise risk management",
      "internal audit software",
      "third-party risk management",
      "business impact analysis",
      "compliance management",
      "no-code app builder"
    ]
  }
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
