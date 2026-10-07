import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Project } from '@/content/projects';

const ProjectFeatures: React.FC<{ project: Project }> = ({ project }) => (
  <section className="sec bg-w">
    <div className="container">
      <SectionHeading tag="Capabilities" title={<>Key <span className="gtxt">features</span></>} />
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {project.features.map((f) => (
          <div className="col" data-reveal="up" key={f}>
            <div className="d-flex gap-3 align-items-start">
              <i className="bi bi-check-circle-fill" style={{ color: 'var(--p1)', marginTop: 4 }}></i>
              <span style={{ color: 'var(--tx2)', lineHeight: 1.6 }}>{f}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectFeatures;
