import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { caseStudies } from '@/content/caseStudies';
import { webPageSchema } from '@/lib/schema';
import { canonical } from '@/lib/seo';
import PortfolioHero from '@/components/sections/portfolio/PortfolioHero';
import PortfolioGridSection from '@/components/sections/portfolio/PortfolioGridSection';
import PortfolioCta from '@/components/sections/portfolio/PortfolioCta';
import PageFaq from '@/components/sections/shared/PageFaq';
import { portfolioFaqs } from '@/content/pageFaqs';

export const metadata: Metadata = {
  title: 'Case Studies — Enterprise Software Projects',
  description:
    'Detailed engineering case studies: goAML-integrated AML suites, HIPAA EHR rollouts, Mastercard/Visa payment switches and national identity portals.',
  keywords: [
    'enterprise software portfolio Pakistan',
    'AML compliance software case study',
    'GOAML integration project',
    'HIPAA EHR software project',
    'payment switch development',
    'banking software project Pakistan',
    'government portal case study',
    'enterprise ERP project',
    'NovuLabs portfolio',
    'software house work samples',
  ],
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio – Enterprise Software Projects | NovuLabs',
    // "200+ enterprise projects" removed — unevidenced project count.
    description: 'AML engines, HIPAA EHR platforms, payment switches and government portals — how each was architected, and what constrained it.',
    url: 'https://www.novulabs.net/portfolio',
    images: [{ url: '/hero/portfolio.jpg', width: 1920, height: 1080, alt: 'NovuLabs Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Software Case Studies | NovuLabs',
    description: 'AML compliance, healthcare, payments, and government software. Explore our work.',
    images: ['/hero/portfolio.jpg'],
  },
};


export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            name: 'Enterprise Software Case Studies',
            description:
              'Detailed engineering case studies across AML/CFT compliance, payments, healthcare and government.',
            path: '/portfolio',
            type: 'CollectionPage',
          }),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            '@id': `${canonical('/portfolio')}#list`,
            itemListElement: caseStudies.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: c.title,
              url: canonical(`/portfolio/${c.slug}`),
            })),
          },
        ]}
      />
      <PortfolioHero />
      <div className="divider"></div>
      <PortfolioGridSection />
      <PortfolioCta />
      <PageFaq items={portfolioFaqs} path="/portfolio" />
    </>
  );
}
