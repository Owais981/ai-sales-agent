import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { projects } from '@/content/projects';
import { webPageSchema } from '@/lib/schema';
import { canonical } from '@/lib/seo';
import ProjectsHero from '@/components/sections/projects/ProjectsHero';
import ProjectsGridSection from '@/components/sections/projects/ProjectsGridSection';
import ProjectsCta from '@/components/sections/projects/ProjectsCta';

export const metadata: Metadata = {
  title: 'Our Projects — KYC, AML & GRC Platforms',
  description:
    'Products and platforms built by NovuLabs: Warden AML (KYC, KYB & AML compliance) and GRC Suite (integrated governance, risk & compliance).',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            name: 'Our Projects',
            description: 'Products and platforms built by NovuLabs.',
            path: '/projects',
            type: 'CollectionPage',
          }),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            '@id': `${canonical('/projects')}#list`,
            itemListElement: projects.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: `${p.name} — ${p.tagline}`,
              url: canonical(`/projects/${p.slug}`),
            })),
          },
        ]}
      />
      <ProjectsHero />
      <div className="divider"></div>
      <ProjectsGridSection projects={projects} />
      <ProjectsCta />
    </>
  );
}
