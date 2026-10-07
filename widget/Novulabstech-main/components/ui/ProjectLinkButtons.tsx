import React from 'react';
import Button from './Button';
import type { Project } from '@/content/projects';

/**
 * GitHub / live demo buttons. Each is rendered only when its link is set, so a
 * project without links shows nothing instead of a dead button.
 */
const ProjectLinkButtons: React.FC<{ links: Project['links']; className?: string }> = ({
  links,
  className = '',
}) => {
  if (!links.github && !links.demo) return null;
  return (
    <div className={`d-flex gap-3 flex-wrap ${className}`}>
      {links.demo && (
        <Button href={links.demo} variant="grad">
          <i className="bi bi-box-arrow-up-right me-1"></i>Live demo
        </Button>
      )}
      {links.github && (
        <Button href={links.github} variant="glass">
          <i className="bi bi-github me-1"></i>GitHub
        </Button>
      )}
    </div>
  );
};

export default ProjectLinkButtons;
