import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { projects, getProject } from '@/content/projects';
import JsonLd from '@/components/seo/JsonLd';
import { webPageSchema } from '@/lib/schema';
import { canonical } from '@/lib/seo';
import ProjectHero from '@/components/sections/project/ProjectHero';
import ProjectOverview from '@/components/sections/project/ProjectOverview';
import ProjectProblems from '@/components/sections/project/ProjectProblems';
import ProjectFeatures from '@/components/sections/project/ProjectFeatures';
import ProjectAiFeatures from '@/components/sections/project/ProjectAiFeatures';
import ProjectModules from '@/components/sections/project/ProjectModules';
import ProjectTechStack from '@/components/sections/project/ProjectTechStack';
import ProjectCta from '@/components/sections/project/ProjectCta';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project not found' };

  const title = `${project.name} — ${project.tagline}`;
  const url = canonical(`/projects/${project.slug}`);

  return {
    title,
    description: project.shortDescription,
    keywords: project.keywords,
    alternates: { canonical: url },
    openGraph: { type: 'article', url, title, description: project.cardDescription },
    twitter: { card: 'summary_large_image', title, description: project.cardDescription },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: `${project.name} — ${project.tagline}`,
          description: project.shortDescription,
          path: `/projects/${project.slug}`,
        })}
      />
      <ProjectHero project={project} />
      <div className="divider"></div>
      <ProjectOverview project={project} />
      <ProjectProblems project={project} />
      <ProjectFeatures project={project} />
      <ProjectAiFeatures project={project} />
      <ProjectModules project={project} />
      <ProjectTechStack project={project} />
      <ProjectCta project={project} />
    </>
  );
}
