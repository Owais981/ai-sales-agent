import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Project } from '@/content/projects';

const ProjectOverview: React.FC<{ project: Project }> = ({ project }) => (
  <section className="sec bg-w">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-8">
          <SectionHeading tag="Overview" title={<>About <span className="gtxt">{project.name}</span></>} />
          <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--tx2)' }}>
            {project.detailedDescription.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="cta-card" data-reveal="up">
            <div className="cta-card-label">Type</div>
            <p>{project.type}</p>
            <div className="cta-card-label">Industry</div>
            <p>{project.industry.join(' · ')}</p>
            <div className="cta-card-label">Target users</div>
            <ul className="mb-0 ps-3">
              {project.targetUsers.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ProjectOverview;
