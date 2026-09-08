import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { webPageSchema } from '@/lib/schema';
import IndustriesHero from '@/components/sections/industries/IndustriesHero';
import FintechDeepDive from '@/components/sections/industries/FintechDeepDive';
import HealthcareDeepDive from '@/components/sections/industries/HealthcareDeepDive';
import GovernmentDeepDive from '@/components/sections/industries/GovernmentDeepDive';
import MoreSectorsSection from '@/components/sections/industries/MoreSectorsSection';
import SectorCaseStudies from '@/components/sections/industries/SectorCaseStudies';
import RegulatedDeliverySection from '@/components/sections/industries/RegulatedDeliverySection';
import IndustriesCta from '@/components/sections/industries/IndustriesCta';
import PageFaq from '@/components/sections/shared/PageFaq';
import { industriesFaqs } from '@/content/pageFaqs';

export const metadata: Metadata = {
  title: 'Industries: Banking, Healthcare & Government',
  description:
    'Domain depth in banking (AML/CFT, RAAST), healthcare (HIPAA, HL7 FHIR, EHR) and government (NADRA, FBR). Regulated-sector engineering, not generalists.',
  keywords: [
    'fintech software company Pakistan',
    'banking software development',
    'AML compliance banking Pakistan',
    'healthcare IT company Pakistan',
    'HIPAA compliant software',
    'HL7 FHIR integration',
    'government software Pakistan',
    'NADRA integration software',
    'FBR tax software Pakistan',
    'e-government portal',
    'retail ecommerce software',
    'manufacturing ERP Pakistan',
  ],
  alternates: { canonical: '/industries' },
  openGraph: {
    title: 'Industries – Banking, Healthcare & Government IT | NovuLabs',
    description: 'Software built for critical industries: fintech, healthcare, government, retail, manufacturing and more.',
    url: 'https://www.novulabs.net/industries',
    images: [{ url: '/hero/industries.jpg', width: 1920, height: 1080, alt: 'NovuLabs Industries' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries – Banking, Healthcare & Government | NovuLabs',
    description: 'Mission-critical software for banking, healthcare IT, government portals and enterprise sectors globally.',
    images: ['/hero/industries.jpg'],
  },
};


export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: 'Industries: Banking, Healthcare & Government',
          description:
            'Domain depth in banking (AML/CFT, RAAST), healthcare (HIPAA, HL7 FHIR) and government (NADRA, FBR).',
          path: '/industries',
        })}
      />
      <IndustriesHero />
      <div className="divider"></div>
      <FintechDeepDive />
      <HealthcareDeepDive />
      <GovernmentDeepDive />
      <MoreSectorsSection />
      <SectorCaseStudies />
      <RegulatedDeliverySection />
      <PageFaq items={industriesFaqs} path="/industries" />
      <IndustriesCta />
    </>
  );
}
