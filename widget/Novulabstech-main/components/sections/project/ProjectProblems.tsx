import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Project } from '@/content/projects';

const ProjectProblems: React.FC<{ project: Project }> = ({ project }) => (
  <section className="sec bg-g">
    <div className="container">
      <SectionHeading tag="Why it exists" title={<>Main problems it <span className="gtxt">solves</span></>} />
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {project.problems.map((p, i) => (
          <div className="col" data-reveal="up" key={p.problem}>
            <div className="wcard h-100">
              <div className="wnum">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="ctitle">{p.problem}</h3>
              <p className="ctext mb-0">
                <i className="bi bi-arrow-right-short"></i>
                {p.solution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectProblems;
