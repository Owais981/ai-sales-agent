import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import IconCard from '@/components/ui/IconCard';
import type { Project } from '@/content/projects';

const ProjectModules: React.FC<{ project: Project }> = ({ project }) => (
  <section className="sec bg-w">
    <div className="container">
      <SectionHeading tag="Architecture" title={<>Important <span className="gtxt">modules</span></>} />
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
        {project.modules.map((m) => (
          <IconCard key={m.name} icon="bi-grid-1x2" title={m.name} text={m.description} />
        ))}
      </div>
    </div>
  </section>
);

export default ProjectModules;
