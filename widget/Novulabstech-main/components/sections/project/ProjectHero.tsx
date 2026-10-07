import React from 'react';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProjectLinkButtons from '@/components/ui/ProjectLinkButtons';
import type { Project } from '@/content/projects';

const ProjectHero: React.FC<{ project: Project }> = ({ project }) => (
  <section className="phero">
    <div className="phero-bg" data-parallax="38">
      <Image src="/hero/portfolio.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
    </div>
    <div className="phero-ov"></div>
    <div className="phero-grid" data-parallax="14"></div>
    <div className="container phero-inner">
      <Breadcrumbs
        className="mb-4"
        items={[{ name: 'Projects', href: '/projects' }, { name: project.name }]}
      />
      <span className="stag">{project.industry[0]}</span>
      <h1 className="hero-title mt-3" style={{ fontSize: '2.5rem', lineHeight: 1.2 }}>
        {project.name} <span className="gtxt">{project.tagline}</span>
      </h1>
      <p className="hero-sub">{project.shortDescription}</p>
      <div className="d-flex gap-2 flex-wrap mt-3">
        {project.badges.map((b) => (
          <span className="tbadge" key={b} style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
            {b}
          </span>
        ))}
      </div>
      <ProjectLinkButtons links={project.links} className="mt-4" />
    </div>
  </section>
);

export default ProjectHero;
