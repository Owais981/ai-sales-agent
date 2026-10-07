import React from 'react';
import type { Project } from '@/content/projects';
import ProjectCard from '@/components/ui/ProjectCard';
import SectionHeading from '@/components/ui/SectionHeading';

/** Products we built, shown above the client case-study grid. */
const FeaturedProjectsSection: React.FC<{ projects: Project[] }> = ({ projects }) => {
  if (projects.length === 0) return null;
  return (
  <section className="sec bg-w" id="featured-projects">
    <div className="container">
      <SectionHeading tag="Our Products" title={<>Featured <span className="gtxt">projects</span></>} />
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  </section>
  );
};

export default FeaturedProjectsSection;