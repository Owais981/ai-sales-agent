import type { Metadata } from 'next';
import TeamHero from '@/components/sections/team/TeamHero';
import TeamGridSection from '@/components/sections/team/TeamGridSection';
import TeamCta from '@/components/sections/team/TeamCta';
import PageFaq from '@/components/sections/shared/PageFaq';
import { teamFaqs } from '@/content/pageFaqs';

export const metadata: Metadata = {
  title: 'Engineering & Compliance Team',
  description:
    'The architects and compliance engineers who do the work, with the credentials to check. Every person listed is an active practitioner, not a sales rep.',
  keywords: [
    'NovuLabs team',
    'software engineers Pakistan',
    'fintech engineers Pakistan',
    'AML compliance engineers',
    'enterprise software architects',
    'healthcare IT engineers',
    'software development team Islamabad',
    'senior software engineers',
  ],
  alternates: { canonical: '/team' },
  openGraph: {
    title: 'Engineering Team – NovuLabs',
    description: 'Senior architects, fintech engineers and AML/CFT compliance experts at NovuLabs.',
    url: 'https://www.novulabs.net/team',
    images: [{ url: '/hero/team.jpg', width: 1920, height: 1080, alt: 'NovuLabs Team' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Team | NovuLabs',
    description: 'Senior architects, fintech, AML, and healthcare IT engineers at NovuLabs.',
    images: ['/hero/team.jpg'],
  },
};

export default function TeamPage() {
  return (
    <>
      <TeamHero />
      <div className="divider"></div>
      <TeamGridSection />
      <TeamCta />
      <PageFaq items={teamFaqs} path="/team" />
    </>
  );
}
