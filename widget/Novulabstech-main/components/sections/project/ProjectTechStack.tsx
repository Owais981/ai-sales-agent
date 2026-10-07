import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Project } from '@/content/projects';

const ProjectTechStack: React.FC<{ project: Project }> = ({ project }) => (
  <section className="sec bg-g">
    <div className="container">
      <SectionHeading tag="Built with" title={<>Technologies and <span className="gtxt">tech stack</span></>} />
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {project.techStack.map((g) => (
          <div className="col" data-reveal="up" key={g.label}>
            <div className="cta-card h-100">
              <div className="cta-card-label">{g.label}</div>
              <div className="d-flex gap-2 flex-wrap">
                {g.items.map((t) => (
                  <span className="tbadge" key={t} style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectTechStack;
