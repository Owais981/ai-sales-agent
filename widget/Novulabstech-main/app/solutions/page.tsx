import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { softwareApplicationSchema, webPageSchema } from '@/lib/schema';
import SolutionsHero from '@/components/sections/solutions/SolutionsHero';
import ErpSection from '@/components/sections/solutions/ErpSection';
import CrmSection from '@/components/sections/solutions/CrmSection';
import PaySection from '@/components/sections/solutions/PaySection';
import AmlSection from '@/components/sections/solutions/AmlSection';
import PlatformSelectionSection from '@/components/sections/solutions/PlatformSelectionSection';
import SolutionsCta from '@/components/sections/solutions/SolutionsCta';
import PageFaq from '@/components/sections/shared/PageFaq';
import { solutionsFaqs } from '@/content/pageFaqs';

export const metadata: Metadata = {
  title: 'Enterprise Platforms: ERP, CRM, Pay & AML',
  description:
    'Four production platforms: NovuShield AML/CFT screening, NovuPay payment switching, NovuERP operations and NovuCRM. Deployed at regulated institutions.',
  keywords: [
    'enterprise ERP software Pakistan',
    'NovuERP enterprise resource planning',
    'AI CRM software Pakistan',
    'Mastercard Visa payment switch Pakistan',
    'AML compliance platform Pakistan',
    'GOAML AML software',
    'FATF compliance software',
    'FMU Pakistan AML',
    'RAAST payment system integration',
    '1LINK payment switch',
    'NovuShield AML',
    'NovuPay payment gateway',
  ],
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: 'Enterprise Platforms – NovuERP, CRM, Pay & Shield | NovuLabs',
    description: 'Production-ready enterprise platforms: ERP, AI CRM, Mastercard/Visa payment switch, and AML compliance engine.',
    url: 'https://www.novulabs.net/solutions',
    images: [{ url: '/hero/solutions.jpg', width: 1920, height: 1080, alt: 'NovuLabs Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Platforms – NovuLabs Solutions',
    description: 'ERP, AI CRM, PCI-DSS payment, and FATF AML compliance platforms for global enterprises.',
    images: ['/hero/solutions.jpg'],
  },
};

/**
 * The four platforms get SoftwareApplication entities rather than a bare
 * ItemList of fragment URLs. Fragments are not documents, so the previous
 * markup pointed four list items at one page. No `offers` block is emitted:
 * pricing is quote-based and is not published, and stating a price of 0 to
 * satisfy a validator would be a misrepresentation.
 *
 * BreadcrumbList is no longer declared here — SolutionsHero renders it via the
 * shared Breadcrumbs component, and two competing declarations on one page is
 * how breadcrumb display gets dropped from the SERP.
 */
const platforms = [
  {
    name: 'NovuShield',
    category: 'SecurityApplication',
    description:
      'AML/CFT compliance platform: sanctions and PEP screening, transaction monitoring with auditable alert reasoning, and goAML-conformant STR/CTR reporting for SBP-regulated institutions.',
    features: [
      'Sanctions, PEP and NACTA proscribed-persons screening',
      'Deterministic transaction monitoring with alert reasoning',
      'goAML XML generation with pre-submission schema validation',
      'Governed match-threshold tuning with audit trail',
    ],
  },
  {
    name: 'NovuPay',
    category: 'FinanceApplication',
    description:
      'Payment processing platform with card authorisation, scheme connectivity and continuous reconciliation, engineered to PCI-DSS requirements.',
    features: [
      'Card authorisation and switching',
      'Mastercard and Visa scheme connectivity',
      'Tokenisation to reduce cardholder data environment scope',
      'Idempotent transaction handling and continuous reconciliation',
    ],
  },
  {
    name: 'NovuERP',
    category: 'BusinessApplication',
    description:
      'Enterprise resource planning covering finance, HR, inventory and supply chain, designed to integrate with packaged back-office systems rather than replace them wholesale.',
    features: ['Finance and accounting', 'HR and payroll', 'Inventory and supply chain', 'Reporting and analytics'],
  },
  {
    name: 'NovuCRM',
    category: 'BusinessApplication',
    description:
      'Customer relationship management with explainable machine-learning lead prioritisation — the model orders the queue, it does not make the decision.',
    features: ['Explainable lead scoring', 'Revenue forecasting', 'Omnichannel engagement', 'Native mobile access'],
  },
];


export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            name: 'Enterprise Platforms: NovuShield, NovuPay, NovuERP & NovuCRM',
            description:
              'Four production platforms for regulated institutions: AML/CFT screening, payment switching, enterprise operations and CRM.',
            path: '/solutions',
            type: 'CollectionPage',
          }),
          ...platforms.map((p) =>
            softwareApplicationSchema({
              name: p.name,
              description: p.description,
              path: '/solutions',
              category: p.category,
              features: p.features,
            })
          ),
        ]}
      />
      <SolutionsHero />
      <div className="divider"></div>
      <ErpSection />
      <CrmSection />
      <PaySection />
      <AmlSection />
      <PlatformSelectionSection />
      <PageFaq items={solutionsFaqs} path="/solutions" />
      <SolutionsCta />
    </>
  );
}
