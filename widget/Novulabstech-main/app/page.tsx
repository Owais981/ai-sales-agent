import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { webPageSchema } from '@/lib/schema';
import HeroSection from '@/components/sections/home/HeroSection';
import AboutSection from '@/components/sections/home/AboutSection';
import ServicesSection from '@/components/sections/home/ServicesSection';
import WhyUsSection from '@/components/sections/home/WhyUsSection';
import IndustriesSection from '@/components/sections/home/IndustriesSection';
import TechStackSection from '@/components/sections/home/TechStackSection';
import PortfolioPreviewSection from '@/components/sections/home/PortfolioPreviewSection';
import ProcessSection from '@/components/sections/home/ProcessSection';
import FaqSection from '@/components/sections/home/FaqSection';
import CaseStudyRail from '@/components/sections/home/CaseStudyRail';
import InsightsSection from '@/components/sections/home/InsightsSection';
import CtaSection from '@/components/sections/home/CtaSection';

export const metadata: Metadata = {
  // 50 chars. Matches the H1 wording exactly rather than a shortened version of
  // it, so title, H1 and description all target one intent instead of three.
  //
  // No "Best" or "#1" here, on purpose, same reasoning as the H1 comment in
  // HeroSection.tsx: it is an unverifiable superlative about the business
  // itself, which reads as a negative E-E-A-T signal, and in most markets a
  // comparative claim in advertising needs substantiation this site does not
  // publish. Ranking for "best software house in islamabad" searches comes
  // from what the page demonstrates, not from the word "best" sitting in the
  // title tag — Google resolves that query by relevance and trust signals, not
  // by string-matching a superlative.
  title: { absolute: 'Enterprise Software House in Islamabad | NovuLabs' },
  // 158 chars — was 189, which Google truncated mid-clause at ~160.
  description:
    'Enterprise software house in Islamabad building AML/CFT compliance systems, HIPAA healthcare platforms and PCI-DSS payments. Talk to an architect, not a rep.',
  keywords: [
    'software house in Islamabad',
    'software house Islamabad',
    'software company in Islamabad',
    'enterprise software house Pakistan',
    'AML software Pakistan',
    'fintech development company Islamabad',
    'healthcare IT software Pakistan',
    'NovuLabs Islamabad',
    'custom software development Islamabad',
    'government portal software',
    'GOAML compliance software',
    'PCI-DSS payment software',
    'software outsourcing Pakistan',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Enterprise Software House in Islamabad | NovuLabs',
    // "200+ projects. 40+ countries." removed — neither figure is evidenced
    // anywhere on the site or in lib/seo.ts (which declares five served
    // markets). Same claim class as the certification wording removed in
    // 6daaa0c; see artifacts/FINDINGS.md.
    description:
      'Mission-critical fintech, AML/CFT compliance, healthcare and government software, engineered in Islamabad for institutions a regulator audits.',
    url: 'https://www.novulabs.net',
    images: [{ url: '/og/enterprise-software-development.jpg', width: 1200, height: 630, alt: 'NovuLabs' }],
  },
};


export default function Home() {
  return (
    <>
      {/* The homepage WebPage node links back to the sitewide
          ProfessionalService entity by @id. FAQPage schema for the homepage FAQ
          is emitted by FaqSection, alongside the visible Q&A it describes. */}
      <JsonLd
        data={webPageSchema({
          name: 'NovuLabs — AML, Fintech & Healthcare Software House',
          description:
            'Enterprise software house in Islamabad building AML/CFT compliance systems, HIPAA healthcare platforms and PCI-DSS payment infrastructure.',
          path: '/',
        })}
      />
      <HeroSection />
      <AboutSection />
      <div className="divider"></div>
      <ServicesSection />
      <WhyUsSection />
      <div className="divider"></div>
      <IndustriesSection />
      <TechStackSection />
      <PortfolioPreviewSection />
      <ProcessSection />
      <CaseStudyRail />
      <InsightsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
