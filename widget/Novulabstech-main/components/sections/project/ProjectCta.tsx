import React from 'react';
import Button from '@/components/ui/Button';
import ProjectLinkButtons from '@/components/ui/ProjectLinkButtons';
import type { Project } from '@/content/projects';

const ProjectCta: React.FC<{ project: Project }> = ({ project }) => (
  <section id="cta-banner">
    <div className="container">
      <div className="cta-inner" data-reveal="up">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <span className="stag">{project.name}</span>
            {project.marketingDescription.map((p, i) => (
              <p className={i === 0 ? 'stitle mt-3 mb-0' : 'ssub mt-4 mb-0'} key={i}>
                {p}
              </p>
            ))}
          </div>
          <div className="col-lg-5 text-lg-end">
            <div className="cta-card text-start">
              <div className="cta-card-label">Interested in {project.name}?</div>
              <Button href="/contact" variant="grad" className="w-100 justify-content-center mb-3">
                <i className="bi bi-calendar-check me-1"></i>Book a technical call
              </Button>
              <Button href="/projects" variant="glass" className="w-100 justify-content-center">
                <i className="bi bi-folder2-open me-1"></i>All projects
              </Button>
              <ProjectLinkButtons links={project.links} className="mt-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ProjectCta;
