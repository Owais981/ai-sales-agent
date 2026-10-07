import React from 'react';
import Link from 'next/link';
import type { Project } from '@/content/projects';

interface ProjectCardProps {
  project: Project;
}

/**
 * Project card for listings. No screenshot is supplied for products, so the
 * header is a branded icon panel rather than an invented image.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const href = `/projects/${project.slug}`;

  return (
    <div className="col" data-reveal="up">
      <div className="pcard h-100">
        <Link
          href={href}
          className="pimg-wrap d-flex align-items-center justify-content-center"
          aria-hidden="true"
          tabIndex={-1}
          style={{ background: 'var(--g-main)' }}
        >
          <i className={`bi ${project.icon}`} style={{ fontSize: '4rem', color: '#1A1208' }}></i>
        </Link>
        <div className="pbody">
          <div className="ptag">{project.industry[0]} · Product</div>
          <div className="ptitle">
            <Link href={href}>
              {project.name} — {project.tagline}
            </Link>
          </div>
          <p className="pdesc" style={{ WebkitLineClamp: 4 }}>
            {project.cardDescription}
          </p>
          <div className="d-flex gap-2 mt-3 flex-wrap">
            {project.badges.map((b) => (
              <span className="tbadge" key={b}>
                {b}
              </span>
            ))}
          </div>
          <div className="mt-3">
            <Link
              href={href}
              className="btn-glass"
              style={{ padding: '7px 16px', fontSize: '0.79rem' }}
            >
              View project →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
