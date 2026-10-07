import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import IconCard from '@/components/ui/IconCard';
import type { Project } from '@/content/projects';

const ICONS = [
  'bi-chat-dots',
  'bi-file-earmark-text',
  'bi-sliders',
  'bi-newspaper',
  'bi-eye',
  'bi-person-bounding-box',
  'bi-person-check',
  'bi-search',
  'bi-speedometer2',
];

const ProjectAiFeatures: React.FC<{ project: Project }> = ({ project }) => (
  <section className="sec bg-g">
    <div className="container">
      <SectionHeading tag="AI / ML" title={<>AI and machine learning <span className="gtxt">features</span></>} />
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
        {project.aiFeatures.map((f, i) => (
          <IconCard key={f.title} icon={ICONS[i % ICONS.length]} title={f.title} text={f.body} />
        ))}
      </div>
    </div>
  </section>
);

export default ProjectAiFeatures;
