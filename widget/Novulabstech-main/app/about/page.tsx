import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { webPageSchema } from '@/lib/schema';
import AboutHero from '@/components/sections/about/AboutHero';
import MissionSection from '@/components/sections/about/MissionSection';
import HowWeWorkSection from '@/components/sections/about/HowWeWorkSection';
import AboutPhotos from '@/components/sections/about/AboutPhotos';
import AboutCta from '@/components/sections/about/AboutCta';
import PageFaq from '@/components/sections/shared/PageFaq';
import { aboutFaqs } from '@/content/pageFaqs';

export const metadata: Metadata = {
  title: 'About Us — Enterprise Software House, Islamabad',
  description:
    'Who we are: an architect-led enterprise software house in Islamabad serving regulated finance, healthcare and government. No pre-sales agents, ever.',
  keywords: [
    'about NovuLabs',
    'enterprise software company Pakistan',
    'software house Islamabad',
    'fintech software company Pakistan',
    'healthcare software development team',
    'AML compliance engineers',
    'government software Pakistan',
    'custom enterprise development',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About NovuLabs – Pakistan Enterprise Software House',
    description:
      'Founded in Islamabad, NovuLabs engineers mission-critical platforms for fintech institutions, healthcare networks, and government agencies globally.',
    url: 'https://www.novulabs.net/about',
    images: [{ url: '/hero/about.jpg', width: 1920, height: 1080, alt: 'NovuLabs Team' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About NovuLabs – Enterprise Software House',
    description: 'Islamabad-based software house delivering fintech, healthcare and government platforms for regulated institutions.',
    images: ['/hero/about.jpg'],
  },
};


export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: 'About NovuLabs',
          description:
            'An architect-led enterprise software house in Islamabad serving regulated finance, healthcare and government.',
          path: '/about',
          type: 'AboutPage',
        })}
      />
      <AboutHero />
      <div className="divider"></div>
      <MissionSection />
      <HowWeWorkSection />
      <AboutPhotos />
      <PageFaq items={aboutFaqs} path="/about" />
      <AboutCta />
    </>
  );
}
