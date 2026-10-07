import React from 'react';
import type { Project } from '@/content/projects';
import ProjectCard from '@/components/ui/ProjectCard';

const ProjectsGridSection: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <section className="sec bg-g" id="projects-grid">
    <div className="container">
      {projects.length === 0 ? (
        <p className="ssub mx-auto text-center">Projects are being updated. Please check back shortly.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  </section>
);

export default ProjectsGridSection;
